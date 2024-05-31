import {Entity} from "./Entity";
import {User} from "./User";

export interface AuctionRate extends Entity {
    value: number;
    user: User;
    time: number;
    userName?: string;
    auctionId: string;
}
