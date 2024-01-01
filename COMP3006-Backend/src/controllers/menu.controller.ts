import { Router } from 'express';
import { MenuService } from '../svc/menu.service';
import { IMenu } from '../model/menu';
import { RestaurantService } from '../svc/restaurant.service';

// eslint-disable-next-line new-cap
export const menuRoutes = Router();

const menuService = MenuService.getService();
const restaurantService = RestaurantService.getService();

const path = '/menu';

/**
 * @openapi
 * /menu/{menuId}:
 *  get:
 *      description: Use to get a singular menu by id
 *      parameters:
 *      -   in: path
 *          name: menuId
 *      tags:
 *      -   menu
 *      responses:
 *          '200':
 *              description: ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/menu'
 *          '404':
 *              description: menu not found
 *          '500':
 *              description: other server error
 */
menuRoutes.get(`${path}/:menuId`, (req, res) => {
    menuService.getMenu(req.params.menuId).then((result) => {
        result ?
            res.status(404).send(`menu with id ${req.params.menuId} could not be found`):
            res.send(result);
    })
    .catch(()=> res.status(500).send());;
});

/**
 * @openapi
 * /menu/{restaurantId}/current:
 *  get:
 *      description: Use to get a the current menu used by a resturant
 *      parameters:
 *      -   in: path
 *          name: restaurantId
 *      tags:
 *      -   menu
 *      responses:
 *          '200':
 *              description: ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/menu'
 *          '404':
 *              description: menu not found
 *          '500':
 *              description: other server error
 */
menuRoutes.get(`${path}/:restaurantId/current`, (req, res) => {
    restaurantService.getRestaurant(req.params.restaurantId).then((result) => {
        if (result) {
            if (result.currentMenuId) {
                menuService.getMenu(result.currentMenuId).then((menuResult)=> {
                    if (menuResult) {
                        res.send(menuResult);
                    } else {
                        res.status(404).send(`menus from ${req.params.restaurantId} could not be found`);
                    }
                })
            } else {
                res.status(404).send(`menus for ${req.params.restaurantId} has not been set`);
            }
        } else {
            res.status(404).send(`restaurant ${req.params.restaurantId} could not be found`);
        }  
    });
    
});

menuRoutes.get(`${path}/:restaurantId/all`, (req, res) => {
    menuService.getrestaurantMenus(req.params.restaurantId).then((result) => {
        result ?
        res.status(404).send(`menus from ${req.params.restaurantId} could not be found`):
        res.send(result);
    })
})

/**
 * @openapi
 * /menu:
 *  post:
 *      description: add a new menu
 *      tags:
 *      -   menu
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/menu'
 *      responses:
 *          '201':
 *              description: created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/menu'
 *          '500':
 *              description: other server error
 */
menuRoutes.post(`${path}`, (req, res) => {
    const menu: IMenu = req.body;

    menuService.setMenu(menu).then((result) => {
        res.status(201).send(result)
    })
    .catch(()=> res.status(500).send());
});

/**
 * @openapi
 * /menu/{menuid}:
 *  put:
 *      description: update an existing menu
 *      tags:
 *      -   menu
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/menu'
 *      responses:
 *          '204':
 *              description: menu was successfully updated
 *          '404':
 *              description: menu not found
 *          '500':
 *              description: other server error
 */
menuRoutes.put(`${path}/:menuId`, (req, res) => {
    const menu: IMenu = req.body;

    menuService.setMenu(menu, req.params.menuId).then((result )=>{
        result ?
            res.status(404).send(`menu with id ${req.params.menuId} could not be found`) :
            res.status(204).send();
    })
    .catch(()=> res.status(500).send());
});

/**
 * @openapi
 * /menu/{menuid}:
 *  delete:
 *      description: delete an existing menu
 *      parameters:
 *      -   in: path
 *          name: menuId
 *      tags:
 *      -   menu
 *      responses:
 *          '200':
 *              description: menu was successfully deleted
 *          '404':
 *              description: menu not found
 *          '500':
 *              description: other server error
 */
menuRoutes.delete(`${path}/:menuId`, (req, res) => {
    menuService.deleteMenu(req.params.menuId).then((result)=>{
        result ?
            res.status(200).send() :
            res.status(404).send(`Could not delete menu with id ${req.params.menuId}`);
    })
    .catch(()=> res.status(500).send());
});
