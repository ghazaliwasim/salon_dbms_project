import React from 'react';
import ReactDOM from 'react-dom';

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

import MainRouter from './routers/MainRouter';

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: '#ff165d',
    },
    secondary: {
      main: '#ff9a00',
    },
    tertiary: {
      main: '#3ec1d3',
    },
  },
  typography: {useNextVariants: true},
});

ReactDOM.render (
  <MuiThemeProvider theme={theme}><MainRouter /></MuiThemeProvider>,
  document.getElementById ('root')
);
