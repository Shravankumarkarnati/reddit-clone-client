import React from "react";
import { usePostsQuery } from "../generated/graphql";
import moment from "moment";
import Post from "./post";

interface postsContainerProps {}

const PostsContainer: React.FC<postsContainerProps> = () => {
  const { data, loading, fetchMore } = usePostsQuery({
    variables: {
      limit: 10,
    },
  });

  const loadMore = async (lastPost: string) => {
    const format = moment(parseInt(lastPost)).format(
      "YYYY-MM-DD HH:mm:ss.SSSSSS"
    );
    fetchMore({
      variables: { cursor: format, limit: 10 },
    });
  };
  return (
    <div className="postsContainer">
      <div className="postsContainer-inner">
        {data?.posts ? (
          <>
            <div className="postsContainer-body">
              {data.posts.posts.map((cur) => {
                return (
                  <Post
                    key={cur.id}
                    title={cur.title}
                    desc={cur.postSnippet}
                    createdAt={cur.created_at}
                    points={cur.points}
                    username={cur.postOwnerUsername}
                    id={cur.id}
                  />
                );
              })}
            </div>
            <div className="postsContainer-footer">
              {data.posts.hasMore ? (
                <div className="mainBtn">
                  <button
                    onClick={() => {
                      loadMore(
                        data.posts.posts[data.posts.posts.length - 1].created_at
                      );
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
