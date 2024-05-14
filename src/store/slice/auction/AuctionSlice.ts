import {createSlice} from "@reduxjs/toolkit";
import {CAR_BRAND_LIST} from "data/CarBrand";
import {CAR_TYPE} from "data/CarType";
import {AuctionState} from "types/state/AuctionState";
import {getAuctionById} from "./actions/GetAuctionById";
import {getAuctionRate} from "./actions/GetAuctionRate";
import {AuctionStatusEnum} from "types/enums/AuctionStatusEnum";

const initialState = {
    auctionList: [],
    brandList: CAR_BRAND_LIST,
    carTypeList: CAR_TYPE,
    activeRateList: []
} as AuctionState;

const auctionSlice = createSlice({
    name: "auctionSlice",
    initialState: initialState,
    reducers: {
        setActiveAuction(state, action) {
            state.activeAuction = action.payload

            if (!action.payload) {
                state.activeRateList = []
            }
        },
        sendAuctionRate(state, action) {
            state.activeRateList.unshift(action.payload);
        },
        receiveAuctionRate(state, action) {
            state.activeRateList.unshift(action.payload);
        },
        closeActiveAuction(state, action) {
            console.log("action.payload", action.payload);
            console.log("state.activeAuction._id", state.activeAuction?._id);

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
            console.log(action.payload);
            state.activeRateList = action.payload;
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
