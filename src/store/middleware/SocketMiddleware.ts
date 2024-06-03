import {isAsyncThunkAction, Middleware} from "@reduxjs/toolkit";
import {Auction} from "models/Auction";
import {io, Socket} from "socket.io-client";
import {closeActiveAuction, receiveAuctionRate, sendAuctionRate} from "store/slice/auction/AuctionSlice";
import {receiveComment} from "store/slice/comment/CommentSlice";
import {wsConnect, wsDisconnect, wsInit} from "store/slice/socket/SocketSlice";
import {setActiveUser} from "store/slice/user/UserSlice";
import {BASE_URL} from '../config';

let socket: Socket;

const socketMiddleware: Middleware = store => next => action => {
    const response = next(action);

    if (wsInit.match(action)) {
        socket = io(`${BASE_URL}`, {transports: ["websocket"]});

        socket.on("connect", () => {
            store.dispatch(wsConnect());
            const state = store.getState();
            if (state.user.activeUser) {
                socket.emit("join_room", [state.user.activeUser._id]);
            }
        });

        socket.on("disconnect", () => {
            console.log('web socket disconnect');
            store.dispatch(wsDisconnect());
        })

        socket.on("auction_close", (data) => {
            console.log('auction close socket');
            store.dispatch(closeActiveAuction(data));
        })

        socket.on("auction_rate", (data) => {
            console.log("receive rate", data);
            store.dispatch(receiveAuctionRate(data));
        });

        socket.on("user", (data) => {
            console.log("user", data);
            store.dispatch(setActiveUser(data));
        });

        socket.on("comment", (data) => {
            console.log("comment", data);
            store.dispatch(receiveComment(data));
        });

        console.log('init web socket');
    }


    if (sendAuctionRate.match(action) && socket) {
        //console.log("ads")

        socket.emit("auction_rate", action.payload);
    }


    //console.log("getAuctionById",action,getAuctionById.typePrefix);
    if (isAsyncThunkAction(action) && socket) {

        console.log("join_room emit", action.payload);

        const state = store.getState();

        console.log("activeUser", state.user.activeUser);

        if (action.payload)

            if (state.user.activeUser) {
                socket.emit("join_room", [((action.payload) as Auction)._id, state.user.activeUser._id]);
            } else {
                socket.emit("join_room", [((action.payload) as Auction)._id]);
            }


    }


    return response;

}

export default socketMiddleware;
