import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GoArrowUp } from "react-icons/go";
import {
  Post,
  useDeletePostMutation,
  useEditPostMutation,
  useMeQuery,
  useVotePostMutation,
} from "../generated/graphql";
import dateFormat from "../utils/postDateFormat";
import InputField from "./inputField";
import Layout from "./layout";

interface postPageBodyProps {
  title?: string;
  post?: string;
  postOwnerUsername?: string;
  created_at?: string;
  updated_at?: string;
  voteStatus?: number;
  points?: number;
  postId: number;
}

const PostPageBody: React.FC<postPageBodyProps> = ({
  title,
  post,
  postOwnerUsername,
  created_at,
  updated_at,
  voteStatus,
  points,
  postId,
}) => {
  const meQuery = useMeQuery();
  const router = useRouter();
  const [votePostMutation] = useVotePostMutation();
  const [deletePostMutation] = useDeletePostMutation();
  const [editPostMutation] = useEditPostMutation();
  const [edit, setEdit] = useState(false);

  const [votes, setVotes] = useState({
    points,
    voteStatus,
  });
  const voting = async (value: number) => {
    if (meQuery.data?.me === null) {
      router.replace(`/login?next=${router.pathname}`);
      return;
    }
    const { data, errors } = await votePostMutation({
      variables: {
        value,
        postId,
      },
    });
    if (errors) {
      return;
    }
    if (data?.votePost.success) {
      setVotes({
        points: data.votePost.currentPoints,
        voteStatus: data.votePost.currentStatus,
      });
    }
  };

  const editPost = () => {
    setEdit(!edit);
  };
  const deletePost = async () => {
    const response = await deletePostMutation({
      variables: {
        postId,
      },
      update: (cache, { data }) => {
        if (data?.deletePost) {
          cache.modify({
            fields: {
              posts(existingPosts, { readField }) {
                const newArrayPosts = existingPosts.posts.filter(
                  (curPost: Post) => postId !== readField("id", curPost)
                );
                const newObject = {
                  posts: newArrayPosts,
                  hasMore: existingPosts.hasMore,
                };
                return newObject;
              },
            },
          });
        } else {
          return;
        }
      },
    });
    if (response.data?.deletePost) {
      router.push("/");
      return;
    }
  };

  return (
    <Layout>
      <div className="mainBtn backBtn">
        <button onClick={() => router.push("/")}>Back</button>
      </div>
      <div className="postPageContainer">
        <div className="container">
          <div className="header">
            <h1>{title}</h1>
          </div>
          <div className="body">
            <p>{post}</p>
          </div>
          <div className="footer">
            <div className="owner">
              <p className="username">{postOwnerUsername}</p>
              <p>
                {dateFormat(created_at!)}
                <span className="edited">
                  {created_at !== updated_at ? "(edited)" : ""}
                </span>
              </p>
            </div>
            <div className="points">
              <div
                className={votes.voteStatus === -1 ? "svg active" : "svg"}
                onClick={() => voting(-1)}
              >
                <GoArrowUp className="downvote" />
              </div>
              <div className="text">
                <p>{votes.points}</p>
              </div>
              <div
                className={votes.voteStatus === +1 ? "svg active" : "svg"}
                onClick={() => voting(1)}
              >
                <GoArrowUp className="upvote" />
              </div>
            </div>
            <div className="options">
              {meQuery.data?.me?.username === postOwnerUsername ? (
                <div className="btnContainer">
                  {!edit ? (
                    <div className="mainBtn">
                      <button onClick={editPost}>Edit</button>
                    </div>
                  ) : null}
                  <div className="mainBtn">
                    <button onClick={deletePost}>Delete</button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {edit ? (
        <div className="editForm">
          <Formik
            initialValues={{ newtitle: "", newpost: "" }}
            onSubmit={async (values) => {
              const editedValues = {
                postId,
                editedPost: values.newpost === "" ? post : values.newpost,
                editedTitle: values.newtitle === "" ? title : values.newtitle,
              };
              const response = await editPostMutation({
                variables: {
                  ...editedValues,
                },
                update: (cache) => {
                  cache.reset();
                },
              });

              if (response.data) {
                router.reload();
              }
            }}
          >
            {({ isSubmitting }) => (
              <div className="formContainer-inner">
                <div className="header">
                  <h1>Edit Post</h1>
                </div>
                <Form className="form">
                  <InputField
                    name="newtitle"
                    placeholder="Title"
                    label="Title"
                  />
                  <InputField
                    name="newpost"
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
                        <button type="submit">Edit Post</button>
                      ) : (
                        <button type="submit">Edit Post</button>
                      )}
                    </div>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      ) : null}
    </Layout>
  );
};
export default PostPageBody;
