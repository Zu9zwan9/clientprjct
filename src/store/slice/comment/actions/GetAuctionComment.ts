import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {actionRequestConfig, BASE_URL} from "store/config";


export const GetAuctionComment = createAsyncThunk(
    'comment/GetAuctionComment',
    async (id: string, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(
                `${BASE_URL}/api/comment/auction/${id}`,
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
