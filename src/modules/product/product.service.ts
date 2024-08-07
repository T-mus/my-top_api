import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Product } from './product.schema'
import { Model } from 'mongoose'
import { ProductDto } from './dtos/product.dto'
import { FindProductDto } from './dtos/find-product.dto'
import { Review } from '../review/review.schema'

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

    async create(dto: ProductDto) {
        return this.productModel.create(dto)
    }

    async getById(id: string) {
        return this.productModel.findById(id).exec()
    }

    async updateById(id: string, dto: ProductDto) {
        return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec()
    }

    async deleteById(id: string) {
        return this.productModel.findByIdAndDelete(id).exec()
    }
    // prettier-ignore
    async findWithReviews(dto: FindProductDto) {
        return this.productModel.aggregate([
            { $match: { categories: dto.category } },
            { $sort: { _id: 1 } },
            { $limit: dto.limit },
            { 
                $lookup: { 
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'reviews'
                }
            },
            { 
                $addFields: { 
                    reviewCount: { $size: '$reviews' },
                    reviewRatingAvg: { $round: [{ $avg: '$reviews.rating' }, 2] },
                    reviews: { 
                        $function: { 
                            body: `function (reviews) {
                                reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                return reviews
                            }`, 
                            args: ['$reviews'], 
                            lang: 'js' 
                        }
                    }
                } 
            }
        ]).exec() as unknown as Product & { reviews: Review[], reviewCount: number, reviewRatingAvg: number }[]
    }
}
