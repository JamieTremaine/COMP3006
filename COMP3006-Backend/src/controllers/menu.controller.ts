import { Router } from 'express';
import { IMenuItem } from '../model/menuItem';
import { MenuService } from '../svc/menu.service';
import { IMenu } from '../model/menu';

// eslint-disable-next-line new-cap
export const menuRoutes = Router();

const menuService = new MenuService();

const path = '/menu';

menuRoutes.get(`${path}/:menuId`, (req, res) => {
    menuService.getMenu(req.params.menuId).then((result) => {
        result ?
            res.status(404).send(`menu with id ${req.params.menuId} could not be found`):
            res.send(result);
    })
    .catch(()=> res.status(500).send());;
});

menuRoutes.post(`${path}`, (req, res) => {
    const menu: IMenu = JSON.parse(req.body);

    menuService.setMenu(menu).then((result) => {
        res.status(201).send(result)
    })
    .catch(()=> res.status(500).send());
});

menuRoutes.put(`${path}/:menuId`, (req, res) => {
    const menu: IMenu = JSON.parse(req.body);

    menuService.setMenu(menu, req.params.menuId).then((result )=>{
        result ?
            res.status(404).send(`menu with id ${req.params.menuId} could not be found`) :
            res.send(result);
    })
    .catch(()=> res.status(500).send());
});

menuRoutes.delete(`${path}/:menuId`, (req, res) => {
    menuService.deleteMenu(req.params.menuId).then((result)=>{
        result ?
            res.status(200).send() :
            res.status(404).send(`Could not delete menu with id ${req.params.menuId}`);
    })
    .catch(()=> res.status(500).send());
});
