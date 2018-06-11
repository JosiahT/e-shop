import { isAdmin } from '@firebase/util';

export interface AppUser {
    name: string;
    email: string;
    isAdmin: boolean;
}
