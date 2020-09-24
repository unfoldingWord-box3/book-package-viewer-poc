import { useCallback } from 'react';
import deepFreeze from 'deep-freeze';
// import useEffect from 'use-deep-compare-effect';

function useGlobals({
  globals,
  onGlobals,
}) {
  const onOwner = useCallback((owner) => {
    onGlobals({...globals, owner});
  }, [globals, onGlobals]);

  const onLanguageId = useCallback((languageId) => {
    onGlobals({...globals, languageId});
  }, [globals, onGlobals]);

  const onReference = useCallback((_reference) => {
    onGlobals({...globals, reference: _reference});
  }, [globals, onGlobals]);

  const onBookId = useCallback((bookId) => {
    const reference = {...globals.reference, bookId: bookId.toLowerCase()};
    onGlobals({...globals, reference});
  }, [globals, onGlobals]);

  const onChapter = useCallback((chapter) => {
    const _reference = {...globals.reference, chapter};
    onGlobals({...globals, reference: _reference});
  }, [globals, onGlobals]);

  const onVerse = useCallback((verse) => {
    const _reference = {...globals.reference, verse};
    onGlobals({...globals, reference: _reference});
  }, [globals, onGlobals]);

  const onQuote = useCallback((quote) => {
    onGlobals({...globals, quote});
  }, [globals, onGlobals]);

  const onOccurrence = useCallback((_occurrence) => {
    const occurrence = (parseInt(_occurrence));
    onGlobals({...globals, occurrence});
  }, [globals, onGlobals]);

  const onTAReference = useCallback((tAReference) => {
    onGlobals({...globals, tAReference});
  },[globals, onGlobals]);

  const onTWReference = useCallback((tWReference) => {
    onGlobals({...globals, tWReference});
  },[globals, onGlobals]);

  const onTranslationNote = useCallback(({ 
    reference, quote, occurrence, tAReference,
  }) => {
    onGlobals({...globals, reference, quote, occurrence, tAReference});
  }, [globals, onGlobals]);

  const onTranslationWord = useCallback(({ 
    reference, quote, occurrence, tWReference,
  }) => {
    onGlobals({...globals, reference, quote, occurrence, tWReference});
  }, [globals, onGlobals]);

  return {
    state: deepFreeze(globals),
    actions: {
      onOwner,
      onLanguageId,
      onReference,
      onBookId,
      onChapter,
      onVerse,
      onQuote,
      onOccurrence,
      onTranslationNote,
      onTranslationWord,
      onTAReference,
      onTWReference,
    },
  };
};

export default useGlobals;
