import { Router } from 'express';

// eslint-disable-next-line new-cap
export const defaultRoute = Router();

defaultRoute.get('/', (req, res) => {
    res.send("What's up doc ?!");
});
