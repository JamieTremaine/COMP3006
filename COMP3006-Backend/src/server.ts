import express, { Express } from "express";
import dotenv from "dotenv";
import { routes } from './controllers/index';
import { connect } from "mongoose";
import swaggerUi from "swagger-ui-express";
import openapiSchemas from "./model/openapiSchemas";
import { getSpec } from './spec'
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || "127.0.0.1";
const dbPort = process.env.DB_PORT || 27017 

const swaggerDocs = getSpec();

//swagger routes
if (process.env.BUILD === 'DEV') {
    app.use('/api/v1/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.use('/api/v1/swagger-json', (req, res) =>{
        res.send(swaggerDocs);
    });
}

connect(`mongodb://${dbUrl}:${dbPort}/restaurant-ordering-system`);

const allowedOrigins = ['http://localhost:4200', 'http://localhost:80'];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use('/api/v1/', routes);


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});