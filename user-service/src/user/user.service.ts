import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {User, UserDocument} from "./user.model";
import {InjectModel} from "@nestjs/mongoose";
import {UserType} from "./@types/user";


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async find(email: string, password: string): Promise<UserDocument> {
    const user  =  await this.userModel.findOne({ email, password });
    return user
  }
}
