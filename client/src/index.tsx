import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'
import config from './app.config';
import Footer from './components/Footer';
import { refresh } from './utils';

axios.defaults.baseURL = config.API_HOST;
axios.defaults.withCredentials = true;
axios.defaults.validateStatus = (status) => true;

axios.interceptors.request.use(
  refresh(axios.create()),
  error => Promise.reject(error),
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* <footer>
      <Footer />
      </footer> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
