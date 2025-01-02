import { ThemeOptions } from '@mui/material/styles';

// Define the structure for color tokens
type TokenGroup = Record<string, string>;

type Tokens = {
  grey: TokenGroup;
  primary: TokenGroup;
  secondary: TokenGroup;
};

// Extend MUI's theme to include custom properties
declare module '@mui/material/styles' {
  interface TypeBackground {
    alt: string;
  }
  interface PaletteColor {
    [key: number]: string; // Allow numeric keys like 100, 200, etc.
  }
  interface Palette {
    neutral: PaletteColor; // Ensure "neutral" is typed correctly
  }
  interface PaletteOptions {
    neutral?: PaletteColor; // Ensure "neutral" is optional in PaletteOptions
  }
}

// Define dark mode tokens
export const tokensDark: Tokens = {
  grey: {
    0: '#ffffff',
    10: '#f6f6f6',
    50: '#f0f0f0',
    100: '#e0e0e0',
    200: '#c2c2c2',
    300: '#a3a3a3',
    400: '#858585',
    500: '#666666',
    600: '#525252',
    700: '#3d3d3d',
    800: '#292929',
    900: '#141414',
    1000: '#000000',
  },
  primary: {
    100: '#d3d4de',
    200: '#a6a9be',
    300: '#7a7f9d',
    400: '#4d547d',
    500: '#21295c',
    600: '#191F45',
    700: '#141937',
    800: '#0d1025',
    900: '#070812',
  },
  secondary: {
    50: '#ffffff',
    100: '#fff6e0',
    200: '#ffedc2',
    300: '#ffe3a3',
    400: '#ffda85',
    500: '#ffd166',
    600: '#cca752',
    700: '#997d3d',
    800: '#665429',
    900: '#332a14',
  },
};

// Utility function to reverse tokens
function reverseTokens(tokens: Tokens): Tokens {
  return Object.fromEntries(
    Object.entries(tokens).map(([key, val]) => [
      key,
      Object.fromEntries(Object.entries(val).reverse()),
    ])
  ) as Tokens;
}

// Generate light mode tokens by reversing the dark mode tokens
export const tokensLight = reverseTokens(tokensDark);

// MUI theme settings
type Mode = 'light' | 'dark';
export const themeSettings = (mode: Mode): ThemeOptions => {
  const isDarkMode = mode === 'dark';
  const tokens = isDarkMode ? tokensDark : tokensLight;

  return {
    palette: {
      mode,
      primary: {
        ...tokens.primary,
        main: tokens.primary[isDarkMode ? 500 : 400], // Balanced primary
        light: tokens.primary[isDarkMode ? 400 : 300], // Softer accent
        dark: tokens.primary[isDarkMode ? 600 : 500], // Richer depth
      },
      secondary: {
        ...tokens.secondary,
        main: tokens.secondary[isDarkMode ? 400 : 500], // Vibrant secondary
        light: tokens.secondary[isDarkMode ? 300 : 400], // Subtle secondary
        dark: tokens.secondary[isDarkMode ? 500 : 600], // Depth secondary
      },
      neutral: {
        ...tokens.grey,
        main: tokens.grey[isDarkMode ? 400 : 500], // Neutral tone
        light: tokens.grey[isDarkMode ? 300 : 400], // Softer tone
        dark: tokens.grey[isDarkMode ? 500 : 600], // Depth for contrast
        contrastText: tokens.grey[isDarkMode ? 50 : 900], // Text visibility
      },
      background: {
        default: tokens.primary[isDarkMode ? 700 : 50], // Subtle background
        alt: tokens.primary[isDarkMode ? 800 : 100], // Alternate background
      },
      // action: {
      //   hover: tokens.secondary[isDarkMode ? 200 : 300], // Interactive hover
      //   active: tokens.primary[isDarkMode ? 500 : 400], // Active state
      // },
    },
    typography: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 12,
      h1: { fontFamily: 'Inter, sans-serif', fontSize: 40 },
      h2: { fontFamily: 'Inter, sans-serif', fontSize: 32 },
      h3: { fontFamily: 'Inter, sans-serif', fontSize: 24 },
      h4: { fontFamily: 'Inter, sans-serif', fontSize: 20 },
      h5: { fontFamily: 'Inter, sans-serif', fontSize: 16 },
      h6: { fontFamily: 'Inter, sans-serif', fontSize: 14 },
    },
  };
};
