import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
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
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { TokenService } from './chat/token/token.service';



const pubSub = new RedisPubSub({
  connection: {
    username: 'default',
    password: 'Dp0wuTRebWGdAyaUlTW6yfSG47uBlPJV',
    host: 'redis-18243.c10.us-east-1-4.ec2.redns.redis-cloud.com',
    port: 18243,
    retryStrategy: (times) => {
      // retry strategy
      return Math.min(times * 50, 2000);
    },
  },
});

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
    ChatModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule, AppModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: async (
        configService: ConfigService,

        tokenService: TokenService,
      ) => {
        return {
          installSubscriptionHandlers: true,
          playground: true,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
          subscriptions: {
            'graphql-ws': true,
            'subscriptions-transport-ws': true,
          },
          onConnect: (connectionParams) => {
            const token = tokenService.extractToken(connectionParams);

            if (!token) {
              throw new Error('Token not provided');
            }
            const user = tokenService.validateToken(token);
            if (!user) {
              throw new Error('Invalid token');
            }
            return { user };
          },
          context: ({ req, res, connection }) => {
            if (connection) {
              return { req, res, user: connection.context.user, pubSub }; // Injecting pubSub into context
            }
            return { req, res };
          },
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
