import {Entity} from "./Entity";

export interface User extends Entity {
    name: string;
    email: string;
    role: string;
    password: string;
    confirmPassword: string;
    thumbnail: string;
    thumbnail_file: File;

}
