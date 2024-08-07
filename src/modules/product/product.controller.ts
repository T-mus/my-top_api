import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { ProductDto } from './dtos/product.dto'
import { FindProductDto } from './dtos/find-product.dto'
import { ProductService } from './product.service'
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants'
import { IdValidationPipe } from 'src/pipes/id-validation.pipe'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('create')
    async create(@Body() dto: ProductDto) {
        return this.productService.create(dto)
    }

    @Get(':id')
    async get(@Param('id', IdValidationPipe) id: string) {
        const product = await this.productService.getById(id)
        if (!product) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
        }
        return product
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id', IdValidationPipe) id: string, @Body() dto: ProductDto) {
        const updatedProduct = await this.productService.updateById(id, dto)
        if (!updatedProduct) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
        }
        return updatedProduct
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deletedProduct = await this.productService.deleteById(id)
        if (!deletedProduct) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
        }
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindProductDto) {
        return this.productService.findWithReviews(dto)
    }
}
