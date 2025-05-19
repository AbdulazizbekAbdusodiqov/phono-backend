import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { BrandModule } from './brand/brand.module';
import { ModelModule } from './model/model.module';
import { ColorsModule } from './colors/colors.module';
import { CurrencyModule } from './currency/currency.module';
import { ProductModule } from './product/product.module';
import { EmailModule } from './email/email.module';
import { PhoneNumberModule } from './phone_number/phone_number.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentMethodModule } from './payment_method/payment_method.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    PrismaModule,
    AuthModule,
    AdminModule,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
