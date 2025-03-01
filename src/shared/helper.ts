export const suitEmote = {
  1: "♥️",
  2: "♦️",
  3: "♣️",
  4: "♠️",
};

export const monstersEmojis = [
  "💀",
  "👽",
  "🧌",
  "👺",
  "👹",
  "🤖",
  "🐉",
  "👾",
  "🦟",
  "🍅",
  "🧟‍♂️",
  "👻",
  "🐍",
  "🕷️",
];

export const weaponsEmojis = ["🏹", "🗡️", "⚔️", "🔨", "🪄", "🔪"];

export const getRandomItem = (arr: string[]): string => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const rotatingStyle = {
  display: "inline-block",
  animation: "rotate3d 3s infinite linear",
  transformStyle: "preserve-3d",
  perspective: "1000px",
  "@keyframes rotate3d": {
    "0%": {
      transform: "rotateY(0deg)",
    },
    "100%": {
      transform: "rotateY(360deg)",
    },
  },
};

export const glowingStyle = {
  position: "relative",
  display: "inline-block",
  color: "#fff",
  animation: "brilho 1.5s ease-in-out infinite",
  "@keyframes brilho": {
    "0%": {
      textShadow:
        "0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.6), 0 0 15px rgba(255, 255, 255, 0.4)",
    },
    "50%": {
      textShadow:
        "0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.5)",
    },
    "100%": {
      textShadow:
        "0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.6), 0 0 15px rgba(255, 255, 255, 0.4)",
    },
  },
};

export const disintegrationStyle = {
  position: "relative",
  display: "inline-block",
  fontSize: "60px",
  animation: "desintegrate 2s infinite",
  "@keyframes desintegrate": {
    "0%": {
      opacity: 0.5,
      transform: "scale(1) rotate(0deg)",
    },
    "50%": {
      opacity: 1,
      transform: "scale(1.2) rotate(15deg)",
    },
    "100%": {
      opacity: 0.5,
      transform: "scale(1) rotate(0deg)",
    },
  },
};
