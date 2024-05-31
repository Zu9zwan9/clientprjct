import {AuctionFilterBuilder} from "utils/filter/AuctionFilterBuilder";
import {Entity} from "../models/Entity";

export interface ServiceInterface<T extends Entity> {

    getAction(): string;

    /**
     * Отримання всіх записів з елементами
     */
    getAll(): Promise<T[]>;

    list(page: number, limit: number, searchValue: string, filter: any): Promise<any>;

    filter(builder: AuctionFilterBuilder): Promise<any>;

    findById(id: string): Promise<T>;

    /**
     * Видалення запису із заданим ідентифікатором
     *
     * @param object
     */
    remove(object: T): Promise<void>;

    /**
     * Створення об'єкта
     *
     * @param object
     */
    create(object: T): Promise<T>;

    /**
     * Редагування об'єкта
     *
     * @param object
     */
    edit(object: T): Promise<T>;
}
