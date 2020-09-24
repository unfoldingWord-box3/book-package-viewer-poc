import React, { useState, useContext } from 'react';
import {useDeepCompareEffectNoCheck} from 'use-deep-compare-effect';
import {
  AuthenticationContextProvider,
  RepositoryContextProvider,
  RepositoryContext,
  FileContextProvider,
  FileContext,
} from 'gitea-react-toolkit';
import { BlockEditable } from 'markdown-translatable';

import { GlobalsContext } from '../Globals.context';

function Component () {
  const { state: repo, component: repoComponent } = useContext(RepositoryContext);
  const { state: file, component: fileComponent } = useContext(FileContext);

  return (!repo && repoComponent) || fileComponent;
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
    tAReference && setFilepath('translate/' + tAReference + '/01.md')
  }, [tAReference]);

  return (
    <AuthenticationContextProvider>
      <RepositoryContextProvider
        repository={repository}
        onRepository={setRepository}
        config={config}
        full_name={owner + '/' + languageId + '_ta'}
        branch={branch}
      >
        <FileContextProvider
          filepath={filepath}
          onFilepath={setFilepath}
        >
          <Component />
        </FileContextProvider>
      </RepositoryContextProvider>
    </AuthenticationContextProvider>
  );
};

export default TranslationAcademy;