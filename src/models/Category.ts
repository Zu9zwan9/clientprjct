import {Entity} from "./Entity";

export interface Category extends Entity {
    name: string;
    cover: string;
    description: string;
}
