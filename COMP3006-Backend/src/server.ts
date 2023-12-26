import express, { Express } from "express";
import dotenv from "dotenv";
import { routes } from './controllers';
import { connect } from "mongoose";
import swaggerUi from "swagger-ui-express";
import openapiSchemas from "./model/openapiSchemas";
import { getSpec } from './spec'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || "127.0.0.1";
const dbPort = process.env.DB_PORT || 27017 

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'COMP3006-Backend',
            description: 'Express API for COMP3006',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1'
            }
        ],
        components: {
            schemas: openapiSchemas
        }
    },
    apis: ['./src/server.ts', 'src/controllers/*.controller.ts'],
  };

const swaggerDocs = getSpec();

//swagger routes
if (process.env.BUILD === 'DEV') {
    app.use('/api/v1/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.use('/api/v1/swagger-json', (req, res) =>{
        res.send(swaggerDocs);
    });
}


connect(`mongodb://${dbUrl}:${dbPort}`);

app.use('/api/v1/', routes);


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});