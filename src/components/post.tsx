import React, { useState } from "react";
import { GoArrowUp } from "react-icons/go";
import { useVotePostMutation } from "../generated/graphql";
import dateFormat from "../utils/postDateFormat";

interface featureProps {
  title: String;
  desc: String;
  createdAt: string;
  points: Number;
  username: string;
  id: number;
  voteStatus: number;
}

const Post: React.FC<featureProps> = ({
  title,
  desc,
  createdAt,
  points,
  username,
  id,
  voteStatus,
}) => {
  const [votePostMutation] = useVotePostMutation();
  const [votes, setVotes] = useState({
    points,
    voteStatus,
  });
  const voting = async (value: number) => {
    const { data, errors } = await votePostMutation({
      variables: {
        value,
        postId: id,
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
    <div className="post">
      <div className="post-header">
        <p className="post-header--title">{title}</p>
        <p className="post-header--username">{username}</p>
      </div>
      <div className="post-body">
        <p className="post-body--desc">{desc}</p>
      </div>
      <div className="post-footer">
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
        <div className="datetime">
          <p>{dateFormat(createdAt)}</p>
        </div>
      </div>
    </div>
  );
};
export default Post;
