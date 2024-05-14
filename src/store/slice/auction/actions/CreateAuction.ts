import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL} from "store/config";
import {Auction} from "models/Auction";


export const createAuction = createAsyncThunk(
    'auction/create',
    async (auction: Auction, {rejectWithValue}) => {
        try {
            const {data} = await axios.post(
                `${BASE_URL}/api/auction/create`,
                auction,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
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
