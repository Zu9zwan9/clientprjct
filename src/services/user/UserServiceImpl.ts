import ServiceImpl from "services/ServiceImpl";
import {UserServiceInterface} from "./UserServiceInterface";
import {User} from "models/User";

export class UserServiceImpl extends ServiceImpl<User> implements UserServiceInterface {

    constructor() {
        super('user');
    }

}
