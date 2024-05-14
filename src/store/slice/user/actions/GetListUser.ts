import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {actionRequestConfig, BASE_URL} from "store/config";


export const getUserList = createAsyncThunk(
    'user/list',
    async (none, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(
                `${BASE_URL}/api/user/list`,
                actionRequestConfig
            )
            return data;
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
