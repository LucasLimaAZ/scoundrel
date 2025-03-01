import { Box, Button, Typography } from "@mui/material";
import Room from "./components/Room";
import useHooks from "./shared/hooks";
import { suitEmote } from "./shared/helper";
import LostDialog from "./components/LostDialog";
import { useEffect } from "react";
import VictoryDialog from "./components/VictoryDialog";

function App() {
  const {
    room,
    bareHands,
    discard,
    equipment,
    life,
    remainingCards,
    activateCard,
    isLostModalOpen,
    resetGame,
    roomCounter,
    handleDeckClick,
    initializeDeck,
    scoopRoom,
    lastScoop,
    usedPotion,
    isVictoryModalOpen,
    handleBareHandsClick,
  } = useHooks();

  useEffect(() => initializeDeck(), []);

  return (
    <Box
      sx={{
        backgroundColor: "#1a1a1a",
        color: "#e1e1e1",
        minHeight: "92vh",
        padding: "4% 2% 0 2%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingX: "200px",
        }}
      >
        <Box>
          <Box>
            <Typography>Room: {roomCounter}</Typography>
          </Box>
          <Box
            onClick={handleDeckClick}
            sx={{ fontSize: "48px", cursor: "pointer" }}
          >
            🎴 {remainingCards.length}
          </Box>
          <Box sx={{ paddingTop: "16px" }}>
            <Button
              onClick={scoopRoom}
              sx={{ fontSize: "24px", backgroundColor: "gray" }}
              variant="contained"
              disabled={lastScoop || !room?.cards?.length}
            >
              Run 💨
            </Button>
          </Box>
        </Box>
        <Box sx={{ fontSize: "48px" }}>{discard?.length || 0}/44 🪦</Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Room activateCard={activateCard} room={room || { cards: [] }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingX: "200px",
          paddingBottom: "80px",
          transition: "2s",
        }}
      >
        <Box sx={{ fontSize: "48px" }}>❤️ {life}</Box>
        {usedPotion && <Box sx={{ fontSize: "48px" }}>💖🕑</Box>}
        <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Box>
            <Box
              onClick={handleBareHandsClick}
              sx={{ cursor: "pointer", fontSize: "56px" }}
            >
              {bareHands ? "👊" : equipment?.emoji}
            </Box>
            {equipment?.lastKilled && (
              <Box sx={{ fontSize: "24px", marginTop: "16px" }}>
                ⛓️‍💥 {equipment?.lastKilled?.number}
              </Box>
            )}
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
        </Box>
      </Box>
      <LostDialog onClose={resetGame} open={!!isLostModalOpen} />
      <VictoryDialog onClose={resetGame} open={!!isVictoryModalOpen} />
    </Box>
  );
}

export default App;
