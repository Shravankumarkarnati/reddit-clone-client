import { Flex, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import React from "react";
import InputField from "../../components/inputField";
import Wrapper from "../../components/wrapper";
import withApollo from "../../utils/withApolloClient";
import { useResetPasswordMutation } from "../../generated/graphql";
import { checker } from "../../utils/validationChecker";
import { validationErrorMessages } from "../../utils/validationErrorCodes";
import toErrorMap from "../../utils/toErrorMap";
import { useRouter } from "next/router";

const ResetPassword: NextPage<{ uuid: string }> = ({ uuid }) => {
  const [resetPasswordMutation] = useResetPasswordMutation();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={async (values, actions) => {
          if (values.password !== values.confirmPassword) {
            actions.setErrors({
              confirmPassword: "Password and Confirm Password are not Same.",
            });
            return;
          }
          const passwordChecker = checker({
            type: "password",
            value: values.password,
          });
          if (passwordChecker !== 0) {
            actions.setErrors({
              password: validationErrorMessages[passwordChecker],
            });
            return;
          }
          const response = await resetPasswordMutation({
            variables: {
              ...values,
              token: uuid,
            },
          });
          if (response.data?.resetPassword.error) {
            actions.setErrors(toErrorMap(response.data?.resetPassword.error));
          } else {
            router.push("/login");
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
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
            />
            <InputField
              name="confirmPassword"
              placeholder="Confirm Password"
              label="Confirm Password"
              type="password"
            />
            <Flex alignItems="flex-end" justify="space-between">
              <Button
                mt={4}
                variantColor="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Reset Password
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ResetPassword.getInitialProps = async ({ query }) => {
  return {
    uuid: query.uuid as string,
  };
};

export default withApollo({ ssr: false })(ResetPassword);
