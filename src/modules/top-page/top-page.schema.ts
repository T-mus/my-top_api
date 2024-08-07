import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { TopLevelCategories } from './enums/top-level-categories.enum'

@Schema({ _id: false })
class VacanciesData {
    @Prop()
    count: number
    @Prop()
    juniorSalary: number
    @Prop()
    middleSalary: number
    @Prop()
    seniorSalary: number
}

@Schema({ _id: false })
class TopPageAdvantage {
    @Prop()
    title: string
    @Prop()
    description: string
}

@Schema({ timestamps: true })
export class TopPage extends Document {
    @Prop({ type: String, enum: TopLevelCategories })
    firstLevelCategory: TopLevelCategories
    @Prop()
    secondLevelCategory: string // direction or tools
    @Prop({ unique: true })
    alias: string
    @Prop()
    title: string
    @Prop()
    category: string
    @Prop({ type: VacanciesData })
    vacancies?: VacanciesData
    @Prop({ type: [TopPageAdvantage] })
    advantages: TopPageAdvantage[]
    @Prop()
    seoText: string
    @Prop()
    tagsTitle: string
    @Prop([String])
    tags: string[]
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage)

TopPageSchema.index({
    title: 'text',
    seoText: 'text',
    'advantages.title': 'text',
    'advantages.description': 'text',
})
