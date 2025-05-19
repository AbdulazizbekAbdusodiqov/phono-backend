import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserAuthModule } from './user-auth/user-auth.module';
import { OtpModule } from './otp/otp.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    PrismaModule,
    AuthModule,
    AdminModule,
    UserModule,
    UserAuthModule,
    OtpModule,
    AddressModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
