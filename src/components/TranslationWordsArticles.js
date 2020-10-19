import React, { useState, useContext } from 'react';
import {useDeepCompareEffectNoCheck} from 'use-deep-compare-effect';
import {
  AuthenticationContext,
  RepositoryContextProvider,
  RepositoryContext,
  FileContextProvider,
  FileContext,
} from 'gitea-react-toolkit';

import { GlobalsContext } from '../Globals.context';

function Component () {
  const { state: auth, component: authComponent } = useContext(AuthenticationContext);
  const { state: repo, component: repoComponent } = useContext(RepositoryContext);
  const { state: file, component: fileComponent } = useContext(FileContext);

  return (!auth && authComponent) || (!repo && repoComponent) || fileComponent;
};

function TranslationWordsArticle () {
  const {
    state: {
      owner,
      languageId,
      tWReference,
      config,
    },
    actions: {
      onTWReference,
    }
  } = React.useContext(GlobalsContext);
  const [repository, setRepository] = useState();
  const [filepath, setFilepath] = useState();
  const [branch, setBranch] = useState('master');

  useDeepCompareEffectNoCheck(() => {
    const path = tWReference && './' + tWReference.split('/dict/')[1] + '.md';
    if (tWReference) {
      setFilepath(path);
    } else {
      setFilepath('README.md');
    };
  }, [tWReference]);

  return (
    <RepositoryContextProvider
      repository={repository}
      onRepository={setRepository}
      config={config}
      full_name='unfoldingWord/en_tw'
      branch={branch}
    >
      <FileContextProvider
        filepath={filepath}
        onFilepath={setFilepath}
      >
        <Component />
      </FileContextProvider>
    </RepositoryContextProvider>
  );
};

export default TranslationWordsArticle;