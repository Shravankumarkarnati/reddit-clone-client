import { Text } from "@chakra-ui/core";
import Layout from "../components/layout";
import PostsContainer from "../components/postsContainer";
import { usePostsQuery } from "../generated/graphql";
import withApollo from "../utils/withApolloClient";

const Index = () => {
  const { data } = usePostsQuery();

  return (
    <Layout>
      {!data ? <Text>Loading...</Text> : <PostsContainer data={data} />}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
