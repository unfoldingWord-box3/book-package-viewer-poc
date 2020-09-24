import React, { useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import Page from './pages/Page';
import GlobalsContextProvider from './Globals.context';

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
    translationAcademyArticle: undefined,
    translationWordsArticle: undefined,
    config: {
      server: 'https://git.door43.org',
      cache: {
        maxAge: 1 * 1 * 1 * 60 * 1000, // override cache to 1 minute
      },
    },
  };
  const [globals, setGlobals] = useState(globalsDefault);

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalsContextProvider globals={globals} onGlobals={setGlobals}>
        <Page />
      </GlobalsContextProvider>
    </MuiThemeProvider>
  );
};

export default App;
