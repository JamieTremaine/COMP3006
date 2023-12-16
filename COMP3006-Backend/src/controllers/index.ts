import express from 'express';
import { defaultRoute } from './defaultRoute';
import { menuRoutes } from './menu.controller';

// eslint-disable-next-line new-cap
export const routes = express.Router();

routes.use(defaultRoute);
routes.use(menuRoutes);
