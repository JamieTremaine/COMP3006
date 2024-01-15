import openapiSchemas from "./model/openapiSchemas";
import swaggerJsdoc, { Options } from "swagger-jsdoc";
import * as fs from 'fs';

const options: Options = {
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

const openApiDocs = swaggerJsdoc(options)

fs.writeFileSync('./spec.json', JSON.stringify(openApiDocs));

export function getSpec() { return openApiDocs }