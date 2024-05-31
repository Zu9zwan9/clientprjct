import {Auction} from "models/Auction";
import {AuctionRate} from "models/AuctionRate";
import {ServiceInterface} from "services/ServiceInterface";

export interface AuctionServiceInterface extends ServiceInterface<Auction> {
    getAuctionRateById(id: string): Promise<AuctionRate[]>;

    getAuctionRateByUserId(id: string): Promise<AuctionRate[]>;
}
