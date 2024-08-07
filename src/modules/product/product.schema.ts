import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ _id: false })
class ProductCharacteristic {
    @Prop()
    name: string
    @Prop()
    value: string
}

@Schema({ timestamps: true })
export class Product extends Document {
    @Prop()
    image: string
    @Prop()
    title: string
    @Prop()
    price: number
    @Prop()
    oldPrice: number
    @Prop()
    credit: number
    @Prop()
    rating: number
    @Prop()
    description: string
    @Prop()
    advantages: string
    @Prop()
    disadvantages: string
    @Prop([String])
    categories: string[]
    @Prop([String])
    tags: string[]
    @Prop({ type: [ProductCharacteristic] })
    characteristics: ProductCharacteristic[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)
