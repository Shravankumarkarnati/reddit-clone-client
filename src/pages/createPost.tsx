// import { Heading, theme, Button, Text } from "@chakra-ui/core";
// import { Formik, Form } from "formik";
// import { useRouter } from "next/router";
import React from "react";
// import InputField from "../components/inputField";
// import Layout from "../components/layout";
// import Wrapper from "../components/wrapper";
// import withApollo from "../utils/withApolloClient";
// import { useCreatePostMutation, useMeQuery } from "../generated/graphql";

// interface createPostProps {}

// const CreatePost: React.FC<createPostProps> = ({}) => {
//   const router = useRouter();
//   const [createPostMutation] = useCreatePostMutation();
//   const meQuery = useMeQuery();
//   if (meQuery.data?.me === null) {
//     router.replace(`/login?next=${router.pathname}`);
//   }
//   return (
//     <Layout>
//       <Wrapper custom_width="small">
//         <Wrapper custom_width="small">
//           <Heading
//             fontWeight="bold"
//             fontSize={50}
//             width="100%"
//             textAlign="center"
//             color={theme.colors.black}
//             marginTop="5rem"
//           >
//             Create Post
//           </Heading>
//           <Text fontSize={30} color="red.400" width="100%" textAlign="center">
//             Well, spit those bars🔥
//           </Text>
//         </Wrapper>
//         <Formik
//           initialValues={{ title: "", post: "" }}
//           onSubmit={async (values, actions) => {
//             const { setErrors } = actions;
//             if (values.post === "" && values.post === "") {
//               setErrors({
//                 post: "Post cannot be empty",
//               });
//               return;
//             }
//             const response = await createPostMutation({
//               variables: {
//                 postInput: {
//                   ...values,
//                 },
//               },
//             });

//             if (response.data) {
//               router.push("/");
//             }
//           }}
//         >
//           {({ isSubmitting }) => (
//             <>
//               <Form>
//                 <InputField
//                   name="title"
//                   placeholder="Title"
//                   label="Title"
//                   type="text"
//                 />
//                 <InputField
//                   name="post"
//                   placeholder="Start your Post here"
//                   label="Post"
//                   textArea={true}
//                   textAreaSize="30vh !important"
//                 />
//                 <Button
//                   mt={4}
//                   bg="red.400"
//                   color={theme.colors.white}
//                   isLoading={isSubmitting}
//                   type="submit"
//                   textAlign="center"
//                   _hover={{ bg: "black", color: "white" }}
//                   float="right"
//                 >
//                   Submit
//                 </Button>
//               </Form>
//             </>
//           )}
//         </Formik>
//       </Wrapper>
//     </Layout>
//   );
// };
// export default withApollo({ ssr: false })(CreatePost);
