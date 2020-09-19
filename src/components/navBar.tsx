import { Box, Button, Flex, Link, PseudoBox, Text } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import {
  MeDocument,
  MeQuery,
  useLogoutUserMutation,
  useMeQuery,
} from "../generated/graphql";

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
  const [logoutMutation, { loading: logoutLoading }] = useLogoutUserMutation();

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
          <Button
            _hover={{ bg: "white", color: "black", cursor: "pointer" }}
            rounded="md"
            bg="black"
            padding="1.5rem"
            fontWeight="medium"
            textAlign="center"
            isLoading={logoutLoading}
            onClick={async () => {
              await logoutMutation({
                update: (cache, { data }) => {
                  if (!data?.logoutUser.valueOf) {
                    return;
                  } else {
                    cache.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                        me: null,
                      },
                    });
                  }
                },
              });
            }}
          >
            <Flex align="center" direction="column">
              <Text fontSize="md" textTransform="uppercase" marginBottom={1}>
                Logout
              </Text>
              <Text fontSize="xs">{data?.me?.username}</Text>
            </Flex>
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default NavBar;

{
  /* <PseudoBox
                _hover={{ bg: "white", color: "black", cursor: "pointer" }}
                padding={2}
                rounded="md"
                fontWeight="medium"
                textAlign="center"
              ></PseudoBox> */
}
