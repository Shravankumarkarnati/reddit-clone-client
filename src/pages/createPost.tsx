import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/inputField";
import Layout from "../components/layout";
import withApollo from "../utils/withApolloClient";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";

interface createPostProps {}

const CreatePost: React.FC<createPostProps> = ({}) => {
  const router = useRouter();
  const [createPostMutation] = useCreatePostMutation();
  const meQuery = useMeQuery();
  if (meQuery.data?.me === null) {
    router.replace(`/login?next=${router.pathname}`);
  }
  return (
    <Layout>
      <div className="formContainer">
        <Formik
          initialValues={{ title: "", post: "" }}
          onSubmit={async (values, actions) => {
            const { setErrors } = actions;
            if (values.post === "" && values.post === "") {
              setErrors({
                post: "Post cannot be empty",
              });
              return;
            }
            const response = await createPostMutation({
              variables: {
                postInput: {
                  ...values,
                },
              },
            });

            if (response.data) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <div className="formContainer-inner">
              <div className="header">
                <h1>Create Post</h1>
                <p>What's on your mind?</p>
              </div>
              <Form className="form">
                <InputField name="title" placeholder="Title" label="Title" />
                <InputField
                  name="post"
                  placeholder="Post goes here"
                  label="Post"
                  textArea={true}
                />
                <div className="formFooter">
                  <div className="mainBtn">
                    {isSubmitting ? (
                      // <button className="spinner">
                      //   <ImSpinner9 />
                      // </button>
                      <button type="submit">Post</button>
                    ) : (
                      <button type="submit">Post</button>
                    )}
                  </div>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </Layout>
  );
};
export default withApollo({ ssr: false })(CreatePost);
