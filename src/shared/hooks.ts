import { useEffect, useState } from "react";
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
  const [lifeDifference, setLifeDifference] = useState<number>(0);
  const [animateBattle, setAnimateBattle] = useState<boolean>();
  const [animate, setAnimate] = useState(false);
  const [prevLifeDifference, setPrevLifeDifference] = useState(0);
  const [scoopRefillTriggered, setScoopRefillTriggered] = useState(false);

  useEffect(() => {
    if (lifeDifference !== 0) {
      setPrevLifeDifference(lifeDifference);
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [lifeDifference]);

  useEffect(() => {
    if (scoopRefillTriggered) {
      refillRoom(true);
      setLastScoop(true);
      setScoopRefillTriggered(false);
    }
  }, [remainingCards, scoopRefillTriggered]);

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
    if (room && room.cards.length < 4) return;
    if (!room || !room.cards.length || lastScoop) return;

    setRemainingCards((prevRemainingCards) => [
      ...prevRemainingCards,
      ...room.cards,
    ]);

    setScoopRefillTriggered(true);
    setRoom(undefined);
  };

  const removeCard = (card: Card) => {
    if (room) {
      const updatedRoomCards = room.cards.filter((c) => c !== card);
      setRoom({ cards: updatedRoomCards });
      if (updatedRoomCards.length < 1) {
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
    setLifeDifference(card.number);
    setLife(Math.min(total, 20));
  };

  const battleCard = (card: Card) => {
    setAnimateBattle(true);
    setTimeout(() => setAnimateBattle(false), 400);

    if (bareHands) {
      const newLife = life - card.number;
      setLifeDifference(-card.number);
      if (newLife <= 0) setIsLostModalOpen(true);
      setLife(Math.max(newLife, 0));
      return;
    }

    if (equipment) {
      if (card.number > equipment.number) {
        const damage = card.number - equipment.number;
        setLifeDifference(-damage);
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
    setBareHands(true);
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
    lifeDifference,
    animateBattle,
    animate,
    prevLifeDifference,
  };
};

export default useHooks;
