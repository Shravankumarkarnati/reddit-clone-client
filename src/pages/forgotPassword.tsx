import { Formik, Form } from "formik";
import React from "react";
import InputField from "../components/inputField";
import Layout from "../components/layout";
import { useForgotPasswordMutation } from "../generated/graphql";
import withApollo from "../utils/withApolloClient";

interface forgotPasswordProps {}

const ForgotPassword: React.FC<forgotPasswordProps> = ({}) => {
  const [forgotPasswordMutation] = useForgotPasswordMutation();
  return (
    <Layout>
      <div className="formContainer">
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
            <div className="formContainer-inner">
              <div className="header">
                <h1>Forget Password?</h1>
                <p>No worries! It's very easy to reset.</p>
              </div>
              <Form>
                <InputField
                  name="email"
                  placeholder="Email"
                  label="Enter your Email"
                  type="email"
                />
                <div className="mainBtn">
                  {isSubmitting ? (
                    // <button className="spinner">
                    //   <ImSpinner9 />
                    // </button>
                    <button type="submit">Submit</button>
                  ) : (
                    <button type="submit">Submit</button>
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
export default withApollo({ ssr: false })(ForgotPassword);
