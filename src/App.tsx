import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import Routes from './Routes';
import { CookiesProvider } from 'react-cookie';


const Chart = require('react-chartjs-2').Chart;


// Configure ChartJS
Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

const App: React.FC<{}> = () => {
  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </CookiesProvider>
  );
};

export default App;
