import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
