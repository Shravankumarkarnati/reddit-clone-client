import { Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/inputField";
import Wrapper from "../components/wrapper";
import {
  MeDocument,
  MeQuery,
  useLoginUserMutation,
} from "../generated/graphql";
import toErrorMap from "../utils/toErrorMap";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [loginMutation] = useLoginUserMutation();
  const router = useRouter();
  return (
    <Wrapper>
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
                    },
                  },
                });
              }
            },
          });
          if (response.data?.loginUser.error) {
            setErrors(toErrorMap(response.data.loginUser.error));
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default Login;