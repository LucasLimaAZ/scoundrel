import { useState } from "react";
import { Room, Card, Suit } from "../types";
import Cards from "../shared/cards.json";

const useHooks = () => {
  const [room, setRoom] = useState<Room>();
  const [bareHands, setBareHands] = useState<boolean>(true);
  const [equipment, setEquipment] = useState<Card>();
  const [discard, setDiscard] = useState<Card[]>();
  const [life, setLife] = useState<number>(20);
  const [remainingCards, setRemainingCards] = useState<Card[]>(Cards);

  const newRoom = () => {
    const shuffledCards = [...remainingCards].sort(() => Math.random() - 0.5);
    const selectedCards: Card[] = shuffledCards.slice(0, 4);

    setRoom({ cards: selectedCards });
  };

  const useCard = (card: Card) => {
    if (!room) return;

    if (card.suitId === Suit.Diamonds) {
      setEquipment(card);
    }

    if (card.suitId === Suit.Hearts) {
      heal(card);
    }

    if (card.suitId === Suit.Clubs || card.suitId === Suit.Spades) {
      if (
        !bareHands &&
        equipment?.lastKilled &&
        card.number >= equipment?.lastKilled?.number
      ) {
        return;
      } else {
        battleCard(card);
      }
    }

    const updatedRoomCards = room.cards.filter((c) => c !== card);
    setRoom({ cards: updatedRoomCards });

    setDiscard((prevDiscard) => [...(prevDiscard || []), card]);

    setRemainingCards((prevRemaining) =>
      prevRemaining.filter((c) => c !== card)
    );

    if (updatedRoomCards.length === 1 && remainingCards.length >= 3) {
      const shuffledCards = [...remainingCards].sort(() => Math.random() - 0.5);
      const newCards = shuffledCards.slice(0, 3);
      setRoom({ cards: [...updatedRoomCards, ...newCards] });

      setRemainingCards((prevRemaining) =>
        prevRemaining.filter((c) => !newCards.includes(c))
      );
    }
  };

  const heal = (card: Card) => {
    const total = card.number + life;
    if (total <= 20) {
      setLife(total);
    } else {
      setLife(20);
    }
  };

  const battleCard = (card: Card) => {
    if (bareHands) {
      const newLife = life - card.number;
      setLife(newLife >= 0 ? newLife : 0);
      return;
    }

    if (equipment) {
      if (card.number > equipment.number) {
        const damage = card.number - equipment.number;
        setLife(life - damage);
      }

      setEquipment({ ...equipment, lastKilled: card });
    }
  };

  return {
    room,
    newRoom,
    useCard,
    bareHands,
    setBareHands,
    equipment,
    setEquipment,
    life,
    discard,
    remainingCards,
  };
};

export default useHooks;
