import express from 'express';
import { defaultRoute } from './defaultRoute';
import { menuRoutes } from './menu.controller';
import { restaurantRoutes } from './restaurant.controller';
import { orderRoutes } from './order.controller';

// eslint-disable-next-line new-cap
export const routes = express.Router();

routes.use(defaultRoute);
routes.use(menuRoutes);
routes.use(restaurantRoutes);
routes.use(orderRoutes);
