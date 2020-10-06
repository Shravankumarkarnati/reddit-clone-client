import { Post } from "./../generated/graphql";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { withApolloLib } from "./withApolloLib";
import { NextPageContext } from "next";

class PaginatedPosts {
  posts: Post[];
  hasMore: Boolean;
  cursor: number;
}
const runFun = (
  existing: PaginatedPosts,
  incoming: PaginatedPosts,
  readField: any
) => {
  const ePosts = existing.posts;
  const iPosts = incoming.posts;
  const rPosts: Post[] = [];
  const temp: Record<string, number> = {};
  ePosts.map((cur) => {
    const id = readField("id", cur);
    if (!temp[id]) {
      rPosts.push(cur);
      temp[id] = 1;
    }
  });
  iPosts.map((cur) => {
    const id = readField("id", cur);
    if (!temp[id]) {
      rPosts.push(cur);
      temp[id] = 1;
    }
  });
  return rPosts;
};

const client = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: "http://localhost:4000/graphql",

    // process.env.NODE_ENV === "production"
    //   ? (process.env.NEXT_PUBLIC_SERVER_URL as string)
    //   : "http://localhost:4000/graphql",
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
              merge(
                existing: PaginatedPosts,
                incoming: PaginatedPosts,
                { readField }
              ) {
                let merged: PaginatedPosts = {
                  posts: [],
                  hasMore: false,
                  cursor: 0,
                };
                merged.posts = existing
                  ? runFun(existing, incoming, readField)
                  : incoming.posts;
                merged.hasMore = incoming.hasMore;
                merged.cursor = incoming.cursor;
                return merged;
              },
              read(existing: any) {
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
