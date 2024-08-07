import { IsEnum } from 'class-validator'
import { TopLevelCategories } from '../enums/top-level-categories.enum'

export class FindTopPageDto {
    @IsEnum(TopLevelCategories)
    firstLevelCategory: TopLevelCategories
}
