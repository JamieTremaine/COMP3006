import { InvalidArgumentError } from "../model/Error/InvalidArgumentError";
import { IMenuItem, MenuItem } from "../model/menuItem";
import { IOrder, Order } from "../model/order";

export class OrderService {

    public async addToOrder(item: IMenuItem, orderId?: string): Promise<IOrder | null> {

        let order : IOrder | null;

        //Get the item from the db. Sanity check that data hasnt been changed by the user 
        const menuItem = await MenuItem.findOne(item); 
        if (!menuItem) {
            throw new InvalidArgumentError("Invalid menu item");
        }

        if (orderId) {
            order = await Order.findOneAndUpdate({ _id: orderId }, 
                { $push: { items: item } },
                { $inc: { total: menuItem.price } }
            );
        } else {
           const orderToAdd: IOrder = { items:[item], total: menuItem.price };
           order = await Order.create(orderToAdd);
        }

        return order;
    }

}