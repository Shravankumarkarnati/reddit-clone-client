import React from "react";
import { usePostsQuery } from "../generated/graphql";
import Post from "./post";

interface postsContainerProps {}

const PostsContainer: React.FC<postsContainerProps> = () => {
  const { data, loading, fetchMore } = usePostsQuery({
    variables: {
      limit: 10,
    },
  });

  const loadMore = async (epoch: number) => {
    fetchMore({
      variables: { cursor: `${epoch}`, limit: 10 },
    });
  };
  return (
    <div className="postsContainer">
      <div className="postsContainer-inner">
        {data?.posts ? (
          <>
            <div className="postsContainer-body">
              {data.posts.posts.map((cur) => {
                return !cur.id ? null : (
                  <Post
                    key={cur.id}
                    title={cur.title}
                    desc={cur.postSnippet}
                    createdAt={cur.created_at}
                    points={cur.points}
                    username={cur.postOwnerUsername}
                    id={cur.id}
                    voteStatus={cur.voteStatus}
                  />
                );
              })}
            </div>
            <div className="postsContainer-footer">
              {data.posts.hasMore ? (
                <div className="mainBtn">
                  <button
                    className="loadMore"
                    onClick={() => {
                      loadMore(data.posts.cursor);
                    }}
                  >
                    Load More
                  </button>
                </div>
              ) : null}
            </div>
          </>
        ) : loading ? (
          <p className="loading">Loading....</p>
        ) : null}
      </div>
    </div>
  );
};
export default PostsContainer;
