import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ToothTime API',
      version: '1.0.0',
      description: 'REST API for the ToothTime dental clinic booking system',
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 5000}/api`, description: 'Local server' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'],
}

export const swaggerSpec = swaggerJSDoc(options)
