import React, { useState } from 'react';
import useEffect from 'use-deep-compare-effect';
import { ResourcesContextProvider, ParallelScripture } from 'scripture-resources-rcl';

import { GlobalsContext } from '../Globals.context';

function Scripture({ height }) {
  const {
    state: {
      owner,
      languageId,
      reference,
      quote,
      occurrence,
      config,
    },
    actions: {
      onQuote,
    }
  } = React.useContext(GlobalsContext);

  const defaultResourceLinks = [
    owner + '/el-x-koine/ugnt/master/' + reference.bookId,
    owner + '/' + languageId + '/ult/master/' + reference.bookId,
    owner + '/' + languageId + '/ust/master/' + reference.bookId,
  ];
  const [resourceLinks, setResourceLinks] = useState(defaultResourceLinks);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    setResourceLinks(defaultResourceLinks);
  }, [defaultResourceLinks]);

  return (
    <ResourcesContextProvider
      resourceLinks={resourceLinks}
      defaultResourceLinks={defaultResourceLinks}
      onResourceLinks={setResourceLinks}
      resources={resources}
      onResources={setResources}
      config={config}
    >
      <ParallelScripture
        reference={reference}
        quote={quote}
        onQuote={onQuote}
        occurrence={occurrence}
        height={height - 16}
      />
    </ResourcesContextProvider>
  );
};

export default Scripture;