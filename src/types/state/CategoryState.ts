import {Category} from "models/Category";

export interface CategoryState {
    categoryList: Category[];
    activeCategory?: Category;
}
