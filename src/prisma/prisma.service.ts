import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
// import { PrismaMariaDb } from '@prisma/adapter-mariadb'; // MySQL
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(config: ConfigService) {
    const url = config.getOrThrow<string>('database.url');

    // PostgreSQL
    const adapter = new PrismaPg({ connectionString: url });

    // MySQL: comment out the PostgreSQL adapter above, uncomment this block and
    // the PrismaMariaDb import, and set provider = "mysql" in schema.prisma.
    // const { hostname, port, username, password, pathname } = new URL(url);
    // const adapter = new PrismaMariaDb({
    //   host: hostname,
    //   port: Number(port) || 3306,
    //   user: decodeURIComponent(username),
    //   password: decodeURIComponent(password),
    //   database: pathname.slice(1),
    //   connectionLimit: 10,
    // });

    super({ adapter, log: ['warn', 'error'] });
  }

  async onModuleInit() {
    // Let a failed connection stop startup instead of running without a database
    await this.$connect();
    this.logger.log('Database connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
