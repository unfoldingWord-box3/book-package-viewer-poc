import React from 'react';

import useGlobals from './useGlobals';

export const GlobalsContext = React.createContext({});

export function GlobalsContextProvider({
  globals,
  onGlobals,
  children,
}) {
  const val = useGlobals({
    globals,
    onGlobals,
  });

  return (
    <GlobalsContext.Provider value={val}>{children}</GlobalsContext.Provider>
  );
}

export default GlobalsContextProvider;
