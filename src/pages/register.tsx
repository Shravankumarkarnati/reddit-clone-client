import { Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import InputField from "../components/inputField";
import Wrapper from "../components/wrapper";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import toErrorMap from "../utils/toErrorMap";
import withApollo from "../utils/withApolloClient";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [registerMutation] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, actions) => {
          const { setErrors } = actions;
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
