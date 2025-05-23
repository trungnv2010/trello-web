import storage from 'redux-persist/lib/storage'
import {combineReducers} from 'redux'
import {persistReducer} from "redux-persist";
import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "~/redux/user/userSlice.js";

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user']
}

const reducers = combineReducers({
    user: userReducer
})

const persistedReducers = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducers,
    // middleware:
})