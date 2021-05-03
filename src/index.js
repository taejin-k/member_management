// react
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

// component
import App from './component/App';

// css
import './css/common.css';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App></App>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
