import { Post } from "./../generated/graphql";
import { withApollo as withApolloLib } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";

class PaginatedPosts {
  posts: Post[];
  hasMore: Boolean;
}

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            merge(existing: PaginatedPosts, incoming: PaginatedPosts) {
              let merged: PaginatedPosts = {
                posts: [],
                hasMore: false,
              };
              merged.posts = existing
                ? [...existing.posts, ...incoming.posts]
                : incoming.posts;
              merged.hasMore = incoming.hasMore;
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
