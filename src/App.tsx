import { Box, Button, Typography } from "@mui/material";
import Room from "./components/Room";
import useHooks from "./shared/hooks";
import { suitEmote } from "./shared/helper";
import Dialog from "./components/Dialog";

function App() {
  const {
    room,
    bareHands,
    discard,
    equipment,
    life,
    setBareHands,
    remainingCards,
    useCard,
    isModalOpen,
    resetGame,
    refillRoom,
    roomCounter,
  } = useHooks();

  const handleDeckClick = () => {
    if (!room?.cards?.length) {
      refillRoom(true);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#1a1a1a",
        color: "#e1e1e1",
        minHeight: "92vh",
        padding: "4% 2% 0 2%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Box>
          <Box>
            <Typography>Room: {roomCounter}</Typography>
          </Box>
          <Box onClick={handleDeckClick} sx={{ fontSize: "48px" }}>
            🎴 {remainingCards.length}
          </Box>
          <Box sx={{ paddingTop: "16px" }}>
            <Button
              sx={{ fontSize: "24px", backgroundColor: "gray" }}
              variant="contained"
            >
              Run 💨
            </Button>
          </Box>
        </Box>
        <Room useCard={useCard} room={room || { cards: [] }} />
        <Box sx={{ fontSize: "48px" }}>{discard?.length || 0} 🪦</Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          paddingTop: "100px",
        }}
      >
        <Box sx={{ fontSize: "48px" }}>❤️ {life}</Box>
        <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Box
            onClick={() => setBareHands(!bareHands)}
            sx={{ cursor: "pointer", fontSize: "48px" }}
          >
            {bareHands ? "👊" : "⚔️"}
          </Box>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: equipment ? "#e1e1e1" : "transparent",
              color: equipment ? "#1a1a1a" : "transparent",
              border: "2px solid white",
              borderRadius: "8px",
              height: "180px",
              width: "120px",
              fontSize: "36px",
            }}
          >
            {equipment ? (
              <>
                {equipment.number}
                {suitEmote[equipment.suitId]}
              </>
            ) : null}
          </Box>
          {equipment?.lastKilled && (
            <Box sx={{ fontSize: "36px" }}>
              ⛓️‍💥 {equipment?.lastKilled?.number}
            </Box>
          )}
        </Box>
      </Box>
      <Dialog onClose={resetGame} open={!!isModalOpen} />
    </Box>
  );
}

export default App;
