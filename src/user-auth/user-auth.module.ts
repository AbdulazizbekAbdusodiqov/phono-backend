import { Module, forwardRef } from "@nestjs/common";
import { UserAuthService } from "./user-auth.service";
import { UserAuthController } from "./user-auth.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../user/user.module";
import { OtpModule } from "../otp/otp.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule, PrismaModule, UserModule, OtpModule, forwardRef(() => OtpModule)],
  controllers: [UserAuthController],
  providers: [UserAuthService],
  exports: [UserAuthService],
})
export class UserAuthModule {}
