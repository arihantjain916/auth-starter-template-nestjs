import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly configService: ConfigService) {
    // console.log('process.env.DATABASE_URL', configService.get('database.url'));
    const adapter = new PrismaPg({
      connectionString: configService.get('database.url'),
    });
    super({ adapter });
  }
}
