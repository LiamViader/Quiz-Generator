import { Module } from '@nestjs/common';
import { MongoController } from './mongo.controller';
import { MongoService } from './mongo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('DB_URI'),
          }),
        }),
      ],
})
export class MongoModule {}
