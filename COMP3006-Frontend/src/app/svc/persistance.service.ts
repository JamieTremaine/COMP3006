import { Injectable } from '@angular/core';
import { User } from '../api/models';

@Injectable({
    providedIn: 'root'
})
export class PersistanceService {
    constructor() { }

    setUser(user: User) {
        //Angular's new ssr has a bit of a cry and fails builds because it cant access localstorage (it's fine)
        try {
            localStorage.setItem('restaurant-ordering-sysyem-user-info', JSON.stringify(user))
        }
        catch {}
    }

    getUser(): User | null {
        try {
            const user = localStorage.getItem('restaurant-ordering-sysyem-user-info');
            if(user) {
                return JSON.parse(user);
            } else {
                return null;
            }
        } catch {
            return null
        }
    }

    setOrders() {

    }

    getOrders() {

    }
}
