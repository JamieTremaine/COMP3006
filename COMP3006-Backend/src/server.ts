import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { routes } from './controllers';
import { connect } from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || "127.0.0.1";
const dbPort = process.env.DB_PORT || 27017 

connect(`mongodb://${dbUrl}:${dbPort}`);

app.use('/api/v1/', routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});