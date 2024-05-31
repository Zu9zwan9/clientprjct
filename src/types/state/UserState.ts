import {User} from "models/User";

export interface UserState {
    userList: User[];
    activeUser?: User;
}
