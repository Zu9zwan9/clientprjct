import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {actionRequestConfig, BASE_URL} from "store/config";
import {Category} from "models/Category";


export const createCategory = createAsyncThunk(
    'category/create',
    async (category: Category, {rejectWithValue}) => {
        try {
            const {data} = await axios.post(
                `${BASE_URL}/api/category/create`,
                category,
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
