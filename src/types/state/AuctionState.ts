import {Auction} from "models/Auction";
import {AuctionRate} from "models/AuctionRate";
import {CarBrand} from "models/CarBrand";
import {CarType} from "models/CarType";

export interface AuctionState {
    auctionList: Auction[];
    activeAuction?: Auction;
    brandList: CarBrand[];
    carTypeList: CarType[];
    activeRateList: AuctionRate[];
}
