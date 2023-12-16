import { Router } from 'express';
import { IMenuItem } from '../model/menuItem';
import { MenuService } from '../svc/menu.service';

// eslint-disable-next-line new-cap
export const menuRoutes = Router();

const menuService = new MenuService();

const path = '/menu';

menuRoutes.get(`${path}`, (req, res) => {
    menuService.getMenu().then((result: Array<IMenuItem>) => {
        res.send(result);
    });
});

menuRoutes.post(`${path}`, (req, res) => {
    res.send('yippeee ?!');
});

menuRoutes.delete(`${path}`, (req, res) => {
    res.send('yippeee ?!');
});
