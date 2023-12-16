import { Router } from "express";
import { OrderService } from "../svc/order.service";
import { IMenuItem } from "../model/menuItem";
import { InvalidArgumentError } from "../model/Error/InvalidArgumentError";

export const orderRoutes = Router();

const orderService = new OrderService();

const path = '/order'

orderRoutes.post(`${path}/add`, (req, res) => {
    const item: IMenuItem = JSON.parse(req.body); 

    orderService.addToOrder(item)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            if(error instanceof InvalidArgumentError) {
                res.status(400).send(error.message);
            }
        })
});

orderRoutes.put(`${path}/add/:orderId`, (req, res) => {
    const item: IMenuItem = JSON.parse(req.body);


    orderService.addToOrder(item, req.params.orderId)
        .then((result) => {
            if (result) {
                res.send(result);
            } else {
                res.status(404).send("Could not find order to update");
            }
        })
        .catch(()=>{})
});