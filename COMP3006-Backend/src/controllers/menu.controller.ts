import { Router } from 'express';
import { IMenuItem } from '../model/menuItem';
import { MenuService } from '../svc/menu.service';
import { IMenu } from '../model/menu';

// eslint-disable-next-line new-cap
export const menuRoutes = Router();

const menuService = new MenuService();

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
    .catch(()=> res.status(500).send('error'));
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
