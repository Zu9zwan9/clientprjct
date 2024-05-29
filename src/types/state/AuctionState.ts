import {Auction} from "models/Auction";
import {AuctionRate} from "models/AuctionRate";
import {CarBrand} from "models/CarBrand";
import {CarType} from "models/CarType";
import {CarModel} from "../../models/CarModel";

export interface AuctionState {
    auctionList: Auction[];
    activeAuction?: Auction;
    brandList: CarBrand[];
    modelList: CarModel[];
    carTypeList: CarType[];
    activeRateList: AuctionRate[];
}
