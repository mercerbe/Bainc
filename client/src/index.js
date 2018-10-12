import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Footer from './components/layout/Footer'

ReactDOM.render(
  <div>
  <App/>
  <Footer/>
  </div>, document.getElementById('root'));
registerServiceWorker();
