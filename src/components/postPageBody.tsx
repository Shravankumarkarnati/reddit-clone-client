import { useRouter } from "next/router";
import React, { useState } from "react";
import { GoArrowUp } from "react-icons/go";
import { useMeQuery, useVotePostMutation } from "../generated/graphql";
import dateFormat from "../utils/postDateFormat";
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
  return (
    <Layout>
      <div className="postPageContainer">
        <div className="mainBtn">
          <button onClick={() => router.push("/")}>Back</button>
        </div>
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
                  ({created_at !== updated_at ? "edited" : ""})
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
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default PostPageBody;
