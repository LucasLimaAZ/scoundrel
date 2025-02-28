import { Box } from "@mui/material";
import { Room as RoomType, Card } from "../types";
import { suitEmote } from "../shared/helper";

interface RoomProps {
  room: RoomType;
  useCard: (card: Card) => void;
}

const Room = ({ room, useCard }: RoomProps) => {
  const displayedCards: (Card | null)[] = [
    ...room.cards,
    ...Array(4 - room.cards.length).fill(null),
  ];

  const handleCardClick = (card: Card | null) => {
    if (card) {
      useCard(card);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
      {displayedCards.map((card, index) => (
        <Box
          onClick={() => handleCardClick(card)}
          key={index}
          sx={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: card ? "#e1e1e1" : "transparent",
            color: card ? "#1a1a1a" : "transparent",
            border: "2px solid white",
            borderRadius: "8px",
            height: "180px",
            width: "120px",
            fontSize: "36px",
          }}
        >
          {card ? (
            <>
              {card.number}
              {suitEmote[card.suitId]}
            </>
          ) : null}
        </Box>
      ))}
    </Box>
  );
};

export default Room;
