import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import { IUser } from './interface/user.interface';
import * as admin from 'firebase-admin';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly model: Model<IUser>) {}
  async createUser(data: CreateUserDto) {
    const existingUser = await this.model.findOne({
      username: data.username,
      email: data.email,
    });
    if (existingUser) {
      throw new UnprocessableEntityException('user already exists');
    }
    return await this.model.create(data);
  }

  async getUserByUsername(username: string) {
    const user = await this.model.findOne({ username: username });
    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }
    return user;
  }

  async checkUsername(username: string) {
    const user = await this.model.findOne({ username: username });
    if (!user) {
      return {
        success: 'true',
        msg: 'username available',
      };
    }
    return {
      success: 'false',
      msg: 'username not available',
    };
  }

  async getUser(id: string) {
    const user = await this.model.findOne({ _id: id });
    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }

    const data = {
      user,
    };

    return data;
  }

  async uploadProfilePicture(file, id) {
    const bucket = admin.storage().bucket();
    const destination = `profiles/${id}/${file.originalname}`;

    const fileUpload = bucket.file(destination);
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise<string>((resolve, reject) => {
      stream.on('error', (err) => {
        console.error('Error uploading to Firebase Storage:', err);
        reject('Error uploading to Firebase Storage');
      });

      stream.on('finish', async () => {
        // Generate a signed URL for the file
        const [url] = await fileUpload.getSignedUrl({
          action: 'read',
          expires: '01-01-3000', // Adjust the expiration date as needed
        });

        console.log('Upload to Firebase Storage successful');
        resolve(url);
      });

      // Write the buffer to the stream
      stream.end(file.buffer);
    });
  }

  async getUsers(param, query) {
    const users = await this.model.find({
      _id: { $ne: param.id },
      username: { $regex: query.search, $options: 'i' },
    });
    return users;
  }

  async unfollowUser(data) {
    await this.model.findByIdAndUpdate(
      { _id: data.userId },
      { $pull: { following: data.friendId } },
    );

    await this.model.findByIdAndUpdate(
      { _id: data.friendId },
      { $pull: { followers: data.userId } },
    );

    return {
      success: true,
      msg: 'User unfollowed',
    };
  }

  async updateUser(props: { id: string; body: UpdateUserDto }) {
    const user = await this.model.findOne({ _id: props.id });
    if (!user) {
      throw new UnprocessableEntityException(`User Not Found`);
    }

    await this.model.findByIdAndUpdate(props.id, props.body, { new: true });

    return {
      msg: 'User updated successfully',
    };
  }

  async deleteUser({ id }) {
    const user = await this.model.findOne({ _id: id });
    if (!user) {
      throw new UnprocessableEntityException(`User Not Found`);
    }

    await this.model.findByIdAndDelete(id);

    return {
      msg: 'User deleted',
    };
  }
}
