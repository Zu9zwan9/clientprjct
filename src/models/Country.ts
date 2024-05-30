import {Location} from "./Location";
import {Entity} from "./Entity";

export interface Country extends Entity {
    name: string;
    code: string,
    locationList: Location[];
}
