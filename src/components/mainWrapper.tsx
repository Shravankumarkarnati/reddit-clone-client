import { Box, theme } from "@chakra-ui/core";
import React from "react";

interface mainWrapperProps {}

const MainWrapper: React.FC<mainWrapperProps> = ({ children }) => {
  return (
    <Box
      fontFamily="Inter,'sans serif'"
      bg={theme.colors.white}
      color={theme.colors.black}
      width="100vw"
      height="100%"
    >
      {children}
    </Box>
  );
};
export default MainWrapper;
