// color design tokens export
type TokenGroup = {
  [key: number | string]: string;
};

type Tokens = {
  grey: TokenGroup;
  primary: TokenGroup;
  secondary: TokenGroup;
};

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
    50: '#f0f0f0',
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

function reverseTokens(tokens: Tokens): Tokens {
  const reversedTokens: Tokens = {} as Tokens; // Initialize with Tokens type
  Object.entries(tokens).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const reversedObj: TokenGroup = {};
    keys.forEach((_, i) => {
      reversedObj[keys[i]] = values[keys.length - i - 1];
    });
    reversedTokens[key as keyof Tokens] = reversedObj;
  });
  return reversedTokens;
}

export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
// export const themeSettings = (mode) => {
//   return {
//     palette: {
//       mode: mode,
//       ...(mode === 'dark'
//         ? {
//             primary: {
//               ...tokensDark.primary,
//               main: tokensDark.primary[400],
//               light: tokensDark.primary[400],
//             },
//             secondary: {
//               ...tokensDark.secondary,
//               main: tokensDark.secondary[300],
//             },
//             neutral: {
//               ...tokensDark.grey,
//               main: tokensDark.grey[500],
//             },
//             background: {
//               default: tokensDark.primary[600],
//               alt: tokensDark.primary[500],
//             },
//           }
//         : {
//             primary: {
//               ...tokensLight.primary,
//               main: tokensLight.primary[400],
//               light: tokensLight.primary[400],
//             },
//             secondary: {
//               ...tokensLight.secondary,
//               main: tokensLight.secondary[300],
//             },
//             neutral: {
//               ...tokensLight.grey,
//               main: tokensLight.grey[500],
//             },
//             background: {
//               default: tokensLight.primary[100],
//               alt: tokensLight.primary[50],
//             },
//           }),
//     },
//     typography: {
//       fontFamily: ['Inter', 'sans-serif'].join(','),
//       fontSize: 12,
//       h1: {
//         fontFamily: ['Inter', 'sans-serif'].join(','),
//         fontSize: 40,
//       },
//       h2: {
//         fontFamily: ['Inter', 'sans-serif'].join(','),
//         fontSize: 32,
//       },
//       h3: {
//         fontFamily: ['Inter', 'sans-serif'].join(','),
//         fontSize: 24,
//       },
//       h4: {
//         fontFamily: ['Inter', 'sans-serif'].join(','),
//         fontSize: 20,
//       },
//       h5: {
//         fontFamily: ['Inter', 'sans-serif'].join(','),
//         fontSize: 16,
//       },
//       h6: {
//         fontFamily: ['Inter', 'sans-serif'].join(','),
//         fontSize: 14,
//       },
//     },
//   };
// };

// _theme/index.ts
export const themeSettings = (mode: 'light' | 'dark') => {
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500],
            },
          }
        : {
            primary: {
              ...tokensLight.primary,
              main: tokensLight.primary[400],
              light: tokensLight.primary[400],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensLight.secondary[300],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensLight.grey[500],
            },
            background: {
              default: tokensLight.primary[100],
              alt: tokensLight.primary[50],
            },
          }),
    },
    typography: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  };
};
