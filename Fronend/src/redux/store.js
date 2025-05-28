import storage from 'redux-persist/lib/storage'
import {combineReducers} from 'redux'
import {persistReducer} from "redux-persist";
import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "~/redux/user/userSlice.js";
import {activeBoardReducer} from "~/redux/activeBoard.js";
import {activeCardReducer} from "~/redux/activeCardSlice.js";
import {notificationsReducer} from "~/redux/notifications/notificationsSlice.js";

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user']
}

const reducers = combineReducers({
    user: userReducer,
    activeBoard: activeBoardReducer,
    activeCard: activeCardReducer,
    notifications: notificationsReducer
})

const persistedReducers = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducers,
    // middleware:
})