import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductService } from './product.service'
import { Product, ProductSchema } from './product.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Product.name,
                schema: ProductSchema,
            },
        ]),
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
