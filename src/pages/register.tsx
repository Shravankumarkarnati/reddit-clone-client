import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/inputField";
import Layout from "../components/layout";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import toErrorMap from "../utils/toErrorMap";
import { checker } from "../utils/validationChecker";
import { validationErrorMessages } from "../utils/validationErrorCodes";
import withApollo from "../utils/withApolloClient";
// import { ImSpinner9 } from "react-icons/im";

const Register: React.FC = ({}) => {
  const [registerMutation] = useRegisterMutation();
  const router = useRouter();
  return (
    <Layout>
      <div className="formContainer">
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
            <div className="formContainer-inner">
              <div className="header">
                <h1>Register</h1>
                <p>Join the community !</p>
              </div>
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
                  tooltip="
                  1) Must be between 8-20 characters long
                  2) Cannot begin or end with '.' or '_'
                  3) Cannot have '__' or '..' or '._' or '_.' inside
                  4) Lowercase letters Only.
                "
                />
                <InputField
                  name="password"
                  placeholder="Password"
                  label="Password"
                  type="password"
                  tooltip="
                  1) Must be atleat 8 characters long
                  2) Must contain atleat one digit, one special character and one uppercase letter
                "
                />
                <div className="mainBtn">
                  {isSubmitting ? (
                    // <button className="spinner">
                    //   <ImSpinner9 />
                    // </button>
                    <button type="submit">Register</button>
                  ) : (
                    <button type="submit">Register</button>
                  )}
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </Layout>
  );
};
export default withApollo({ ssr: false })(Register);
