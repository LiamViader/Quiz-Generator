import { Module } from '@nestjs/common';
import { MongoController } from './mongo.controller';
import { MongoService } from './mongo.service';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig from './mongo.config';

@Module({
    imports: [MongooseModule.forRoot(mongoConfig.uri)]
})
export class MongoModule {}
