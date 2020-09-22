import { Box } from "@chakra-ui/core";
import React from "react";

interface wrapperProps {
  custom_width?: "small" | "medium";
}

const Wrapper: React.FC<wrapperProps> = ({ children, custom_width }) => {
  return (
    <Box
      maxWidth={custom_width === "small" ? "400px" : "650px"}
      margin="auto"
      width="100%"
    >
      {children}
    </Box>
  );
};
export default Wrapper;
