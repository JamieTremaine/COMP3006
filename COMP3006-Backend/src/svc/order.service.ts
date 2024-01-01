import { ObjectId } from "mongodb";
import { InvalidArgumentError } from "../model/Error/InvalidArgumentError";
import { IMenu, MenuModel } from "../model/menu";
import { IOrder, OrderModel } from "../model/order";

export class OrderService {

    public async getUserOrders(userId: string): Promise<Array<IOrder>> {
        return await OrderModel.find({userId: userId}).limit(50).exec();
    }

    public async getOrder(orderId: string): Promise<IOrder| null> {
        return await OrderModel.findById(orderId)
    }

    public async getActiveOrders(restaurantId: string): Promise<Array<IOrder>| null> {
        return await OrderModel.find({'restaurant._id': new ObjectId(restaurantId), active: true})
    }


    public async addOrder(order: IOrder): Promise<IOrder> {

        return this.verifyOrder(order).then(async (result)=> {
            if (result === false) {
                throw new InvalidArgumentError("This order does not match the menu items. Has it been altered?");
            }
            order.active = true;
            order.stage = 'recieved';
            return await OrderModel.create(order);
        })
    }

    public async deleteOrder(orderId: string): Promise<boolean> {
        const result = await OrderModel.findByIdAndDelete(orderId);
        return !!result.value
    }

    private async verifyOrder(order: IOrder): Promise<boolean> {
        const menu: IMenu | null = await MenuModel.findById(order.restaurant.currentMenuId);

        if(!menu) {
            return false;
        }

        const orderSize = order.items?.length

        const matches = order.items?.filter((orderItem) =>{
            let match = false;
            menu.MenuItems?.forEach((menuItem)=> {
                const orderCompareItem = JSON.parse(JSON.stringify(orderItem));
                orderCompareItem.extras = [];

                const menuCompareItem = JSON.parse(JSON.stringify(menuItem));
                menuCompareItem.extras = [];

                if(JSON.stringify(menuCompareItem) === JSON.stringify(orderCompareItem)){
                    match = true;
                }
            })
            return match;
        });

        return orderSize === matches?.length ? true : false;
    }

}