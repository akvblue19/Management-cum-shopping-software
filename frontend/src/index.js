import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducer/auth'
import productReducer from './store/reducer/product'
import signupReducer from './store/reducer/signup'
import profileReducer from './store/reducer/profile'
import variationReducer from './store/reducer/productVariation'
import adminReducer from './store/reducer/admin'
import metadataReducer from './store/reducer/metadata'
import categoryReducer from './store/reducer/category'
import updateReducer from './store/reducer/update'
import logoutReducer from './store/reducer/logout'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 


const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    signup: signupReducer,
    profile: profileReducer,
    variation: variationReducer,
    admin: adminReducer,
    metadata: metadataReducer,
    category: categoryReducer,
    update: updateReducer,
    logout: logoutReducer
});


const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store = {store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
) 

ReactDOM.render(app,document.getElementById('root')
);

serviceWorker.unregister();
