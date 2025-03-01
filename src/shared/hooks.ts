import { useState } from "react";
import { Room, Card, Suit } from "../types";
import { weaponsEmojis, monstersEmojis } from "./helper";
import Cards from "../shared/cards.json";

const useHooks = () => {
  const [room, setRoom] = useState<Room>();
  const [bareHands, setBareHands] = useState<boolean>(true);
  const [equipment, setEquipment] = useState<Card>();
  const [discard, setDiscard] = useState<Card[]>();
  const [life, setLife] = useState<number>(20);
  const [isLostModalOpen, setIsLostModalOpen] = useState<boolean>();
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState<boolean>();
  const [remainingCards, setRemainingCards] = useState<Card[]>([]);
  const [roomCounter, setRoomCounter] = useState<number>(0);
  const [lastScoop, setLastScoop] = useState<boolean>(false);
  const [usedPotion, setUsedPotion] = useState<boolean>(false);

  const initializeDeck = () => {
    const shuffledDeck = [...Cards].sort(() => Math.random() - 0.5);

    const updatedDeck = shuffledDeck.map((card) => {
      let emoji: string;

      if (card.suitId === Suit.Diamonds) {
        emoji = weaponsEmojis[Math.floor(Math.random() * weaponsEmojis.length)];
      } else if (card.suitId === Suit.Clubs || card.suitId === Suit.Spades) {
        emoji =
          monstersEmojis[Math.floor(Math.random() * monstersEmojis.length)];
      } else {
        emoji = "💖";
      }

      return { ...card, emoji };
    });

    setRemainingCards(updatedDeck);
  };

  const refillRoom = (newRoom?: boolean, existingCard?: Card) => {
    if (remainingCards.length === 0) return;

    setRoomCounter(roomCounter + 1);
    setLastScoop(false);
    setUsedPotion(false);

    const drawCount = newRoom ? 4 : 3;
    const newCards = remainingCards.slice(0, drawCount);
    const updatedDeck = remainingCards.slice(drawCount);

    if (existingCard) {
      setRoom({ cards: [existingCard, ...newCards] });
    } else {
      setRoom({ cards: newCards });
    }

    setRemainingCards(updatedDeck);
  };

  const scoopRoom = () => {
    if (!room || !room.cards.length || lastScoop) return;

    setRemainingCards((prevRemaining) => [...prevRemaining, ...room.cards]);
    setRoom(undefined);
    refillRoom(true);
    setLastScoop(true);
  };

  const removeCard = (card: Card) => {
    if (room) {
      const updatedRoomCards = room.cards.filter((c) => c !== card);
      setRoom({ cards: updatedRoomCards });

      if (remainingCards.length < 1 && room?.cards?.length === 1 && life > 0) {
        setIsVictoryModalOpen(true);
      }
    }
  };

  const activateCard = (card: Card) => {
    if (!room) return;

    if (card.suitId === Suit.Diamonds) {
      setEquipment(card);
      setBareHands(false);
    }

    if (card.suitId === Suit.Hearts && !usedPotion) {
      heal(card);
      setUsedPotion(true);
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
      const lastCard = room.cards.filter((c) => c !== card);
      refillRoom(false, lastCard[0]);
    }
  };

  const heal = (card: Card) => {
    const total = card.number + life;
    setLife(Math.min(total, 20));
  };

  const battleCard = (card: Card) => {
    if (bareHands) {
      const newLife = life - card.number;
      if (newLife <= 0) setIsLostModalOpen(true);
      setLife(Math.max(newLife, 0));
      return;
    }

    if (equipment) {
      if (card.number > equipment.number) {
        const damage = card.number - equipment.number;
        if (life - damage <= 0) setIsLostModalOpen(true);
        setLife(life - damage);
      }

      setEquipment({ ...equipment, lastKilled: card });
    }
  };

  const handleDeckClick = () => {
    if (!room?.cards?.length && !lastScoop) {
      refillRoom(true);
    }
  };

  const handleBareHandsClick = () => {
    if (equipment) setBareHands(!bareHands);
  };

  const resetGame = () => {
    setLife(20);
    setEquipment(undefined);
    setIsLostModalOpen(false);
    setIsVictoryModalOpen(false);
    setDiscard(undefined);
    setRoom(undefined);
    setRoomCounter(0);
    initializeDeck();
    setLastScoop(false);
  };

  return {
    room,
    activateCard,
    bareHands,
    setBareHands,
    equipment,
    setEquipment,
    life,
    discard,
    remainingCards,
    isLostModalOpen,
    setIsLostModalOpen,
    resetGame,
    refillRoom,
    roomCounter,
    handleDeckClick,
    initializeDeck,
    scoopRoom,
    lastScoop,
    usedPotion,
    handleBareHandsClick,
    isVictoryModalOpen,
  };
};

export default useHooks;
