const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Online Learning Platform',
            version: '1.0.0',
            description:'NodeJs and Angular Simple Online Leaning Platform'
        },
        servers: [
            {
                url: 'http://localhost:3001'
            }
        ]
    },
    apis: ['./route/*.js']
};

const swaggerSpecs = swaggerJsDoc(options);
module.exports = swaggerSpecs;
