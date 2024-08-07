import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './user.schema'
import { Model } from 'mongoose'
import { AuthDto } from './dtos/auth.dto'
import { compare, hash } from 'bcryptjs'
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,
    ) {}

    async createUser(dto: AuthDto) {
        const hashedPassword = await hash(dto.password, 10)
        const newUser = new this.userModel({ email: dto.login, hashedPassword })

        return newUser.save()
    }

    async findUser(email: string) {
        return this.userModel.findOne({ email }).exec()
    }

    async validateUser(email: string, password: string): Promise<Pick<User, 'email'>> {
        const user = await this.findUser(email)
        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND_ERROR)
        }
        const isCorrectPassword = await compare(password, user.hashedPassword)
        if (!isCorrectPassword) {
            throw new UnauthorizedException(WRONG_PASSWORD_ERROR)
        }
        return { email: user.email }
    }

    async login(email: string) {
        const payload = { email }
        return { accessToken: await this.jwtService.signAsync(payload) }
    }
}
