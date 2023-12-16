import { Router } from "express";
import { OrderService } from "../svc/order.service";
import { InvalidArgumentError } from "../model/Error/InvalidArgumentError";
import { IOrder } from "../model/order";

export const orderRoutes = Router();

const orderService = new OrderService();

const path = '/order'

orderRoutes.get(`${path}/recent/:userId`, (req, res)=>{

    orderService.getUserOrders(req.params.userId).then((result) => {
        res.send(result);
    })
    .catch(()=> res.status(500).send());
})

orderRoutes.post(path, (req, res) => {
    const item: IOrder = JSON.parse(req.body); 
    
    orderService.addOrder(item).then((result)=>{
        res.status(201).send(result);
    })
    .catch((err)=>{
        if (err instanceof InvalidArgumentError) {
            res.status(400).send(err.message);
        } else {
            res.status(500).send();
        }
    });
});

orderRoutes.delete(`${path}/:orderId`, (req, res) =>{
    orderService.deleteOrder(req.params.orderId).then((result)=>{
        result ?
            res.status(200).send() :
            res.status(404).send(`Could not delete menu with id ${req.params.orderId}`);
    })
    .catch(()=> res.status(500).send());
});

