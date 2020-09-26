import React from "react";
import { BiUpArrow } from "react-icons/bi";
import dateFormat from "../utils/postDateFormat";

interface featureProps {
  title: String;
  desc: String;
  createdAt: string;
  points: Number;
  username: string;
}

const Post: React.FC<featureProps> = ({
  title,
  desc,
  createdAt,
  points,
  username,
}) => {
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
          <div className="svg">
            <BiUpArrow className="upvote" />
          </div>
          <div className="text">
            <p>{points}</p>
          </div>
          <div className="svg">
            <BiUpArrow className="downvote" />
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
