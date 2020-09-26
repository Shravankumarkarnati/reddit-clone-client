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
// import { ImSpinner9 } from "react-icons/im";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [loginMutation] = useLoginUserMutation();
  const router = useRouter();
  return (
    <Layout>
      <div className="formContainer">
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
              <div className="formContainer-inner">
                <div className="header">
                  <h1>Login</h1>
                  <p>Well, You Know the drill</p>
                </div>
                <Form className="form">
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
                  <div className="formFooter">
                    <div className="mainBtn">
                      {isSubmitting ? (
                        // <button className="spinner">
                        //   <ImSpinner9 />
                        // </button>
                        <button type="submit">Login</button>
                      ) : (
                        <button type="submit">Login</button>
                      )}
                    </div>
                    <div className="forgotPass">
                      <NextLink href="/forgotPassword">
                        <p>Forgot password</p>
                      </NextLink>
                    </div>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </Layout>
  );
};
export default withApollo({ ssr: true })(Login);
