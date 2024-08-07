import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { TopPageModule } from './modules/top-page/top-page.module'
import { ProductModule } from './modules/product/product.module'
import { ReviewModule } from './modules/review/review.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { getMongoConfig } from './configs/mongo.config'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig,
        }),
        AuthModule,
        TopPageModule,
        ProductModule,
        ReviewModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
