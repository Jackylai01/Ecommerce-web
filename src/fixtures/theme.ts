import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  breakpoints: {
    sm: '30em',
    md: '48em',
    lg: '64em',
    xl: '80em',
  },
  fonts: {
    body: "'Noto Sans TC', sans-serif",
    heading: "'Noto Sans TC', sans-serif",
  },
  components: {
    Text: {
      baseStyle: {
        color: 'black',
      },
    },
  },
  colors: {
    brand: {
      primary: 'hsl(337,79%,60%)',
      primaryLight: 'hsl(337,79%,70%)',
      primaryDark: 'hsl(337,79%,50%)',
    },
  },
});

export default theme;
