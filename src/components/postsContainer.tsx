import { Button, Flex, Stack, Text } from "@chakra-ui/core";
import React from "react";
import { usePostsQuery } from "../generated/graphql";
import Feature from "./feature";
import Wrapper from "./wrapper";
import moment from "moment";

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
    <Wrapper custom_width="medium">
      {data?.posts ? (
        <>
          <Stack spacing={8} marginTop={4}>
            {data.posts.map((cur) => {
              return (
                <Feature
                  key={cur.id}
                  title={cur.title}
                  desc={cur.postSnippet}
                  createdAt={cur.created_at}
                  points={cur.points}
                  username={cur.postOwnerUsername}
                />
              );
            })}
          </Stack>
          <Flex alignItems="center" justifyContent="center" width="100%">
            <Button
              variant="solid"
              marginTop={10}
              bg="blue.500"
              color="white"
              onClick={() => {
                loadMore(data.posts[data.posts.length - 1].created_at);
              }}
            >
              Load More
            </Button>
          </Flex>
        </>
      ) : loading ? (
        <Text>Loading....</Text>
      ) : null}
    </Wrapper>
  );
};
export default PostsContainer;

// updateQuery: (prev, { fetchMoreResult }) => {
//   // console.log(fetchMoreResult);
//   if (!fetchMoreResult) return prev;
//   return Object.assign({}, prev, {
//     posts: [...prev.posts, ...fetchMoreResult.posts],
//   });
// },
