import { Router } from "express";
import { RestaurantService } from "../svc/restaurant.service";
import { IRestaurant } from "../model/restaurant";

export const restaurantRoutes  = Router();

const restaurantService = new RestaurantService();

const path = '/restaurant'

restaurantRoutes.get(`${path}/:restaurantId`, (req, res) => {

    restaurantService.getRestaurant(req.params.restaurantId).then((result) => {
        result ?
            res.status(404).send(`menu with id ${req.params.restaurantId} could not be found`):
            res.send(result);
    })
    .catch(()=> res.status(500).send());;

});

restaurantRoutes.get(`${path}/all`, (req, res) => {
    restaurantService.getAllRestaurants().then((result) => {
        res.send(result);
    })
    .catch(()=> res.status(500).send());;
})

restaurantRoutes.put(`${path}/:restaurantId`, (req, res) =>{

    const menu: IRestaurant = JSON.parse(req.body);

    restaurantService.setResturant(menu, req.params.restaurantId).then((result)=>{
        result ?
            res.status(404).send(`restaurant with id ${req.params.restaurantId} could not be found`) :
            res.send(result);
    })
    .catch(()=> res.status(500).send());

})

restaurantRoutes.post(`${path}`, (req, res) => {

    const restaurant: IRestaurant = JSON.parse(req.body);

    restaurantService.setResturant(restaurant).then((result) => {
        res.status(201).send(result)
    })
    .catch(()=> res.status(500).send());
})

restaurantRoutes.delete(`${path}/:restaurantId`, (req, res) => {
    restaurantService.deleteResturant(req.params.restaurantId).then((result)=>{
        result ?
            res.status(200).send() :
            res.status(404).send(`Could not delete menu with id ${req.params.restaurantId}`);
    })
    .catch(()=> res.status(500).send());
})