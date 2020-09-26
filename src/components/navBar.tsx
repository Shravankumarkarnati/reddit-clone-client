import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  MeDocument,
  MeQuery,
  useLogoutUserMutation,
  useMeQuery,
} from "../generated/graphql";
import { isServer } from "../utils/isServer";

const Logout = () => {
  const [logoutMutation] = useLogoutUserMutation();

  return (
    <div className="mainBtn">
      <button
        onClick={async () => {
          await logoutMutation({
            update: (cache, { data }) => {
              if (!data?.logoutUser.valueOf) {
                return;
              } else {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    me: null,
                  },
                });
              }
            },
          });
        }}
      >
        Logout
      </button>
    </div>
  );
};

const LoginRegisterBtn = () => {
  const router = useRouter();
  return (
    <div className="btnContainer">
      {["login", "register"].map((cur) => {
        if (router.pathname !== `/${cur}`) {
          return (
            <div className="mainBtn" key={cur}>
              <NextLink href={`/${cur}`}>
                <button>{cur}</button>
              </NextLink>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

const NavBar: React.FC = ({}) => {
  const { data } = useMeQuery({
    skip: isServer(),
  });
  const router = useRouter();
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => router.push("/")}>
        <h1>Coterie</h1>
      </div>
      <div className="mainBtn">
        <NextLink href="/createPost">
          <button>Create post</button>
        </NextLink>
      </div>
      <div>{data?.me ? <Logout /> : <LoginRegisterBtn />}</div>
    </nav>
  );
};

export default NavBar;
