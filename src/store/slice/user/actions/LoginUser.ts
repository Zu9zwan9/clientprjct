import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "models/User";
import {actionRequestConfig, BASE_URL} from "store/config";


export const loginUser = createAsyncThunk(
    'auth/login',
    async (user: User, {rejectWithValue}) => {
        try {
            const {data} = await axios.post(
                `${BASE_URL}/api/user/login`,
                user,
                actionRequestConfig
            )
            return data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);
