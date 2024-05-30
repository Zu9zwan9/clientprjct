import {AuctionStatusEnum} from "types/enums/AuctionStatusEnum";
import {Entity} from "./Entity";

export interface Auction extends Entity {
    name: string;
    price: number;
    description: string;
    vinCode: string;
    carMileage: number;
    color: string;
    year: number;
    modelId: string | undefined;
    brandId: string | undefined;
    countryId: string | undefined;
    locationId: string | undefined;
    thumbnail_file: File;
    thumbnail: string;
    dateCreate: string;
    viewCount: number;
    dateClose: number;
    status: AuctionStatusEnum;
    isCommercial: boolean;
    categoryId: string;
    type: number;
}
