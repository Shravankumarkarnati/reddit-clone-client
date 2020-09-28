import { useRouter } from "next/router";
import React from "react";
import withApollo from "../../utils/withApolloClient";
import { usePostQuery } from "../../generated/graphql";
import PostPageBody from "../../components/postPageBody";

interface postProps {}

const Post: React.FC<postProps> = ({}) => {
  const router = useRouter();

  const postId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -100;

  const { data, loading, error } = usePostQuery({
    variables: {
      id: postId,
    },
  });

  if (loading) return <h1> Loading .... </h1>;
  if (error) return <h1>Error Fetching The Post...</h1>;
  if (data?.post) {
    const post = data.post;

    return (
      <PostPageBody
        postId={post.id}
        post={post.post}
        points={post.points}
        postOwnerUsername={post.postOwnerUsername}
        created_at={post.created_at}
        updated_at={post.updated_at}
        title={post.title}
        voteStatus={post.voteStatus}
      />
    );
  }
  return <div>wtf?</div>;
};
export default withApollo({ ssr: true })(Post);
