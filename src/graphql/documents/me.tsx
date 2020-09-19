import { gql } from "@apollo/client";

export const MeDocument = gql`
  query Me {
    me {
      id
      username
    }
  }
`;
