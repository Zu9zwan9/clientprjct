import {CarModel} from "./CarModel";
import {Entity} from "./Entity";

export interface CarBrand extends Entity {
    id: number;
    name: string;
    modelList: CarModel[];
}
