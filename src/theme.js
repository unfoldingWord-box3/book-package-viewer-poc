import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#59B7E7',
      main: '#31ADE3',
      dark: '#014263',
      contrastText: '#FFF'
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        background: 'white',
        padding: '1px',
      },
    },
    MuiInputBase: {
      root: {
        fontSize: '1em',
      },
    },
    MuiFormLabel: {
      root: {
        fontSize: '1em',
      },
    },
    MuiIconButton: {
      root: {
        padding: '8px',
      },
    },
    MuiTableCell: {
      body: {
        fontSize: '0.8em',
      },
    },
    MUIDataTable: {
      root: {
      },
      responsiveScroll: {
        maxHeight: 'unset',
        overflowX: 'unset',
        overflowY: 'unset',
      },
      paper: {
        boxShadow: '0px',
      },
    },
    MuiToolbar: {
      root: {
        top: 0,
        position: 'sticky',
        background: 'white',
        zIndex: '100',
        borderBottom: '1px solid #ccc',
      },
    },
    MuiTable: {
      root: {
        position: 'sticky',
        bottom: 0,
        background: 'white',
      },
    },
    MuiTableFooter: {
      root: {
        borderTop: '1px solid #ccc',
        width: '100%',
      },
    },
  },
});

export default theme;
