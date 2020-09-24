import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Paper } from '@material-ui/core';

import Form from '../components/Form';
import Scripture from '../components/Scripture';
import TranslationNotesTable from '../components/TranslationNotesTable';
import TranslationWordsTable from '../components/TranslationWordsTable';
import TranslationAcademy from '../components/TranslationAcademy';
import TranslationWordsArticle from '../components/TranslationWordsArticles';
import './Page.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

function Page () {
  const rowHeight = 60;
  const scriptureHeight = rowHeight * 3;

  const layouts = {
    lg: [
      { i: 'form', x: 0, y: 0, w: 6, h: 1, },
      { i: 'scripture', x: 0, y: 0, w: 6, h: 3, },
      { i: 'tn', x: 0, y: 3, w: 3, h: 4, },
      { i: 'twl', x: 3, y: 7, w: 3, h: 4, },
      { i: 'unfoldingWord/en/ta/master', x: 0, y: 7, w: 3, h: 4, },
      { i: 'tw', x: 3, y: 7, w: 3, h: 4, },
    ],
  };
  const breakpoints = { lg: 1200, };
  const cols = { lg: 6, };

  return (
     <div className="container">
       <ResponsiveGridLayout autoSize={true} className="layout" layouts={layouts} breakpoints={breakpoints} cols={cols} rowHeight={rowHeight} draggableHandle=".drag-handle">
        <Paper key="form">
          <hr className='drag-handle' />
          <Form />
        </Paper>
        <Paper key="scripture" style={{ overflow: 'scroll' }}>
          <hr className='drag-handle' />
          <Scripture height={scriptureHeight} />
        </Paper>
        <Paper key="tn">
          <hr className='drag-handle' />
          <TranslationNotesTable />
        </Paper>
        <Paper key="twl">
          <hr className='drag-handle' />
          <TranslationWordsTable />
        </Paper>
        <Paper key="unfoldingWord/en/ta/master" style={{ overflow: 'scroll' }}>
          <hr className='drag-handle' />
          <TranslationAcademy />
        </Paper>
        <Paper key="tw" style={{ overflow: 'scroll' }}>
          <hr className='drag-handle' />
          <TranslationWordsArticle />
        </Paper>
      </ResponsiveGridLayout>
    </div>
  );
};

export default Page;
