import Layout from "../components/layout";
import PostsContainer from "../components/postsContainer";
import withApollo from "../utils/withApolloClient";

const Index = () => {
  return (
    <Layout>
      <PostsContainer />
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
