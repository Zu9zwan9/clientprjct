import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {Entity} from "../models/Entity";
import {ServiceInterface} from "./ServiceInterface";
import {AuctionFilterBuilder} from "utils/filter/AuctionFilterBuilder";

export default abstract class Service<T extends Entity> implements ServiceInterface<T> {

    protected readonly https: AxiosInstance;

    protected action: string;

    public constructor(/*protected readonly baseURL: string, protected readonly path?: string, */) {

        this.https = axios.create();
        this.action = "";
        //this.http.defaults.headers.co
    }

    getAction(): string {
        return this.action;
    }

    abstract getAll(): Promise<T[]>;

    abstract findById(id: string): Promise<T>;

    abstract remove(object: T): Promise<void>;

    abstract list(page: number, limit: number, searchValue: string, filter: any): Promise<any>;

    abstract create(object: T): Promise<T>;

    abstract edit(object: T): Promise<T> ;

    abstract filter(builder: AuctionFilterBuilder): Promise<any>;

    protected buildFormData(formData: FormData, data: any, parentKey: any) {
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach(key => {
                this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            const value = data == null ? '' : data;

            //console.log((value instanceof File),parentKey,value);
            formData.append(parentKey, value);
        }
    }

    protected jsonToFormData(data: any) {
        const formData = new FormData();

        this.buildFormData(formData, data, null);

        return formData;
    }

    protected isAxiosError(value: any): value is AxiosError {
        return typeof value?.response === 'object';
    }

    protected createParams(record: Record<string, any>): URLSearchParams {

        const params: URLSearchParams = new URLSearchParams();
        for (const key in record) {
            if (Object.prototype.hasOwnProperty.call(record, key)) {
                const value: any = record[key];
                if (value !== null && value !== undefined) {
                    params.append(key, value);
                } else {
                    console.debug(`Param key '${key}' was null or undefined and will be ignored`);
                }
            }
        }
        return params;
    }

    protected handleResponse<T>(response: AxiosResponse<T>): T {
        return response.data;
    }

    protected handleError(error: unknown): never {
        throw new Error(error as any);
    }

}
