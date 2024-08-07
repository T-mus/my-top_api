import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { disconnect, Types } from 'mongoose'
import { AuthDto } from 'src/modules/auth/dtos/auth.dto'

const loginDto: AuthDto = { login: 'adasta355@gmail.com', password: 'qwerty' }

describe('AuthController (e2e)', () => {
    let app: INestApplication
    let token: string

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    it('[SUCCESS]: Successful login - /auth/login (POST)', async () => {
        const response = await request(app.getHttpServer()).post('/auth/login').send(loginDto).expect(200)
        const { body } = response

        expect(body).toHaveProperty('accessToken')
    })
    it('[FAIL]: Wrong password - /auth/login (POST)', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, password: 'ytrewq' })
            .expect(401, {
                message: 'Wrong password',
                error: 'Unauthorized',
                statusCode: 401,
            })
    })
    it('[FAIL]: Non-existing email - /auth/login (POST)', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, login: 'Some random guy' })
            .expect(401, {
                message: 'User with such email was not found',
                error: 'Unauthorized',
                statusCode: 401,
            })
    })

    afterAll(() => {
        disconnect()
    })
})
