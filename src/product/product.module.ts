import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, JwtService],
})
export class ProductModule {}
