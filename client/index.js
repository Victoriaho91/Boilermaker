import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import '../public/index.css';

ReactDom.render(
  <Provider store={store}>
    <div>Hello, world!</div>,

  </Provider>,
  document.getElementById('app')
)
