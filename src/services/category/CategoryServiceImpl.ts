import ServiceImpl from "services/ServiceImpl";
import {Category} from "models/Category";
import {CategoryServiceInterface} from "./CategoryServiceInterface";

export class CategoryServiceImpl extends ServiceImpl<Category> implements CategoryServiceInterface {

    constructor() {
        super('category');
    }

}
