import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {actionRequestConfig, BASE_URL} from "store/config";


export const getCategoryList = createAsyncThunk(
    'category/list',
    async (none, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(
                `${BASE_URL}/api/category/list`,
                actionRequestConfig
            )

            console.log(data);
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
