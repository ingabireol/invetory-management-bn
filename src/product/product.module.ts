import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsModule } from 'src/log/log.module';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),LogsModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
