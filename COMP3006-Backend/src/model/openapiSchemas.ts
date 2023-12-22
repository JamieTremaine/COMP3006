import { MenuModel } from "./menu";
import { OrderModel } from "./order";
import { RestaurantModel } from "./restaurant";
import { UserModel } from "./user";
import m2s from "mongoose-to-swagger"

export default {
    user: m2s(UserModel),
    restaurant: m2s(RestaurantModel),
    order: m2s(OrderModel),
    menu: m2s(MenuModel)
};