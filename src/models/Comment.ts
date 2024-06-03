import {Entity} from "./Entity";

export interface Comment extends Entity {
    userId?: string;
    comment: string;
    auctionId?: string;
    userName?: string;
    date?: number;
    time?: number;
    timeAgo: string;
}
