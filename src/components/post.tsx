import { Avatar, Flex, PseudoBox, Text } from "@chakra-ui/core";
import React from "react";
import { Post } from "../generated/graphql";

interface postProps {
  post: Post;
}

const SinglePost: React.FC<postProps> = ({ post }) => {
  return (
    <PseudoBox
      width="100%"
      bg="white.300"
      color="black"
      height="100%"
      marginY="10px"
      padding="10px"
      border="2px"
      borderRadius=".5rem"
    >
      <Flex alignItems="center" justifyContent="flex-start" marginBottom="5px">
        <Avatar
          name={`${post.postOwnerId}`}
          size="xs"
          marginRight="10px"
          backgroundColor="red.400"
        />
        <Text fontWeight="bold" fontSize="16px">
          {post.title}
        </Text>
      </Flex>
      <Text>{post.post}</Text>
      <Text>{post.points}</Text>
      <Text>{post.created_at}</Text>
    </PseudoBox>
  );
};
export default SinglePost;
