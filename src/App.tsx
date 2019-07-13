import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Externals
import ReactChartJS2 from 'react-chartjs-2';

// Material helpers
import { ThemeProvider } from '@material-ui/styles';

// ChartJS helpers
import { chartjs } from './helpers';

// Theme
import theme from './theme';

// Styles
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';

// Routes
import Routes from './Routes';

// Browser history
const browserHistory = createBrowserHistory();

const Chart = require('react-chartjs-2').Chart;

// Configure ChartJS
Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

const App: React.FC<{}> = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </ThemeProvider>
  );
};

export default App;
