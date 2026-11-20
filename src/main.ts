import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { SwaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useWebSocketAdapter(new IoAdapter(app));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
  app.use(helmet());

  const swaggerConfig = new SwaggerConfig();
  swaggerConfig.configureSwagger(app);

  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(`PROCESS>ENV: ${process.env.PORT ?? 3000}`);
    // customLogger.log({
    //   event: 'APP_STARTUP',
    //   message: 'App startup successful',
    // });
  })
  .catch((error) => {
    Logger.error(error);
    // customLogger.error({
    //   event: 'APP_STARTUP',
    //   message: 'App startup failed',
    //   error: error as Error,
    // });
  });
