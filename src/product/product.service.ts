import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogService } from 'src/log/log.service';
import { Between, LessThan, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    private readonly logsService: LogService,
    @InjectRepository(Product)
    private readonly productRepository : Repository<Product>){
  }
  
  async create(createProductDto: CreateProductDto) {
    const {name} = createProductDto;
    const existingProduct = this.productRepository.find({where: {name}});
    if(existingProduct){
      throw new ConflictException('Product with this name arleady exists');
    }

    const product = this.productRepository.create(createProductDto);
    await this.logsService.createLog('added', product.ID, product.name);
    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(ID: number) {
    return await  this.productRepository.findOne({
      where: { ID }
    });
  }

  async update(id: number, updateProductDto: UpdateQuantityDto) {
    const product = await this.findOne(id);
    const {quantity} = updateProductDto;
    if(!product){
      throw new NotFoundException('Product not found');
    }    
    if(quantity < 0){
      throw new BadRequestException('Quantity can not be negative');
    }
    product.quantity = quantity;
    await this.logsService.createLog('update', product.ID, product.name);
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if(!product){
      throw new NotFoundException('Product with id :'+id+' Does not exist');
    }
    if(product.quantity > 0)
      throw new BadRequestException('Can not delete a product because quantity is not zero')
    await this.logsService.createLog('Deleted', product.ID, product.name);
    return this.productRepository.remove(product);
  }

  async findByCategory(category: string) :Promise<Product[]>{
    return await this.productRepository.find(
      {where: {category}}
    );
  }
  async findByQuantityRange(min: number,max: number): Promise<Product[]>{
    return await this.productRepository.find(
      {where: {
        quantity: Between(min,max)
      }}
    );
  }
  async findByQuantityLessThan(quantity: number) : Promise<Product[]>{
    return await  this.productRepository.find(
      {where:
        {
          quantity: LessThan(quantity)
        }
      }
    );
  }

  

}

