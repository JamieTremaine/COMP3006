import { MenuModel } from "./menu";
import { OrderModel } from "./order";
import { RestaurantModel } from "./restaurant";
import { UserModel } from "./user";
import { CreateUserModel } from "./createUser";
import m2s from "mongoose-to-swagger"
import { UserLoginModel } from "./UserLogin";

export default {
    user: m2s(UserModel),
    restaurant: m2s(RestaurantModel),
    order: m2s(OrderModel),
    menus: m2s(MenuModel),
    userlogin: m2s(UserLoginModel),
    createUser: m2s(CreateUserModel)
};