import { theme as chakraTheme } from "@chakra-ui/core";

const fonts = {
  ...chakraTheme.fonts,
  monof: `'Menlo', monospace`,
};

const breakpoints = ["40em", "52em", "64em"];

const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    black: "#000",
    white: "#fff",
  },
  fonts,
  breakpoints,
  icons: {
    ...chakraTheme.icons,
  },
};

const newTheme = {
  customFont: "Inter",
  ...theme,
};

export default newTheme;
