/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Kronos777 Theme Colors
const primaryPurple = '#895af6';
const darkPurple = '#312659';
const black = '#000000';

const tintColorLight = primaryPurple;
const tintColorDark = primaryPurple;

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: darkPurple,
    tabIconDefault: '#687076',
    tabIconSelected: primaryPurple,
    primary: primaryPurple,
    secondary: darkPurple,
    accent: black,
  },
  dark: {
    text: '#ECEDEE',
    background: black,
    tint: tintColorDark,
    icon: primaryPurple,
    tabIconDefault: '#9BA1A6',
    tabIconSelected: primaryPurple,
    primary: primaryPurple,
    secondary: darkPurple,
    accent: black,
  },
};
