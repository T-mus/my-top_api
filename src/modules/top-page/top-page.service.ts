import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { TopPage } from './top-page.schema'
import { Model } from 'mongoose'
import { TopPageDto } from './dtos/top-page.dto'
import { TopLevelCategories } from './enums/top-level-categories.enum'

@Injectable()
export class TopPageService {
    constructor(@InjectModel(TopPage.name) private topPageModel: Model<TopPage>) {}

    async create(dto: TopPageDto): Promise<TopPage> {
        return this.topPageModel.create(dto)
    }

    async getById(id: string): Promise<TopPage> {
        return this.topPageModel.findById(id).exec()
    }

    async getByAlias(alias: string): Promise<TopPage> {
        return this.topPageModel.findOne({ alias }).exec()
    }
    // prettier-ignore
    async findByCategory(firstLevelCategory: TopLevelCategories): Promise<TopPage[]> {
        return this.topPageModel
            .aggregate([
                { $match: { firstLevelCategory } },
                { 
                    $group: { 
                        _id: { secondLevelCategory: '$secondLevelCategory' }, 
                        pages: { $push: { alias: '$alias', title: '$title' } }
                    } 
                },
            ])
            .exec()
    }

    async findByText(text: string): Promise<TopPage[]> {
        return this.topPageModel.find({ $text: { $search: text, $caseSensitive: false } })
    }

    async updateById(id: string, dto: TopPageDto): Promise<TopPage> {
        return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec()
    }

    async deleteById(id: string): Promise<TopPage> {
        return this.topPageModel.findByIdAndDelete(id).exec()
    }
}
