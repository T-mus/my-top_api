import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { TopLevelCategories } from '../enums/top-level-categories.enum'
import { Type } from 'class-transformer'

class VacanciesDataDto {
    @IsNumber()
    count: number
    @IsNumber()
    juniorSalary: number
    @IsNumber()
    middleSalary: number
    @IsNumber()
    seniorSalary: number
}

class TopPageAdvantageDto {
    @IsString()
    title: string
    @IsString()
    description: string
}

export class TopPageDto {
    @IsEnum(TopLevelCategories)
    firstLevelCategory: TopLevelCategories
    @IsString()
    secondLevelCategory: string // directions or tools
    @IsString()
    title: string
    @IsString()
    category: string

    @IsOptional()
    @ValidateNested()
    @Type(() => VacanciesDataDto)
    vacancies?: VacanciesDataDto

    @IsArray()
    @ValidateNested()
    @Type(() => TopPageAdvantageDto)
    advantages: TopPageAdvantageDto[]

    @IsString()
    seoText: string
    @IsString()
    tagsTitle: string

    @IsArray()
    @IsString({ each: true })
    tags: string[]
}
