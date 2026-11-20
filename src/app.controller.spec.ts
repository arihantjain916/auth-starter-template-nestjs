import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    })
      // The guards need ConfigService and Prisma; this test only checks the handlers
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    appController = app.get<AppController>(AppController);
  });

  it('GET / returns "Hello World!"', () => {
    expect(appController.getHello()).toBe('Hello World!');
  });

  it('GET /admin returns the admin greeting', () => {
    expect(appController.getAdmin()).toBe('Hello, admin!');
  });
});
