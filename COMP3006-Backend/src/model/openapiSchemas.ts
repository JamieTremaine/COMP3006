import { MenuModel } from "./menu";
import { OrderModel } from "./order";
import { RestaurantModel } from "./restaurant";
import { UserModel } from "./user";
import { CreateUserModel } from "./createUser";
import m2s from "mongoose-to-swagger"
import { UserLoginModel } from "./UserLogin";
import { StatusModel } from "./status";
import { AddressModel } from "./address";

export default {
    user: m2s(UserModel),
    address: m2s(AddressModel),
    restaurant: m2s(RestaurantModel),
    order: m2s(OrderModel),
    menu: m2s(MenuModel),
    userlogin: m2s(UserLoginModel),
    createUser: m2s(CreateUserModel),
    status: m2s(StatusModel)
};