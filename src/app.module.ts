import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoCredentials } from 'mongooseCredentials';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    MongooseModule.forRoot(mongoCredentials().MONGO_URI, {
      autoIndex: true,
    }),
    AuthModule,
    // MongooseModule.forFeature([
    //   { name: User.name, schema: UserSchema }
    // ]),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
