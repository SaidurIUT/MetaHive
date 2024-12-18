//File location: src/config/colorUtils.js

import colorPalette, { setupColorVariables } from "./colorPalette";

export const getColor = (category, variant = "main") => {
  return colorPalette[category]?.[variant] || colorPalette.primary.main;
};

export const applyOpacity = (color, opacity = 0.8) => {
  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

export const initializeTheme = () => {
  setupColorVariables();
};
