import { Test, TestingModule } from '@nestjs/testing'
import { ReviewService } from './review.service'
import { getModelToken } from '@nestjs/mongoose'
import { Review } from './review.schema'
import { Types } from 'mongoose'

describe('ReviewService', () => {
    let service: ReviewService

    const exec = { exec: jest.fn() }
    const reviewRepositoryFactory = () => ({
        create: jest.fn(),
        find: () => exec,
        fidnByIdAndDelete: () => exec,
        deleteMany: () => exec,
    })

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReviewService,
                { provide: getModelToken(Review.name), useFactory: reviewRepositoryFactory },
            ],
        }).compile()
        service = module.get<ReviewService>(ReviewService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
    it('(Mongoose) findByproductId - success', async () => {
        const productId = new Types.ObjectId().toHexString()
        reviewRepositoryFactory().find().exec.mockReturnValueOnce([{ productId }])

        const response = await service.getByProductId(productId)
        expect(response[0]).toHaveProperty('productId')
        expect(response[0].productId).toBe(productId)
    })
})
