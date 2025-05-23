import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {ThemeProvider} from '@mui/material/styles'
import theme from './theme.js'
import {Provider} from 'react-redux'
import {CssBaseline, GlobalStyles} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {persistStore} from "redux-persist";
import {store} from "~/redux/store.js";

const persistor = persistStore(store)

import {injectStore} from '~/utils/authorizeAxios.js'
import {PersistGate} from "redux-persist/integration/react";

injectStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter basename={'/'}>
                <ThemeProvider theme={theme}>
                    <GlobalStyles styles={{a: {textDecoration: 'none'}}}/>
                    <CssBaseline/>
                    <App/>
                    <ToastContainer position={'bottom-left'} theme={'colored'}/>
                </ThemeProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>
)
