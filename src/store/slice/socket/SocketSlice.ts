import {createSlice} from "@reduxjs/toolkit";
import {SocketStatusEnum} from "types/enums/SocketStatusEnum";
import {WebSocketState} from "types/state/WebSocketState";

const initialState = {
    state: SocketStatusEnum.DISCONNECTED
} as WebSocketState;

/*
type RoomAction = PayloadAction<{
    emit: boolean;
}>;
*/

const webSocketSlice = createSlice({
    name: "webSocketSlice",
    initialState: initialState,
    reducers: {

        wsInit(state) {
        },

        wsConnect(state) {
            state.state = SocketStatusEnum.CONNECTED;
        },

        wsDisconnect(state) {
            state.state = SocketStatusEnum.DISCONNECTED;
        }

    }
});

export const {
    wsDisconnect,
    wsConnect,
    wsInit
} = webSocketSlice.actions;

export default webSocketSlice.reducer;
