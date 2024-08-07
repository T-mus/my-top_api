import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types, Schema as mongooseSchema } from 'mongoose'
import { Product } from '../product/product.schema'

@Schema({ timestamps: true })
export class Review extends Document {
    @Prop()
    username: string
    @Prop()
    title: string
    @Prop()
    description: string
    @Prop()
    rating: number
    @Prop({ type: mongooseSchema.Types.ObjectId, ref: Product.name })
    productId: Types.ObjectId
}

export const ReviewSchema = SchemaFactory.createForClass(Review)
