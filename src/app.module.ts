import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
// import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { UserAuthModule } from "./user-auth/user-auth.module";
import { OtpModule } from "./otp/otp.module";
import { AddressModule } from "./address/address.module";
import { RegionModule } from "./region/region.module";
import { DistrictModule } from "./district/district.module";
import { BrandModule } from "./brand/brand.module";
import { ModelModule } from "./model/model.module";
import { ColorsModule } from "./colors/colors.module";
import { CurrencyModule } from "./currency/currency.module";
import { ProductModule } from "./product/product.module";
import { EmailModule } from "./email/email.module";
import { PhoneNumberModule } from "./phone_number/phone_number.module";
import { PaymentModule } from "./payment/payment.module";
import { PaymentMethodModule } from "./payment_method/payment_method.module";
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    PrismaModule,
    // AuthModule,
    UserModule,
    UserAuthModule,
    OtpModule,
    AddressModule,
    RegionModule,
    DistrictModule,
    BrandModule,
    ModelModule,
    ColorsModule,
    CurrencyModule,
    ProductModule,
    EmailModule,
    PhoneNumberModule,
    PaymentModule,
    PaymentMethodModule,
    ChatModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
