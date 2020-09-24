import { withApollo as withApolloLib } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            merge(existing: any[], incoming: any[]) {
              const merged = existing ? [...existing, ...incoming] : incoming;
              return merged;
            },

            read(existing: any[]) {
              return existing;
            },
          },
        },
      },
    },
  }),
  credentials: "include",
});

const withApollo = withApolloLib(client);

export default withApollo;
