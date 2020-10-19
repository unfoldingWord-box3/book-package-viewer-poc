import React, { useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import Page from './pages/Page';
import GlobalsContextProvider from './Globals.context';
import { AuthenticationContextProvider } from 'gitea-react-toolkit';

/* CSS for React Grid View */
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function App() {
  const globalsDefault = {
    owner: 'unfoldingWord',
    languageId: 'en',
    reference: { bookId: 'tit', chapter: 1, verse: 1 },
    quote: 'Θεοῦ',
    occurrence: 1,
    tAReference: undefined,
    tWReference: undefined,
    config: {
      server: 'https://bg.door43.org',
      tokenid: "book-package-viewer-poc",
      cache: {
        maxAge: 1 * 1 * 1 * 60 * 1000, // override cache to 1 minute
      },
    },
  };
  const [globals, setGlobals] = useState(globalsDefault);
  const [authentication, setAuthentication] = useState();

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalsContextProvider globals={globals} onGlobals={setGlobals}>
        <AuthenticationContextProvider config={globals.config} authentication={authentication} onAuthentication={setAuthentication}>
          <Page />
        </AuthenticationContextProvider>
      </GlobalsContextProvider>
    </MuiThemeProvider>
  );
};

export default App;
