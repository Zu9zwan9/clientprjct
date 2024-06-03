import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {CommentState} from "types/state/CommentState";
import {GetAuctionComment} from "./actions/GetAuctionComment";
import {createComment} from "./actions/createComment";
import {Comment} from "models/Comment";

const initialState = {
    commentList: []
} as CommentState;

const commentSlice = createSlice({
    name: "commentSlice",
    initialState: initialState,
    reducers: {
        setCommentList(state, action: PayloadAction<Comment[]>) {
            state.commentList = action.payload;
        },
        receiveComment(state, action: PayloadAction<Comment>) {
            const commentExists = state.commentList.some(
                (comment: WritableDraft<Comment>) => comment._id === action.payload._id
            );
            if (!commentExists) {
                state.commentList.unshift(action.payload as WritableDraft<Comment>);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GetAuctionComment.fulfilled, (state, action: PayloadAction<Comment[]>) => {
            state.commentList = action.payload;
        });
        builder.addCase(createComment.fulfilled, (state, action: PayloadAction<Comment>) => {
            const commentExists = state.commentList.some(
                (comment: WritableDraft<Comment>) => comment._id === action.payload._id
            );
            if (!commentExists) {
                state.commentList.unshift(action.payload as WritableDraft<Comment>);
            }
        });
    }
});

export const {setCommentList, receiveComment} = commentSlice.actions;

export default commentSlice.reducer;
