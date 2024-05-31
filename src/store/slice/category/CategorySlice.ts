import {createSlice} from "@reduxjs/toolkit";
import {CategoryState} from "types/state/CategoryState";
import {createCategory} from "./actions/CreateCategory";
import {getCategoryList} from "./actions/GetCategory";
import {deleteCategory} from "./actions/DeleteCategory";
import {editCategory} from "./actions/EditCategory";

const initialState = {
    categoryList: []
} as CategoryState;

const categorySlice = createSlice({
    name: "categorySlice",
    initialState: initialState,
    reducers: {
        setActiveCategory(state, action) {
            state.activeCategory = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.categoryList.push(action.payload);
        });
        builder.addCase(getCategoryList.fulfilled, (state, action) => {
            state.categoryList = action.payload;

        });

        builder.addCase(deleteCategory.fulfilled, (state, action) => {

            state.categoryList = state.categoryList.filter(item => item._id !== action.payload._id);
        });
        builder.addCase(editCategory.fulfilled, (state, action) => {
            const index = state.categoryList.findIndex(item => item._id === action.payload._id);
            if (index >= 0) {
                state.categoryList[index] = action.payload;  // This ensures the category is updated in the state
            }
        });
    }

});

export const {setActiveCategory} = categorySlice.actions;

export default categorySlice.reducer;
