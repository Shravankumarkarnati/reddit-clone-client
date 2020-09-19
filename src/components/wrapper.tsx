import { Box } from "@chakra-ui/core";
import React from "react";

interface wrapperProps {
  width?: "small" | "large";
  marginT?: number | string;
}

const Wrapper: React.FC<wrapperProps> = ({ children, width, marginT }) => {
  return (
    <Box
      maxWidth={width === "small" ? "400px" : "650px"}
      margin="auto"
      marginTop={marginT ? marginT : "8rem"}
      width="100%"
    >
      {children}
    </Box>
  );
};
export default Wrapper;
