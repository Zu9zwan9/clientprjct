import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL} from "store/config";
import {setActiveUser} from "../UserSlice";


export const LogoutUser = createAsyncThunk(
    'auth/logout',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/user/logout`);
            localStorage.removeItem('user');
            dispatch(setActiveUser(null));  // Очищення Redux стану
            return response.data;
        } catch (error) {
            return rejectWithValue('An unexpected error occurred');
        }
    }
);
