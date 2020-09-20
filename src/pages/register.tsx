import { Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import InputField from "../components/inputField";
import Wrapper from "../components/wrapper";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import toErrorMap from "../utils/toErrorMap";
import withApollo from "../utils/withApolloClient";
import { validationErrorMessages } from "../utils/validationErrorCodes";
import { checker } from "../utils/validationChecker";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [registerMutation] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper>
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
          <Form>
            <InputField
              name="email"
              placeholder="Email"
              label="Email"
              type="email"
            />
            <InputField
              name="username"
              placeholder="Username"
              label="Username"
            />
            <InputField
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
            />
            <Button
              mt={4}
              variantColor="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withApollo({ ssr: false })(Register);
