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
    ValidationPipe,
} from '@nestjs/common'
import { TopPageDto } from './dtos/top-page.dto'
import { FindTopPageDto } from './dtos/find-top-page.dto'
import { IdValidationPipe } from 'src/pipes/id-validation.pipe'
import { TopPageService } from './top-page.service'
import { NOT_FOUND_PAGE_ERROR } from 'src/constants/top-page.constants'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'

@Controller('top-page')
export class TopPageController {
    constructor(private readonly topPageService: TopPageService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body(new ValidationPipe()) dto: TopPageDto) {
        return this.topPageService.create(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id', IdValidationPipe) id: string) {
        const page = await this.topPageService.getById(id)
        if (!page) {
            throw new NotFoundException(NOT_FOUND_PAGE_ERROR)
        }
        return page
    }

    @Get('byAlias/:alias')
    async getByAlias(@Param('alias') alias: string) {
        const page = await this.topPageService.getByAlias(alias)
        if (!page) {
            throw new NotFoundException(NOT_FOUND_PAGE_ERROR)
        }
        return page
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id', IdValidationPipe) id: string, @Body() dto: TopPageDto) {
        const updatedPage = await this.topPageService.updateById(id, dto)
        if (!updatedPage) {
            throw new NotFoundException(NOT_FOUND_PAGE_ERROR)
        }
        return updatedPage
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deletedPage = await this.topPageService.deleteById(id)
        if (!deletedPage) {
            throw new NotFoundException(NOT_FOUND_PAGE_ERROR)
        }
    }

    @HttpCode(200)
    @Post('find')
    async find(@Body(new ValidationPipe()) dto: FindTopPageDto) {
        return this.topPageService.findByCategory(dto.firstLevelCategory)
    }

    @Get('textSearch/:text')
    async textSearch(@Param('text') text: string) {
        return this.topPageService.findByText(text)
    }
}
