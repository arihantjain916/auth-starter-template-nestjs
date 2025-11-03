import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  configureSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('askRancho')
      .setDescription('askRancho API Description')
      .setVersion('1.0')
      .addTag(
        'CSRF',
        'Endpoints for CSRF protection. The flow is: 1) Call GET /csrf/token to get a token 2) Include this token in the X-CSRF-TOKEN header for all POST/PUT/DELETE requests',
      )
      .addApiKey({ type: 'apiKey', name: 'X-CSRF-TOKEN', in: 'header' }, 'csrf')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'access-token',
      )
      .addBasicAuth(
        {
          type: 'http',
          scheme: 'basic',
        },
        'basic-auth',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: { persistAuthorization: true, withCredentials: true },
    });
  }
}
