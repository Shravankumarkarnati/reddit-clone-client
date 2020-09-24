import { Box, Flex, Link, PseudoBox, theme } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  MeDocument,
  MeQuery,
  useLogoutUserMutation,
  useMeQuery,
} from "../generated/graphql";
import { isServer } from "../utils/isServer";

const CommonLink = (text: string) => (
  <Link
    _hover={{
      textDecoration: "none",
      color: "white",
      borderColor: "white",
      boxShadow: "0px 1px 10px white",
    }}
    textTransform="uppercase"
    fontWeight="bold"
    marginRight="2rem"
    color={theme.colors.gray[300]}
    padding=".5rem"
    border="2px"
    borderRadius=".5rem"
    borderColor="black"
  >
    {text}
  </Link>
);

const Logout = () => {
  const [logoutMutation] = useLogoutUserMutation();

  return (
    <Flex alignItems="center" justifyContent="center">
      <PseudoBox
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
        {CommonLink("LogOut")}
      </PseudoBox>
    </Flex>
  );
};

const LoginRegisterBtn = () => {
  const router = useRouter();
  return (
    <Flex alignItems="center" justifyContent="center">
      {["login", "register"].map((cur) => {
        if (router.pathname !== `/${cur}`) {
          return (
            <NextLink key={cur} href={`/${cur}`}>
              {CommonLink(cur)}
            </NextLink>
          );
        } else {
          return null;
        }
      })}
    </Flex>
  );
};

const NavBar: React.FC = ({}) => {
  const { data } = useMeQuery({
    skip: isServer(),
  });
  const router = useRouter();
  return (
    <Box bg={theme.colors.black} color={theme.colors.white} padding={2}>
      <Flex alignItems="center" justifyContent="space-between">
        <PseudoBox
          fontSize="2rem"
          textTransform="capitalize"
          fontWeight="extrabold"
          _hover={{ color: theme.colors.black, bg: theme.colors.white }}
          cursor="pointer"
          paddingX="1rem"
          borderRadius=".5rem"
          onClick={() => router.push("/")}
        >
          Coterie
        </PseudoBox>
        <NextLink href="/createPost">{CommonLink("Create Post")}</NextLink>
        <Flex>{data?.me ? <Logout /> : <LoginRegisterBtn />}</Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
