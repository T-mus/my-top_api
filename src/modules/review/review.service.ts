import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Review } from './review.schema'
import { Model, Types } from 'mongoose'
import { CreateReviewDto } from './dtos/review.dto'

class Leak {}
const leaks = []

@Injectable()
export class ReviewService {
    constructor(@InjectModel(Review.name) private readonly reviewModel: Model<Review>) {}

    async create(dto: CreateReviewDto): Promise<Review> {
        return this.reviewModel.create(dto)
    }

    async getByProductId(productId: string): Promise<Review[]> {
        return this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec()
    }

    async delete(id: string): Promise<Review | null> {
        return this.reviewModel.findByIdAndDelete(id).exec()
    }

    async deleteByProductId(productId: string) {
        leaks.push(new Leak())
        return this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec()
    }
}
