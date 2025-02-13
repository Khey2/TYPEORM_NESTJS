import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
 //creas loger y le das este string de contetxo (se llama igual que la clase)
  private readonly logger = new Logger( 'ProductService');

  constructor(
    @InjectRepository( Product )
    private readonly productRepository: Repository<Product>
  ){}

  async create(createProductDto: CreateProductDto) {
    try {
      
      // SOLO lo crea, sincronamente no lo salva en DB
      const product = this.productRepository.create( createProductDto );
      // AQUI GUARDAS EL PRODUCTO
      await this.productRepository.save( product );

      return product;

    } catch (error) { 
      this.handleDBExceptions( error );
    }
  }

  async findAll() {

    try {
      
      const allProducts = await this.productRepository.find();

      return allProducts;

    } catch (error) {
      this.handleDBExceptions( error );
    }    
  }

  async findOne( uuid: string) {
    
    try {
      const product = await this.productRepository.findOne( { where: { id: uuid }} );

      if ( !product ) {
        throw new Error('Product not found');
      }

      return product;
    } catch (error) {
      this.handleDBExceptions( error );
    } 
  }

  async update( uuid: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.findOne( { where: { id: uuid }} );

      const newProduct = {
          ...product,
          ...updateProductDto
      }

      await this.productRepository.save( newProduct );

      return newProduct;
    } catch (error) {
      this.handleDBExceptions( error );
    } 
  }

  async remove( uuid: string) {
    try {
      const product = await this.productRepository.findOne( { where: { id: uuid }} );

      if( !product ){
        throw new Error( 'Producto no encontrado.' );
      }

      await this.productRepository.remove( product );

      return {
        message: "Producto eliminado correctamente. " 
      };
    } catch (error) {
      this.handleDBExceptions( error );
    } 

  }


  private handleDBExceptions( error: any  ){
    if( error.errno === 1062 ){
      throw new BadRequestException( error.sqlMessage );
    }

    this.logger.error( error )
    throw new InternalServerErrorException( "Unexpected error, check logs server. ")
  }
}
