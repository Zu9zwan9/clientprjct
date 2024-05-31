import {configureStore} from "@reduxjs/toolkit";

import categoryReducer from "./slice/category/CategorySlice";
import auctionReducer from "./slice/auction/AuctionSlice";
import userReducer from "./slice/user/UserSlice";
import commentReducer from "./slice/comment/CommentSlice";
import webSocketReducer from './slice/socket/SocketSlice';

import socketMiddleware from "./middleware/SocketMiddleware";


const store = configureStore({
    reducer: {
        category: categoryReducer,
        auction: auctionReducer,
        user: userReducer,
        comment: commentReducer,
        socket: webSocketReducer
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([socketMiddleware]),

});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
