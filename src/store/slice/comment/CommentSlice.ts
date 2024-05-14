import {createSlice} from "@reduxjs/toolkit";
import { CommentState } from "types/state/CommentState";
import { GetAuctionComment } from "./actions/GetAuctionComment";
import { createComment } from "./actions/createComment";

const initialState = {
    commentList: []
} as CommentState;

const commentSlice = createSlice({
    name: "commentSlice",
    initialState: initialState,
    reducers: {
        setCommentList(state, action) {
            state.commentList = action.payload
        },

        receiveComment(state, action) {
            state.commentList.unshift(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GetAuctionComment.fulfilled, (state, action) => {
            state.commentList = action.payload;
        });
        builder.addCase(createComment.fulfilled, (state, action) => {
            state.commentList.unshift(action.payload);
        });
    }

});

export const {setCommentList, receiveComment} = commentSlice.actions;

export default commentSlice.reducer;
