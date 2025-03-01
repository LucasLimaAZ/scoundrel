import { Box } from "@mui/material";
import { Room as RoomType, Card, Suit } from "../types";
import {
  disintegrationStyle,
  glowingStyle,
  rotatingStyle,
  suitEmote,
} from "../shared/helper";

interface RoomProps {
  room: RoomType;
  activateCard: (card: Card) => void;
}

const Room = ({ room, activateCard }: RoomProps) => {
  const displayedCards: (Card | null)[] = [
    ...room.cards,
    ...Array(4 - room.cards?.length).fill(null),
  ];

  const handleCardClick = (card: Card | null) => {
    if (card) {
      activateCard(card);
    }
  };

  return (
    <Box>
      {room.cards.length > 0 && (
        <Box
          sx={{
            display: "inline-flex",
            marginBottom: "-74px",
            color: "black",
            alignItems: "baseline",
            justifyContent: "center",
            position: "absolute",
            textAlign: "center",
            paddingX: "12px",
          }}
        >
          {displayedCards.map((card) =>
            card ? (
              <Box
                key={card.id}
                sx={{
                  width: "130px",
                  textAlign: "center",
                  fontSize: `${card.number * 5 + 20}px`,
                  zIndex: "2",
                  ...(card.suitId === Suit.Clubs || card.suitId === Suit.Spades
                    ? disintegrationStyle
                    : {}),
                  ...(card.suitId === Suit.Hearts ? glowingStyle : {}),
                  ...(card.suitId === Suit.Diamonds ? rotatingStyle : {}),
                  fontWeight: "bold",
                  color: "#fff",
                  textShadow:
                    "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
                }}
              >
                {card.emoji}
              </Box>
            ) : null
          )}
        </Box>
      )}
      <Box
        sx={{
          display: "inline-flex",
          justifyContent: "center",
          gap: "16px",
          perspective: "1000px",
        }}
      >
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
              transform: "rotateX(45deg)",
              transformOrigin: "center bottom",
              boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.3)",
              zIndex: "1",
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
    </Box>
  );
};

export default Room;
