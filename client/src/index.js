import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { Provider } from "react-redux";
// import store from "./redux/store";

import App from './App';
// store={store}

ReactDOM.render(
  // <Provider >
    <App/>,
  // </Provider>,
  document.getElementById('root')
);