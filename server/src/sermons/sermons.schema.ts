import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SermonsDocument = HydratedDocument<Sermons>;

@Schema({
    timestamps: true,
    versionKey: false,
})
export class Sermons {
    @Prop({
        required: true,
        trim: true,
        minlength: 10,
        
    })
    title!: string;

    @Prop({
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    })
    slug!: string;

    @Prop({
        required: true,
        trim: true,
    })
    speaker!: string;

    // ✅ Video URL
    @Prop({
        required: true,
        trim: true,
        match: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+$/,
    })
    videoUrl!: string;

    // ✅ Description
    @Prop({
        required: true,
        trim: true,
        minlength: 20,
    })
    description!: string;

    // ✅ Sermon Date
    @Prop({
        required: true,
        type: Date,
    })
    date!: Date;
}

export const SermonsSchema=SchemaFactory.createForClass(Sermons);