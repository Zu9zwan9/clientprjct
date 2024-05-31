import ServiceImpl from "services/ServiceImpl";
import {CarBrand} from "models/CarBrand";
import {CarBrandServiceInterface} from "./CarBrandServiceInterface";

export class CategoryServiceImpl extends ServiceImpl<CarBrand> implements CarBrandServiceInterface {

    constructor() {
        super('category');
    }

}
