import { Button, Flex, Heading, Link, PseudoBox, Text } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/inputField";
import {
  MeDocument,
  MeQuery,
  useLoginUserMutation,
} from "../generated/graphql";
import toErrorMap from "../utils/toErrorMap";
import withApollo from "../utils/withApolloClient";
import NextLink from "next/link";
import Layout from "../components/layout";
import Wrapper from "../components/wrapper";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [loginMutation] = useLoginUserMutation();
  const router = useRouter();
  return (
    <Layout>
      <PseudoBox marginTop="5rem"></PseudoBox>
      <Wrapper custom_width="small">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, actions) => {
            const { setErrors } = actions;
            const response = await loginMutation({
              variables: values,
              update: (cache, { data }) => {
                if (data?.loginUser.error) {
                  return;
                } else if (data?.loginUser.user) {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      me: {
                        id: data.loginUser.user.id,
                        username: data.loginUser.user.username,
                        email: data.loginUser.user.email,
                      },
                    },
                  });
                }
              },
            });
            if (response.data?.loginUser.error) {
              setErrors(toErrorMap(response.data.loginUser.error));
            } else {
              if (typeof router.query.next === "string") {
                router.push(`${router.query.next}`);
              } else {
                router.push("/");
              }
            }
          }}
        >
          {({ isSubmitting }) => {
            return (
              <>
                <Wrapper custom_width="small">
                  <Heading
                    fontWeight="bold"
                    fontSize={50}
                    width="100%"
                    textAlign="center"
                    color="black"
                    marginTop="5rem"
                  >
                    Login
                  </Heading>
                  <Text
                    fontSize={30}
                    color="red.400"
                    width="100%"
                    textAlign="center"
                    marginBottom="2rem"
                  >
                    You Know the drill
                  </Text>
                </Wrapper>
                <Form>
                  <InputField
                    name="username"
                    placeholder="Username"
                    label="Username"
                    iconName="info"
                  />
                  <InputField
                    name="password"
                    placeholder="Password"
                    label="Password"
                    type="password"
                    iconName="lock"
                  />
                  <Flex alignItems="flex-end" justify="space-between">
                    <Button
                      mt={4}
                      bg="red.400"
                      color="white"
                      isLoading={isSubmitting}
                      type="submit"
                      textAlign="center"
                      _hover={{ bg: "black", color: "white" }}
                    >
                      Login
                    </Button>
                    <NextLink href="/forgotPassword">
                      <Link
                        border="2px"
                        borderColor="white"
                        _hover={{ borderColor: "black" }}
                        padding="5px"
                        borderRadius=".5rem"
                        fontWeight="bold"
                      >
                        Forgot password
                      </Link>
                    </NextLink>
                  </Flex>
                </Form>
              </>
            );
          }}
        </Formik>
      </Wrapper>
    </Layout>
  );
};
export default withApollo({ ssr: true })(Login);
