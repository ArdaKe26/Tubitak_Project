const palette = {
  background: "#eef6ff",
  surface: "#ffffff",
  primary: "#0b63d6",
  primaryLight: "#60a5fa",
  primaryDark: "#084b9a",
  accent: "#7c3aed",
  text: "#071124",
  muted: "#6b7280",
  danger: "#ef4444",
  success: "#16a34a",
  border: "#dbe9ff",
  primaryButton: "#086ef3ff"
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: 32,
  h2: 22,
  h3: 18,
  body: 16,
  small: 13,
};

export const elevation = {
  low: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
};

export default {
  palette,
  spacing,
  typography,
  elevation,
};
