import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import mongoConfig from './mongo.config';

@Injectable()
export class MongoService {}
