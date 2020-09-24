import React, { useCallback, useMemo } from 'react';
import { TextField } from '@material-ui/core';

import { GlobalsContext } from '../Globals.context';

function Form () {
  const {
    state: {
      owner,
      languageId,
      reference: { bookId, chapter, verse },
      quote,
      occurrence,
      tAReference
    },
    actions: {
      onOwner,
      onLanguageId,
      onBookId,
      onChapter,
      onVerse,
      onQuote,
      onOccurrence,
      onTAReference,
    }
  } = React.useContext(GlobalsContext);

  const field = useCallback(({name, value, callback}) => (
    <TextField
      id={name}
      key={name + value}
      label={name.charAt(0).toUpperCase() + name.slice(1)}
      variant='outlined'
      margin='dense' size='small'
      defaultValue={value}
      onBlur={(event) => callback(event.target.value)}
    />
  ), []);

  const fields = useMemo(() => ([
    field({ name: 'owner', value: owner, callback: onOwner }),
    field({ name: 'languageId', value: languageId, callback: onLanguageId }),
    field({ name: 'bookId', value: bookId, callback: onBookId }),
    field({ name: 'chapter', value: chapter, callback: onChapter }),
    field({ name: 'verse', value: verse, callback: onVerse }),
    field({ name: 'quote', value: quote, callback: onQuote }),
    field({ name: 'occurrence', value: occurrence, callback: onOccurrence }),
    field({ name: 'tAReference', value: tAReference, callback: onTAReference }),
  ]), [
    bookId, chapter, field, languageId, occurrence, onBookId, onChapter, onLanguageId, 
    onOccurrence, onOwner, onQuote, onTAReference, onVerse, owner, quote, tAReference, verse,
  ]);

  return (
    <form noValidate autoComplete='off'>
      <div style={{ padding: '0', fontSize: '0.9em', }}>
        {fields}
      </div>
    </form>
  );
};

export default Form;