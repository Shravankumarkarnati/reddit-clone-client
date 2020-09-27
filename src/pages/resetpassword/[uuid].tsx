import { Formik, Form } from "formik";
import { NextPage } from "next";
import React from "react";
import InputField from "../../components/inputField";
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
    <div className="formContainer">
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
          <div className="formContainer-inner">
            <div className="header">
              <h1>Reset Password</h1>
              <p>Don't lose you password again!! 👀</p>
            </div>
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
              <div className="formFooter">
                <div className="mainBtn">
                  {isSubmitting ? (
                    // <button className="spinner">
                    //   <ImSpinner9 />
                    // </button>
                    <button type="submit">Send Reset Link</button>
                  ) : (
                    <button type="submit">Send Reset Link</button>
                  )}
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

ResetPassword.getInitialProps = async ({ query }) => {
  return {
    uuid: query.uuid as string,
  };
};

export default withApollo({ ssr: false })(ResetPassword);
