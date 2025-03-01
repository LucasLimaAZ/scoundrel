export type Room = {
  cards: Card[];
};

export type Card = {
  id: number;
  number: number;
  suitId: Suit;
  lastKilled?: Card;
  emoji?: string;
};

export enum Suit {
  Hearts = 1,
  Diamonds = 2,
  Clubs = 3,
  Spades = 4,
}
