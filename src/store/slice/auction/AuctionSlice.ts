import {createSlice} from "@reduxjs/toolkit";
import {CAR_TYPE} from "data/CarType";
import {AuctionState} from "types/state/AuctionState";
import {getAuctionById} from "./actions/GetAuctionById";
import {getAuctionRate} from "./actions/GetAuctionRate";
import {getCarBrandList} from "./actions/GetCarBrands";
import {AuctionStatusEnum} from "types/enums/AuctionStatusEnum";
import {getCountryList} from "./actions/GetCountries";

const initialState = {
    auctionList: [],
    brandList: [],
    modelList: [],
    carTypeList: CAR_TYPE,
    activeRateList: [],
    countryList: [],
    locationList: [],
} as AuctionState;

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
    }
});

export const {
    setActiveAuction,
    sendAuctionRate,
    receiveAuctionRate,
    closeActiveAuction
} = auctionSlice.actions;

export default auctionSlice.reducer;
