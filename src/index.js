import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './ProductSearch.css';
import reportWebVitals from './reportWebVitals';
import ProductSearch from "./ProductSearch";

ReactDOM.render(
  <React.StrictMode>
    <ProductSearch />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
