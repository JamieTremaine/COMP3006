import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { routes } from './controllers';
import { connect } from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

connect('mongodb://127.0.0.1:27017');

app.use('/api/v1/', routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});