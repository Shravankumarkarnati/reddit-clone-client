import { withApollo as withApolloLib } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

const withApollo = withApolloLib(client);

export default withApollo;
