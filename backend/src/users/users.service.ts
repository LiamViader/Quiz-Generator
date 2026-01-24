import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async findOneByGoogleId(googleId: string): Promise<User | undefined> {
    return this.userModel.findOne({ googleId });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }

  async createOrUpdateGoogleUser(payload: any): Promise<User> {
    const { email, sub, name, picture } = payload;

    // Try to find by email first (in case they existed before) or googleId
    let user = await this.userModel.findOne({ email });

    if (user) {
      // Update existing user with latest info
      user.googleId = sub;
      user.name = name;
      user.picture = picture;
      return user.save();
    }

    // Create new user
    const newUser = new this.userModel({
      email,
      googleId: sub,
      name,
      picture,
      dailyPersonalUsage: 0,
      lastUsageDate: new Date().toISOString().split('T')[0]
    });
    return newUser.save();
  }

  async update(user: User): Promise<User> {
    return user.save();
  }
}
