import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "store/config";


export const followPrice = createAsyncThunk(
    'auction/followPrice',
    async ({ auctionId, userId }: { auctionId: string, userId: string }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${BASE_URL}/api/auction/${auctionId}/${userId}/follow-price`);
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

export const unfollowPrice = createAsyncThunk(
    'auction/unfollowPrice',
    async ({ auctionId, userId }: { auctionId: string, userId: string }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${BASE_URL}/api/auction/${auctionId}/${userId}/unfollow-price`);
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

export const checkFollowStatus = createAsyncThunk(
    'auction/checkFollowStatus',
    async ({ auctionId, userId }: { auctionId: string, userId: string }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/auction/${auctionId}/${userId}/check-follow-price`);
            return data.followed;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);
