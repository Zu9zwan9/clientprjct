import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL} from "store/config";

export const getCarBrandList = createAsyncThunk(
    'car/brands',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(`${BASE_URL}/api/brand/list`);
            return data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);
