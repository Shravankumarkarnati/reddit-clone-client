import { Box, Text } from "@chakra-ui/core";
import NavBar from "../components/navBar";
import { usePostsQuery } from "../generated/graphql";
import withApollo from "../utils/withApolloClient";

const Index = () => {
  const { data } = usePostsQuery();
  return (
    <Box>
      <NavBar />
      {!data ? (
        <Text>Loading...</Text>
      ) : (
        data.posts.map((cur) => <Text key={cur.id}>{cur.title}</Text>)
      )}
    </Box>
  );
};

export default withApollo({ ssr: true })(Index);
