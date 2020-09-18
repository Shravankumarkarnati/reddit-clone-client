import { Box, Flex, Link, PseudoBox } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface navBarProps {}

const NavContainer: React.FC = ({ children }) => (
  <PseudoBox
    _hover={{ bg: "white", color: "black", cursor: "pointer" }}
    padding={2}
    rounded="md"
    marginRight={5}
  >
    {children}
  </PseudoBox>
);

const NavBar: React.FC<navBarProps> = ({}) => {
  const { data, loading } = useMeQuery();

  return (
    <Box bg="tomato" px={3} py={4} color="white">
      <Flex align="center" justify="flex-end">
        {loading ? null : data?.me === null ? (
          <Flex align="center">
            {["login", "register"].map((cur) => (
              <NavContainer key={cur}>
                <NextLink href={`/${cur}`}>
                  <Link
                    _hover={{ textDecoration: "none" }}
                    textTransform="uppercase"
                    fontWeight="medium"
                  >
                    {cur}
                  </Link>
                </NextLink>
              </NavContainer>
            ))}
          </Flex>
        ) : (
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <PseudoBox
                _hover={{ bg: "white", color: "black", cursor: "pointer" }}
                padding={2}
                rounded="md"
                fontWeight="medium"
              >
                {data?.me?.username}
              </PseudoBox>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default NavBar;
