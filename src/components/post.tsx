import {
  Avatar,
  Flex,
  Grid,
  IconButton,
  PseudoBox,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/core";
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
      paddingBottom="20px"
      borderBottom="2px solid gray"
    >
      <Grid templateColumns="1fr 10fr" gap={4}>
        <PseudoBox height="100%">
          <Stack
            isInline
            direction="column"
            height="100%"
            alignItems="center"
            justifyContent="center"
          >
            <IconButton
              aria-label="Search database"
              icon="add"
              size="sm"
              shadow="0px 1px 1px black"
              _hover={{ bg: "red.400" }}
              borderRadius="50%"
            />
            <Avatar
              name={`${post.points}`}
              size="sm"
              bg="transparent"
              color="black"
            />
            <IconButton
              aria-label="Search database"
              icon="minus"
              size="sm"
              shadow="0px 1px 1px black"
              marginRight=".5rem"
              _hover={{ bg: "red.400" }}
              borderRadius="50%"
            />
          </Stack>
        </PseudoBox>
        <PseudoBox>
          <Flex
            alignItems="center"
            justifyContent="flex-start"
            marginBottom="5px"
          >
            <Tag fontWeight="bold" fontSize="10px">
              {post.title}
            </Tag>
          </Flex>
          <Text>{post.post}</Text>
          <Text>{post.points}</Text>
          <Text>{post.created_at}</Text>
        </PseudoBox>
      </Grid>
    </PseudoBox>
  );
};
export default SinglePost;
