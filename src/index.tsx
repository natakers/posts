import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from 'components/App/app';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <ToastContainer />
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);