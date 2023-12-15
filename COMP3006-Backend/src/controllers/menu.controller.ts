import { Router } from 'express';
import { MenuItem } from '../model/menuItem';
import { MenuService } from '../svc/menu.service';

export const menuRoutes = Router();

const menuService = new MenuService();

const path = '/menu'

menuRoutes.get(`${path}`, (req, res) => {

const menu: Array<MenuItem> = menuService.getMenu();
  res.send(menu);
});

menuRoutes.post(`${path}`, (req, res) => {
    res.send("yippeee ?!");
});

menuRoutes.delete(`${path}`, (req, res) => {
    res.send("yippeee ?!");
});