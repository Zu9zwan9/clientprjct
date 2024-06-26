import "reflect-metadata";
import React from 'react';

import ReactDOM from 'react-dom/client';
//import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './store/app';
import {RouterProvider} from 'react-router-dom';
import router from './routers/index'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './i18n';
import App from 'App';
import {ThemeContextProvider} from "components/template/layouts/themeContext";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    //<React.StrictMode>
    <Provider store={store}>
        <App>
            <ThemeContextProvider>
                <RouterProvider router={router}/>
            </ThemeContextProvider>
        </App>


    </Provider>
    //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
