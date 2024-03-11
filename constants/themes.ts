import { createTheme, Theme } from '@mui/material/styles';

// Define a theme with a white-focused palette
const theme: Theme = createTheme({
  palette: {
    background: {
      default: '#fafafa', // Using offWhite as the default background color
      paper: '#fff',
    },
    text: {
      primary: '#000', // Ensuring high contrast for the primary text
      secondary: 'rgba(0, 0, 0, 0.7)', // A slightly lighter shade for secondary text
    },
    // If you need to reference offWhite specifically in your components:
    warning: {
      main: '#fafafa',
      contrastText: '#000', // High contrast text color for accessibility
    },
  },
});

// Extend the MUI Theme with custom properties
declare module '@mui/material/styles' {
  interface Palette {
    offWhite: Palette['primary'];
  }
  interface PaletteOptions {
    offWhite?: PaletteOptions['primary'];
  }
}

interface CustomPaletteOptions {
   offWhite?: {
      main: string;
      contrastText: string;
   };
 }
 
 interface CustomPalette {
   offWhite?: {
      main: string;
      contrastText: string;
   };
 }
 
 declare module '@mui/material/styles/createPalette' {
   interface Palette extends CustomPalette {}
   interface PaletteOptions extends CustomPaletteOptions {}
 }
export default theme;
