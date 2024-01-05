import express, { Express } from "express";
import dotenv from "dotenv";
import { routes } from './controllers/index';
import { connect } from "mongoose";
import swaggerUi from "swagger-ui-express";
import { getSpec } from './api-spec'
import bodyParser from "body-parser";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import websocket from './controllers/websocket.controller';

dotenv.config();

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || "127.0.0.1";
const dbPort = process.env.DB_PORT || 27017 

const allowedOrigins = ['http://localhost:4200', 'http://localhost:80'];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
};

export const app: Express = express();
const server = createServer(app);
const io = new Server(server, {
    cors: { origin: allowedOrigins }
});


const swaggerDocs = getSpec();

//swagger routes
if (process.env.BUILD === 'DEV') {
    app.use('/api/v1/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.use('/api/v1/swagger-json', (req, res) =>{
        res.send(swaggerDocs);
    });
}

if (process.env.NODE_ENV !== 'test') {
    connect(`mongodb://${dbUrl}:${dbPort}/restaurant-ordering-system`);
}

app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use('/api/v1/', routes);

websocket(io);

if (process.env.NODE_ENV !== 'test') {
    server.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}