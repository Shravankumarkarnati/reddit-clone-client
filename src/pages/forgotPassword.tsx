import { Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import InputField from "../components/inputField";
import Wrapper from "../components/wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import withApollo from "../utils/withApolloClient";

interface forgotPasswordProps {}

const ForgotPassword: React.FC<forgotPasswordProps> = ({}) => {
  const [forgotPasswordMutation] = useForgotPasswordMutation();
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async ({ email }, actions) => {
          const response = await forgotPasswordMutation({
            variables: { email: email },
          });
          if (response) {
            actions.resetForm({
              values: {
                email: "",
              },
            });
          }
          actions.setStatus({ email: "Reset Link Sent To this Email" });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="email"
              placeholder="Email"
              label="Enter your Email"
              type="email"
            />
            <Button
              mt={4}
              variantColor="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withApollo({ ssr: false })(ForgotPassword);
