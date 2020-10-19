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

function TranslationAcademy () {
  const {
    state: {
      owner,
      languageId,
      tAReference,
      config,
    },
    actions: {
      onTAReference,
    }
  } = React.useContext(GlobalsContext);
  const [repository, setRepository] = useState();
  const [filepath, setFilepath] = useState();
  const [branch, setBranch] = useState('master');

  useDeepCompareEffectNoCheck(() => {
    if (tAReference) {
      setFilepath('translate/' + tAReference + '/01.md');
    } else {
      setFilepath('README.md');
    };
  }, [tAReference]);

  return (
    <RepositoryContextProvider
      repository={repository}
      onRepository={setRepository}
      full_name={owner + '/' + languageId + '_ta'}
      // branch={branch}
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

export default TranslationAcademy;