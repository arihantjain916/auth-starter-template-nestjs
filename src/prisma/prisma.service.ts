import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
// import { PrismaMariaDb } from '@prisma/adapter-mariadb'; // MySQL
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(private readonly config: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: config.getOrThrow<string>('database.url'),
    });

    // MySQL: comment out the PostgreSQL line above and use this instead

    // const poolConfig = {
    //   host: config.getOrThrow('database.host'),
    //   user: config.getOrThrow('database.user'),
    //   password: config.getOrThrow('database.password'),
    //   database: config.getOrThrow('database.name'),
    //   connectionLimit: 10,
    // };

    // const adapter = new PrismaMariaDb(poolConfig);
    super({
      adapter,
      log: ['info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Prisma connected successfully');
    } catch (e) {
      console.error('❌ Connection failed', e);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
