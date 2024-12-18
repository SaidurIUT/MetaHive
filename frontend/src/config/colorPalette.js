
// File location: src/config/colorPalette.js




const colorPalette = {
  // Primary Colors
  primary: {
    main: "#00ffff", // Cyberpunk cyan/teal
    light: "#33ffff",
    dark: "#00cccc",
    contrastText: "#ffffff",
  },
  // Secondary Colors
  secondary: {
    main: "#ff00ff", // Cyberpunk magenta
    light: "#ff33ff",
    dark: "#cc00cc",
    contrastText: "#ffffff",
  },
  // Background Colors
  background: {
    default: "#121212", // Dark background
    paper: "rgba(20, 20, 30, 0.8)",
    accent: "rgba(30, 30, 40, 0.6)",
  },
  // Text Colors
  text: {
    primary: "#a0a0a0",
    secondary: "#8a8a8a",
    disabled: "#606060",
    contrast: "#ffffff",
  },
  // Status Colors
  status: {
    success: "#4caf50",
    error: "#f44336",
    warning: "#ff9800",
    info: "#2196f3",
  },
  // Border and Divider
  border: {
    main: "rgba(0, 255, 255, 0.2)",
    light: "rgba(0, 255, 255, 0.1)",
  },
  // Shadow and Elevation
  shadow: {
    main: "0 4px 6px rgba(0, 0, 0, 0.1)",
    elevated: "0 8px 12px rgba(0, 0, 0, 0.2)",
  },
};

export const setupColorVariables = () => {
  if (typeof window !== "undefined") {
    const root = document.documentElement;

    // Primary Colors
    root.style.setProperty("--color-primary", colorPalette.primary.main);
    root.style.setProperty("--color-primary-light", colorPalette.primary.light);
    root.style.setProperty("--color-primary-dark", colorPalette.primary.dark);
    root.style.setProperty(
      "--color-primary-contrast",
      colorPalette.primary.contrastText
    );

    // Secondary Colors
    root.style.setProperty("--color-secondary", colorPalette.secondary.main);
    root.style.setProperty(
      "--color-secondary-light",
      colorPalette.secondary.light
    );
    root.style.setProperty(
      "--color-secondary-dark",
      colorPalette.secondary.dark
    );
    root.style.setProperty(
      "--color-secondary-contrast",
      colorPalette.secondary.contrastText
    );

    // Background Colors
    root.style.setProperty(
      "--color-bg-default",
      colorPalette.background.default
    );
    root.style.setProperty("--color-bg-paper", colorPalette.background.paper);
    root.style.setProperty("--color-bg-accent", colorPalette.background.accent);

    // Text Colors
    root.style.setProperty("--color-text-primary", colorPalette.text.primary);
    root.style.setProperty(
      "--color-text-secondary",
      colorPalette.text.secondary
    );
    root.style.setProperty("--color-text-disabled", colorPalette.text.disabled);
    root.style.setProperty("--color-text-contrast", colorPalette.text.contrast);

    // Status Colors
    root.style.setProperty(
      "--color-status-success",
      colorPalette.status.success
    );
    root.style.setProperty("--color-status-error", colorPalette.status.error);
    root.style.setProperty(
      "--color-status-warning",
      colorPalette.status.warning
    );
    root.style.setProperty("--color-status-info", colorPalette.status.info);

    // Border Colors
    root.style.setProperty("--color-border", colorPalette.border.main);
    root.style.setProperty("--color-border-light", colorPalette.border.light);

    // Shadow Colors
    root.style.setProperty("--color-shadow", colorPalette.shadow.main);
    root.style.setProperty(
      "--color-shadow-elevated",
      colorPalette.shadow.elevated
    );

    // Additional Utility Colors
    root.style.setProperty(
      "--color-primary-hover-bg",
      `rgba(0, 255, 255, 0.1)`
    );
    root.style.setProperty(
      "--color-primary-hover-shadow",
      `rgba(0, 255, 255, 0.3)`
    );
  }
};

export default colorPalette;
