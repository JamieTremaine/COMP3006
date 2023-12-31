import { Injectable } from '@angular/core';
import { Order, User } from '../api/models';

@Injectable({
    providedIn: 'root'
})
export class PersistanceService {
    constructor() { }

    setUser(user: User) {
        //Angular's new ssr has a bit of a cry and fails builds because it cant access localstorage (it's fine)
        try {
            localStorage.setItem('restaurant-ordering-system-user-info', JSON.stringify(user))
        }
        catch {}
    }

    getUser(): User | null {
        try {
            const user = localStorage.getItem('restaurant-ordering-system-user-info');
            if(user) {
                return JSON.parse(user);
            } else {
                return null;
            }
        } catch {
            return null
        }
    }

    setOrder(order: Order) {
        try {
            let allOrders = this.getOrdersFromLocalStorage();

            const userOrders = allOrders?.filter(order => (order.userId === order.userId));


            const orderIndex = userOrders?.findIndex(o => o.restaurant?._id === order.restaurant?._id)

            if (orderIndex && orderIndex !== -1) {  //user already has an order from this restaurant
                (allOrders as Array<Order>)[orderIndex] = order;
            } else {
                if(!allOrders) {
                    allOrders = [];
                }

                allOrders.push(order)
            }

            localStorage.setItem('restaurant-ordering-system-user-orders', JSON.stringify(allOrders))
        }
        catch {}
    }

    removeOrder(userId: string, restaurantId: string) {
        let allOrders = this.getOrdersFromLocalStorage();
        if(allOrders) {
            const idx = allOrders?.findIndex(order => order.userId === userId && order.restaurant?._id === restaurantId);
            if(idx > -1) {
                allOrders?.splice(idx, 1);
            }
            localStorage.setItem('restaurant-ordering-system-user-orders', JSON.stringify(allOrders))
        }

    }

    getOrders(userId: string): Array<Order> | undefined {
       const usersOrders = this.getOrdersFromLocalStorage();
       return usersOrders?.filter((order) => order.userId === userId);
    }

    private getOrdersFromLocalStorage(): Array<Order> | null {
        try {
            const userOrdersString = localStorage.getItem('restaurant-ordering-system-user-orders');
                return userOrdersString ? JSON.parse(userOrdersString): null
        } catch {
            return null;
        }
    }
}
