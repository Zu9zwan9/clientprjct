import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {actionRequestConfig, BASE_URL} from "store/config";

export const followPrice = createAsyncThunk(
    'auction/followPrice',
    async (auctionId: string, {rejectWithValue}) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/api/auction/${auctionId}/follow-price`,
                {},
                actionRequestConfig
            );
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const unfollowPrice = createAsyncThunk(
    'auction/unfollowPrice',
    async (auctionId: string, {rejectWithValue}) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/api/auction/${auctionId}/unfollow-price`,
                {},
                actionRequestConfig
            );
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const checkFollowStatus = createAsyncThunk(
    'auction/checkFollowStatus',
    async (auctionId: string, {rejectWithValue}) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/api/auction/${auctionId}/check-follow-price`,
                actionRequestConfig
            );
            return response.data.followed;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);
