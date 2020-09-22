import { Button, Heading, Text, theme } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/inputField";
import Layout from "../components/layout";
import Wrapper from "../components/wrapper";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import toErrorMap from "../utils/toErrorMap";
import { checker } from "../utils/validationChecker";
import { validationErrorMessages } from "../utils/validationErrorCodes";
import withApollo from "../utils/withApolloClient";

const Register: React.FC = ({}) => {
  const [registerMutation] = useRegisterMutation();
  const router = useRouter();
  return (
    <Layout>
      <Wrapper custom_width="small">
        <Wrapper custom_width="small">
          <Heading
            fontWeight="bold"
            fontSize={50}
            width="100%"
            textAlign="center"
            color={theme.colors.black}
            marginTop="5rem"
          >
            Coterie
          </Heading>
          <Text fontSize={30} color="red.400" width="100%" textAlign="center">
            Join a fun community of developers
          </Text>
        </Wrapper>
        <Formik
          initialValues={{ username: "", password: "", email: "" }}
          onSubmit={async (values, actions) => {
            const { setErrors } = actions;
            const usernameChecker = checker({
              type: "username",
              value: values.username,
            });
            if (usernameChecker !== 0) {
              setErrors({ username: validationErrorMessages[usernameChecker] });
              return;
            }
            const passwordChecker = checker({
              type: "password",
              value: values.password,
            });
            if (passwordChecker !== 0) {
              setErrors({ password: validationErrorMessages[passwordChecker] });
              return;
            }
            const response = await registerMutation({
              variables: values,
              update: (cache, { data }) => {
                if (data?.registerUser.error) {
                  return;
                } else if (data?.registerUser.user) {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      me: {
                        id: data.registerUser.user.id,
                        username: data.registerUser.user.username,
                        email: data.registerUser.user.email,
                      },
                    },
                  });
                }
              },
            });
            if (response.data?.registerUser.error) {
              setErrors(toErrorMap(response.data.registerUser.error));
            } else {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <>
              <Form>
                <InputField
                  name="email"
                  placeholder="Email"
                  label="Email"
                  type="email"
                  iconName="email"
                />
                <InputField
                  name="username"
                  placeholder="Username"
                  label="Username"
                  iconName="info"
                  tooltip="
                  1) Must be between 8-20 characters long
                  2) Cannot begin or end with '.' or '_'
                  3) Cannot have '__' or '..' or '._' or '_.' inside
                "
                />
                <InputField
                  name="password"
                  placeholder="Password"
                  label="Password"
                  type="password"
                  iconName="lock"
                  tooltip="
                  1) Must be atleat 8 characters long
                  2) Must contain atleat one digit, one special character and one uppercase letter
                "
                />
                <Button
                  mt={4}
                  bg="red.400"
                  color={theme.colors.white}
                  isLoading={isSubmitting}
                  type="submit"
                  textAlign="center"
                  _hover={{ bg: "black", color: "white" }}
                  float="right"
                >
                  Register
                </Button>
              </Form>
            </>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};
export default withApollo({ ssr: false })(Register);
