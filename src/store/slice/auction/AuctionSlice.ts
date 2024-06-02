import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CAR_TYPE} from "data/CarType";
import {AuctionState} from "types/state/AuctionState";
import {getAuctionById} from "./actions/GetAuctionById";
import {getAuctionRate} from "./actions/GetAuctionRate";
import {getCarBrandList} from "./actions/GetCarBrands";
import {AuctionStatusEnum} from "types/enums/AuctionStatusEnum";
import {getCountryList} from "./actions/GetCountries";
import {BASE_URL} from "../../config";
import axios from "axios";

const initialState = {
    auctionList: [],
    brandList: [],
    modelList: [],
    carTypeList: CAR_TYPE,
    activeRateList: [],
    countryList: [],
    locationList: [],
    isFollowing: false,
} as AuctionState;


export const followPrice = createAsyncThunk(
    'auction/followPrice',
    async (auctionId: string, {rejectWithValue}) => {
        try {
            const {data} = await axios.put(`${BASE_URL}/api/auction/${auctionId}/follow-price`);
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
    async (auctionId: string, {rejectWithValue}) => {
        try {
            const {data} = await axios.put(`${BASE_URL}/api/auction/${auctionId}/unfollow-price`);
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
    async (auctionId: string, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(`${BASE_URL}/api/auction/${auctionId}/check-follow-price`);
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

const auctionSlice = createSlice({
    name: "auctionSlice",
    initialState: initialState,
    reducers: {
        setActiveAuction(state, action) {
            state.activeAuction = action.payload;

            if (!action.payload) {
                state.activeRateList = [];
            }
        },
        sendAuctionRate(state, action) {
            state.activeRateList.unshift(action.payload);
        },
        receiveAuctionRate(state, action) {
            state.activeRateList.unshift(action.payload);
        },
        closeActiveAuction(state, action) {
            if (state.activeAuction && action.payload === state.activeAuction._id) {
                state.activeAuction.status = AuctionStatusEnum.CLOSE;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAuctionById.fulfilled, (state, action) => {
            state.activeAuction = action.payload;
        });
        builder.addCase(getAuctionRate.fulfilled, (state, action) => {
            state.activeRateList = action.payload;
        });
        builder.addCase(getCarBrandList.fulfilled, (state, action) => {
            state.brandList = action.payload;
        });
        builder.addCase(getCountryList.fulfilled, (state, action) => {
            state.countryList = action.payload;
        });
        builder.addCase(followPrice.fulfilled, (state, action) => {
            state.isFollowing = true; // Оновлюємо стан підписки
        });
        builder.addCase(unfollowPrice.fulfilled, (state, action) => {
            state.isFollowing = false; // Оновлюємо стан підписки
        });
        builder.addCase(checkFollowStatus.fulfilled, (state, action) => {
            state.isFollowing = action.payload.followed; // Оновлюємо стан підписки
        });
    }
});

export const {
    setActiveAuction,
    sendAuctionRate,
    receiveAuctionRate,
    closeActiveAuction
} = auctionSlice.actions;

export default auctionSlice.reducer;
