import { Post } from "./../generated/graphql";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { withApolloLib } from "./withApolloLib";
import { NextPageContext } from "next";

class PaginatedPosts {
  posts: Post[];
  hasMore: Boolean;
}

const client = (ctx: NextPageContext) =>
  new ApolloClient({
    uri:
      process.env.NODE_ENV === "production"
        ? (process.env.NEXT_PUBLIC_SERVER_URL as string)
        : "http://localhost:4000/graphql",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
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
