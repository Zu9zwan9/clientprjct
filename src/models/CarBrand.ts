import {CarModel} from "./CarModel";
import {Entity} from "./Entity";

export interface CarBrand extends Entity {
    name: string;
    modelList: CarModel[];
}
