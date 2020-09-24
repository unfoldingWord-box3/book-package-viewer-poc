import React, { useState } from 'react';
import useEffect from 'use-deep-compare-effect';
import MUIDataTable from 'mui-datatables';
import { ResourceContext, ResourceContextProvider } from "scripture-resources-rcl";
import { BlockEditable } from 'markdown-translatable';

import { GlobalsContext } from '../Globals.context';

function Component () {
  const {
    state: {
      reference,
    },
    actions: {
      onTranslationWord,
    }
  } = React.useContext(GlobalsContext);
  const [title, setTitle] = useState();
  const [columns, setColumns] = useState();
  const [data, setData] = useState();
  const context = React.useContext(ResourceContext);

  useEffect(() => {
    const { state } = context;
    if (state && state.project) state.project.file()
    .then((_file) => {
      const rows = _file.split('\n').map(row => row.split('\t'));
      const _ = rows.shift();
      setData(rows);
    });
  }, [context]);

  useEffect(() => {
    const { state } = context;
    const _title = state && state.manifest.dublin_core.title;
    setTitle(_title);
  }, [context]);

  useEffect(() => {
    const _columns = [
      {
        name: 'Book',
        options: {
          filter: false,
          filterList: [],
        },
      },
      {
        name: 'Chapter',
        options: {
          filter: true,
          filterList: [reference.chapter.toString()],
          customFilterListOptions: { render: value => `Chapter: ${value}` },
        },
      },
      {
        name: 'Verse',
        options: {
          filter: true,
          filterList: [reference.verse.toString()],
          customFilterListOptions: { render: value => `Verse: ${value}` },
        },
      },
      {
        name: 'ID',
        options: {
          filter: false,
          display: false,
        },
      },
      {
        name: 'SupportReference',
        options: {
          filter: true,
          filterList: [],
          customFilterListOptions: { render: value => `SupportReference: ${value}` },
        },
      },
      {
        name: 'OrigQuote',
        options: {
          filter: false,
          display: true,
          customBodyRender: (value) => (<span style={{backgroundColor: 'yellow'}}>{value}</span>),
        },
      },
      {
        name: 'Occurrence',
        options: {
          filter: false,
          display: false,
        },
      },
      {
        name: 'GLQuote',
        options: {
          filter: false,
          display: false,
        },
      },
      {
        name: 'OccurrenceNote',
        options: {
          filter: false,
          display: false,
          customBodyRender: (value) => (<BlockEditable markdown={value} editable={false} />),
        },
      },
    ];
    setColumns(_columns);
  }, [reference]);

  const options = {
    print: false,
    download: false,
    responsive: false,
    selectableRows: 'none',
    onRowClick: (rowData, rowMeta) => {
      const rawRowData = data[rowMeta.dataIndex]; // rowData is mutated by customBodyRender
      const [bookId, chapter, verse, id, tWReference, quote, occurrence] = rawRowData;
      onTranslationWord({
        reference: {bookId: bookId.toLowerCase(), chapter, verse},
        quote,
        occurrence,
        tWReference,
      });
    },
  };

  return (
    <MUIDataTable
      title={title}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

function Container () {
  const {
    state: {
      reference,
      config,
    },
  } = React.useContext(GlobalsContext);

  const resourceLink = 'klappy/en/tw/master/' + reference.bookId;
  const [ resource, setResource ] = React.useState();

  return (
    <div style={{height: '250px', overflow: 'auto'}} >
      <ResourceContextProvider
        resource={resource}
        resourceLink={resourceLink} 
        onResource={setResource}
        config={config}
      >
        <Component />
      </ResourceContextProvider>
    </div>
  )
};

export default Container;