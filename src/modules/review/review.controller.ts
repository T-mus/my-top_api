import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { CreateReviewDto } from './dtos/review.dto'
import { ReviewService } from './review.service'
import { REVIEW_NOT_FOUND } from './review.constants'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { IdValidationPipe } from 'src/pipes/id-validation.pipe'

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @UsePipes(new ValidationPipe())
    @Post('create')
    async create(@Body() dto: CreateReviewDto) {
        return this.reviewService.create(dto)
    }

    @Get('byProduct/:productId')
    async getByProductId(@Param('productId', IdValidationPipe) productId: string) {
        return this.reviewService.getByProductId(productId)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deletedDoc = await this.reviewService.delete(id)
        if (!deletedDoc) {
            throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
    }

    @Delete('byProduct/delete/:productId')
    async deleteByProductId(@Param('productId', IdValidationPipe) productId: string) {
        const { deletedCount } = await this.reviewService.deleteByProductId(productId)
        return { deletedCount }
    }
}
