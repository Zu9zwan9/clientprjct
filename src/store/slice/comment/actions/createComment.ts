import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {actionRequestConfig, BASE_URL} from "store/config";
import { Comment } from "models/Comment";


export const createComment = createAsyncThunk(
    'comment/createComment',
    async (value: Comment, {rejectWithValue}) => {
        try {
            const {data} = await axios.post(
                `${BASE_URL}/api/comment`,
                value,
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
