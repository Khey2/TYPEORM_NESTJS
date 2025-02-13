import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [
    ConfigModule.forRoot(), // variables de entorno
    
    TypeOrmModule.forRoot( { //DataSource de MYSQL
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT_MYSQL!,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME ,
      autoLoadEntities: true,
      synchronize: true,
    }),

    ProductsModule,
  ],
  controllers: [ ],
  providers: [ ],
})
export class AppModule {}
