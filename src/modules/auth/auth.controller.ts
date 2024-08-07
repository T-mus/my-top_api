import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { AuthDto } from './dtos/auth.dto'
import { AuthService } from './auth.service'
import { ALREADY_EXIST_ERROR } from './auth.constants'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() dto: AuthDto) {
        const existingUser = await this.authService.findUser(dto.login)
        if (existingUser) {
            throw new BadRequestException(ALREADY_EXIST_ERROR)
        }
        return this.authService.createUser(dto)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    async login(@Body() { login, password }: AuthDto) {
        const { email } = await this.authService.validateUser(login, password)
        return this.authService.login(email)
    }
}
