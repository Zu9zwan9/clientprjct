import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "models/User";
import {actionRequestConfig, BASE_URL} from "store/config";


export const deleteUser = createAsyncThunk(
    'user/delete',
    async (user: User, {rejectWithValue}) => {
        try {
            const {data} = await axios.post(
                `${BASE_URL}/api/user/delete`,
                user,
                actionRequestConfig
            )
            return user;
        } catch (error: any) {
            //console.log("Response",error.response.data.message , error.response);
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);
