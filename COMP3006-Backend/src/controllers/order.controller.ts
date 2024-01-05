import { Router } from "express";
import { OrderService } from "../svc/order.service";
import { InvalidArgumentError } from "../model/Error/InvalidArgumentError";
import { IOrder } from "../model/order";

export const orderRoutes = Router();

const orderService = new OrderService();

const path = '/order'

/**
 * @openapi
 * /order/{userId}/recent:
 *  get:
 *      description: Use to get a singular order by id
 *      parameters:
 *      -   in: path
 *          name: userId
 *      tags:
 *      -   order
 *      responses:
 *          '200':
 *              description: ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: "array"
 *                          items:
 *                              $ref: '#/components/schemas/order'
 *          '500':
 *              description: other server error
 */
orderRoutes.get(`${path}/:userId/recent`, (req, res)=>{

    orderService.getUserOrders(req.params.userId).then((result) => {
        res.send(result);
    })
    .catch(()=> res.status(500).send());
})

/**
 * @openapi
 * /order/{orderId}:
 *  get:
 *      description: Use to get a singular order by id
 *      parameters:
 *      -   in: path
 *          name: orderId
 *      tags:
 *      -   order
 *      responses:
 *          '200':
 *              description: ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/order'
 *          '500':
 *              description: other server error
 */
orderRoutes.get(`${path}/:orderId`, (req, res)=>{

    orderService.getOrder(req.params.orderId).then((result) => {
        result !== null ?
            res.send(result) :
            res.status(404).send(`Could not find order with id ${req.params.orderId}`);
    })
    .catch(()=> res.status(500).send());
})

/**
 * @openapi
 * /order/{restaurantId}/active:
 *  get:
 *      description: Use to get all active orders for a restaurant
 *      parameters:
 *      -   in: path
 *          name: restaurantId
 *      tags:
 *      -   order
 *      responses:
 *          '200':
 *              description: ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: "array"
 *                          items:
 *                              $ref: '#/components/schemas/order'
 *          '500':
 *              description: other server error
 */
orderRoutes.get(`${path}/:restaurantId/active`, (req, res)=>{

    orderService.getActiveOrders(req.params.restaurantId).then((result) => {
        if(result !== null) {
            res.send(result);
        } else {
            res.status(404).send();
        }
    
    })
    .catch(()=> res.status(500).send());
})

/**
 * @openapi
 * /order:
 *  post:
 *      description: add a new order
 *      tags:
 *      -   order
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/order'
 *      responses:
 *          '201':
 *              description: created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/order'
 *          '400':
 *              description: Invalid order 
 *          '500':
 *              description: other server error
 */
orderRoutes.post(path, (req, res) => {
    const item: IOrder = req.body; 
    
    orderService.addOrder(item).then((result)=>{
        res.status(201).send(result);
    })
    .catch((err)=>{
        if (err instanceof InvalidArgumentError) {
            res.status(400).send(err.message);
        } else {
            res.status(500).send('this one?');
        }
    });
});

/**
 * @openapi
 * /order/{orderId}:
 *  delete:
 *      description: delete an existing order
 *      parameters:
 *      -   in: path
 *          name: orderId
 *      tags:
 *      -   order
 *      responses:
 *          '200':
 *              description: order was successfully deleted
 *          '404':
 *              description: order not found
 *          '500':
 *              description: other server error
 */
orderRoutes.delete(`${path}/:orderId`, (req, res) =>{
    orderService.deleteOrder(req.params.orderId).then((result)=>{
        result ?
            res.status(200).send() :
            res.status(404).send(`Could not delete menu with id ${req.params.orderId}`);
    })
    .catch(()=> res.status(500).send());
});

