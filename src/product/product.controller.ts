import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';
import { ProductService } from './product.service';

interface queryParams {
  category: string;
  min: number;
  max: number;
}

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('/filter-by-category')
  async getByCategory(@Query('category') category?: string) {

    console.log(category);
    return this.productService.findByCategory(category);
  }
  @Get('/filter-by-quantity-less-than')
  async getByQuantityLessThan(@Query('quantity', ParseIntPipe) quantity: number) {
    return this.productService.findByQuantityLessThan(quantity);
  }

  @Get('filter-by-quantity-range')
  async getByQuantityRange(
    @Query('min', ParseIntPipe) min: number,
    @Query('max', ParseIntPipe) max: number,
  ) {
    return this.productService.findByQuantityRange(min, max);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateQuantityDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

}
