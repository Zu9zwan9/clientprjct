import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {actionRequestConfig, BASE_URL} from "store/config";
import {Category} from "models/Category";


export const deleteCategory = createAsyncThunk(
    'category/delete',
    async (category: Category, {rejectWithValue}) => {
        try {
            const {data} = await axios.post(
                `${BASE_URL}/api/category/delete`,
                category,
                actionRequestConfig
            )
            return category;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);
