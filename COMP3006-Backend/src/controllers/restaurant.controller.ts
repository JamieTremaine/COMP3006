import { Router } from "express";
import { RestaurantService } from "../svc/restaurant.service";
import { IRestaurant } from "../model/restaurant";

export const restaurantRoutes = Router();

const restaurantService = new RestaurantService();

const path = '/restaurant'

/**
 * @openapi
 * /restaurant/{restaurantId}:
 *  get:
 *      description: Use to get a singular restaurant by id
 *      parameters:
 *      -   in: path
 *          name: restaurantId
 *      tags:
 *      -   restaurant
 *      responses:
 *          '200':
 *              description: ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/restaurant'
 *          '404':
 *              description: restaurant not found
 *          '500':
 *              description: other server error
 */
restaurantRoutes.get(`${path}/:restaurantId`, (req, res) => {
    restaurantService.getRestaurant(req.params.restaurantId).then((result) => {
        result == null ?
            res.status(404).send(`menu with id ${req.params.restaurantId} could not be found`):
            res.send(result);
    })
    .catch(()=> res.status(500).send());
});

/**
 * @openapi
 * /restaurant/get/all:
 *  get:
 *      description: Use to get all restaurants
 *      tags:
 *      -   restaurant
 *      responses:
 *          '200':
 *              description: ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: "array"
 *                          items:
 *                              $ref: '#/components/schemas/restaurant'
 *          '500':
 *              description: other server error
 */
restaurantRoutes.get(`${path}/get/all`, (req, res) => {
    restaurantService.getAllRestaurants().then((result) => {
        res.send(result);
    })
    .catch(()=> res.status(500).send());
});

/**
 * @openapi
 * /restaurant/{restaurantId}:
 *  put:
 *      description: update an existing restaurant
 *      tags:
 *      -   restaurant
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/restaurant'
 *      responses:
 *          '204':
 *              description: restaurant was successfully updated
 *          '404':
 *              description: restaurant not found
 *          '500':
 *              description: other server error
 */
restaurantRoutes.put(`${path}/:restaurantId`, (req, res) =>{

    const menu: IRestaurant = req.body;

    restaurantService.setResturant(menu, req.params.restaurantId).then((result)=>{
        result ?
            res.status(404).send(`restaurant with id ${req.params.restaurantId} could not be found`) :
            res.send(result);
    })
    .catch(()=> res.status(500).send());
})

/**
 * @openapi
 * /restaurant:
 *  post:
 *      description: add a new restaurant
 *      tags:
 *      -   restaurant
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/restaurant'
 *      responses:
 *          '201':
 *              description: created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/restaurant'
 *          '500':
 *              description: other server error
 */
restaurantRoutes.post(`${path}`, (req, res) => {
    const restaurant: IRestaurant = req.body;

    restaurantService.setResturant(restaurant).then((result) => {
        res.status(201).send(result)
    })
    .catch(()=> res.status(500).send());
})

/**
 * @openapi
 * /restaurant/{restaurantId}:
 *  delete:
 *      description: delete an existing restaurant
 *      parameters:
 *      -   in: path
 *          name: restaurantId
 *      tags:
 *      -   restaurant
 *      responses:
 *          '200':
 *              description: restaurant was successfully deleted
 *          '404':
 *              description: restaurant not found
 *          '500':
 *              description: other server error
 */
restaurantRoutes.delete(`${path}/:restaurantId`, (req, res) => {
    restaurantService.deleteResturant(req.params.restaurantId).then((result)=>{
        result ?
            res.status(200).send() :
            res.status(404).send(`Could not delete menu with id ${req.params.restaurantId}`);
    })
    .catch(()=> res.status(500).send());
})