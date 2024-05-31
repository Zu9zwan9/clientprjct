import {BASE_URL} from "store/config";
import {Entity} from "../models/Entity";
import Service from "./Service";
import {AuctionFilterBuilder} from "utils/filter/AuctionFilterBuilder";

export default abstract class ServiceImpl<T extends Entity> extends Service<T> {


    protected constructor(action: string) {
        super();
        this.action = action;
    }

    getAll(): Promise<(T extends Entity ? any : any)[]> {
        return this.https.get<T[]>(`${BASE_URL}/api/${this.action}/list`)
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this));
    }

    findById(id: string): Promise<T extends Entity ? any : any> {
        return this.https.get<T>(`${BASE_URL}/api/${this.action}/${id}`)
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this));
    }

    remove(object: T extends Entity ? any : any): Promise<void> {

        var formData = this.jsonToFormData(object);

        return this.https.post(`${BASE_URL}/api/${this.action}/delete`, formData)
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this));
    }

    list(page: number, limit: number, searchValue: string, filter: any): Promise<any> {
        return this.https.get(`${BASE_URL}/api/${this.action}/list/paginate?page=${page}&limit=${limit}&search=${searchValue}&filter=${filter}`)
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this));
    }

    filter(builder: AuctionFilterBuilder): Promise<any> {

        var formData = this.jsonToFormData(builder);

        return this.https.post(`${BASE_URL}/api/${this.action}/filter`, formData)
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this));
    }

    create(object: T extends Entity ? any : any): Promise<T> {
        var formData = this.jsonToFormData(object);
        return this.https.post(`/api/${this.action}`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this));
    }

    edit(object: T extends Entity ? any : any): Promise<T> {

        var formData = this.jsonToFormData(object);
        formData.append("_method", "PUT");

        return this.https.post(`${BASE_URL}/api/${this.action}/${object._id}`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this));
    }

}
