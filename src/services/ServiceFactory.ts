import {UserServiceImpl} from "./user/UserServiceImpl";
import {UserServiceInterface} from "./user/UserServiceInterface";
import {CategoryServiceInterface} from "./category/CategoryServiceInterface";
import {CategoryServiceImpl} from "./category/CategoryServiceImpl";
import {AuctionServiceInterface} from "./auction/AuctionServiceInterface";
import {AuctionServiceImpl} from "./auction/AuctionServiceImpl";


export class ServiceFactory {

    constructor() {
    };

    static getUserService(): UserServiceInterface {
        return new UserServiceImpl();
    }

    static getCategoryService(): CategoryServiceInterface {
        return new CategoryServiceImpl();
    }

    static getAuctionService(): AuctionServiceInterface {
        return new AuctionServiceImpl();
    }
}
