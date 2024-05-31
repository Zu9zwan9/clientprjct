import {createSlice} from "@reduxjs/toolkit";
import {UserState} from "types/state/UserState";
import {registerUser} from "./actions/RegisterUser";
import {LogoutUser} from "./actions/LogoutUser";
import {loginUser} from "./actions/LoginUser";
import {deleteUser} from "./actions/DeleteUser";
import {getUserList} from "./actions/GetListUser";

const initialState = {
    activeUser: null,
    userList: []
} as unknown as UserState;

const userSlice = createSlice({
    name: "userSlice",
    initialState: initialState,
    reducers: {

        setActiveUser(state, action) {
            state.activeUser = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.activeUser = action.payload;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.activeUser = action.payload;
        });
        builder.addCase(LogoutUser.fulfilled, (state, action) => {
            state.activeUser = undefined;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.userList = state.userList.filter(item => item._id !== action.payload._id);
        });
        builder.addCase(getUserList.fulfilled, (state, action) => {
            state.userList = action.payload;
        });
    }
});

export const {setActiveUser} = userSlice.actions;

export default userSlice.reducer;
