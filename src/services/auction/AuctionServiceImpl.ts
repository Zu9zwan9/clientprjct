import ServiceImpl from "services/ServiceImpl";
import {AuctionServiceInterface} from "./AuctionServiceInterface";
import {Auction} from "models/Auction";
import {AuctionRate} from "models/AuctionRate";
import {BASE_URL} from "store/config";

export class AuctionServiceImpl extends ServiceImpl<Auction> implements AuctionServiceInterface {

    constructor() {
        super('auction');
    }

    getAuctionRateById(id: string): Promise<AuctionRate[]> {
        return this.https.get<AuctionRate[]>(`${BASE_URL}/api/auction-rate/${id}`)
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this));
    }

    getAuctionRateByUserId(id: string): Promise<AuctionRate[]> {
        return this.https.get<AuctionRate[]>(`${BASE_URL}/api/auction-rate-user/${id}`)
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this));
    }
}
