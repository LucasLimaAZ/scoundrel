import { useState } from "react";
import { Room, Card, Suit } from "../types";
import Cards from "../shared/cards.json";

const useHooks = () => {
  const [room, setRoom] = useState<Room>();
  const [bareHands, setBareHands] = useState<boolean>(true);
  const [equipment, setEquipment] = useState<Card>();
  const [discard, setDiscard] = useState<Card[]>();
  const [life, setLife] = useState<number>(20);
  const [isModalOpen, setIsModalOpen] = useState<boolean>();
  const [remainingCards, setRemainingCards] = useState<Card[]>(Cards);
  const [roomCounter, setRoomCounter] = useState<number>(0);

  const refillRoom = (newRoom?: boolean, existingCard?: Card) => {
    setRoomCounter(roomCounter + 1);
    const shuffledCards = [...remainingCards].sort(() => Math.random() - 0.5);
    const newCards = shuffledCards.slice(0, newRoom ? 4 : 3);

    setRoom({ cards: [existingCard as Card, ...newCards] });

    setRemainingCards((prevRemaining) =>
      prevRemaining.filter((c) => !newCards.includes(c))
    );
  };

  const removeCard = (card: Card) => {
    if (room) {
      const updatedRoomCards = room.cards.filter((c) => c !== card);
      setRoom({ cards: updatedRoomCards });
    }
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
        (!bareHands &&
          equipment?.lastKilled &&
          card.number >= equipment?.lastKilled?.number) ||
        (!bareHands && !equipment)
      ) {
        return;
      } else {
        battleCard(card);
      }
    }

    removeCard(card);
    setDiscard((prevDiscard) => [...(prevDiscard || []), card]);

    if (room.cards.length === 2) {
      refillRoom();
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
      if (newLife <= 0) setIsModalOpen(true);
      setLife(newLife >= 0 ? newLife : 0);
      return;
    }

    if (equipment) {
      if (card.number > equipment.number) {
        const damage = card.number - equipment.number;
        if (life - damage <= 0) setIsModalOpen(true);
        setLife(life - damage);
      }

      setEquipment({ ...equipment, lastKilled: card });
    }
  };

  const resetGame = () => {
    setLife(20);
    setRemainingCards(Cards);
    setEquipment(undefined);
    setIsModalOpen(false);
    setDiscard(undefined);
    setRoom(undefined);
  };

  return {
    room,
    useCard,
    bareHands,
    setBareHands,
    equipment,
    setEquipment,
    life,
    discard,
    remainingCards,
    isModalOpen,
    setIsModalOpen,
    resetGame,
    refillRoom,
    roomCounter,
  };
};

export default useHooks;
