export const colors = {
  primary: {
    DEFAULT: "#0B2545",
    50: "#E8EDF3",
    100: "#C5D0DE",
    200: "#8FA3BD",
    300: "#5A779D",
    400: "#2E4D76",
    500: "#0B2545",
    600: "#091E39",
    700: "#07182D",
    800: "#051221",
    900: "#030A14",
  },
  secondary: {
    DEFAULT: "#D4A24C",
    50: "#FBF5E8",
    100: "#F4E3BD",
    200: "#EBCB87",
    300: "#E1B257",
    400: "#D4A24C",
    500: "#B8862F",
    600: "#946B25",
    700: "#70511C",
    800: "#4D3713",
    900: "#2A1E0A",
  },
  surface: "#F5F7FA",
  background: "#FFFFFF",
  foreground: "#171717",
} as const;

export type BrandColor = keyof typeof colors;
