import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { legacy_createStore as createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './services/reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter} from 'react-router-dom';
import { socketMiddleware } from './services/middleware/socketMiddleware';
import { socketMiddlewareAuth } from './services/middleware/socketMiddlewareAuth';
import * as wsActions from './services/actions/wsActions';
import * as wsActionsAuth from './services/actions/wsActionsAuth';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk), applyMiddleware(socketMiddleware('wss://norma.nomoreparties.space/orders/all', wsActions), socketMiddlewareAuth('wss://norma.nomoreparties.space/orders', wsActionsAuth))));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>  
  </React.StrictMode>,
 document.getElementById('root')
);

