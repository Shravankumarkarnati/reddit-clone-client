import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";

import theme from "../theme";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

function MyApp({ Component, pageProps }: any) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
