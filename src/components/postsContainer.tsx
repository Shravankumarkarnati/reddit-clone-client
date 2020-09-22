import { Stack } from "@chakra-ui/core";
import React from "react";
import { PostsQuery } from "../generated/graphql";
import SinglePost from "./post";
import Wrapper from "./wrapper";

interface postsContainerProps {
  data: PostsQuery;
}

const PostsContainer: React.FC<postsContainerProps> = ({ data: { posts } }) => {
  return (
    <Wrapper custom_width="medium">
      <Stack>
        {posts.map((cur) => (
          <SinglePost key={cur.id} post={cur} />
        ))}
      </Stack>
    </Wrapper>
  );
};
export default PostsContainer;
