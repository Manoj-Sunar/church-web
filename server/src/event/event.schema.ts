import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {
    CloudinaryImage,
    CloudinaryImageSchema,
} from "@/src/page-content/page-content.schema";

export type EventDocument = HydratedDocument<Event>;

@Schema({
    timestamps: true,
    versionKey: false,
})
export class Event {
    @Prop({
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 120,
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
        type: Date,
    })
    date!: Date;

    @Prop({
        required: true,
        trim: true,
    })
    time!: string;

    @Prop({
        required: true,
        trim: true,
        maxlength: 150,
    })
    location!: string;

    @Prop({
        required: true,
        trim: true,
        minlength: 10,
       
    })
    description!: string;

    @Prop({
        type: CloudinaryImageSchema,
        required: true,
    })
    image!: CloudinaryImage;

    @Prop({
        required: true,
        trim: true,
        index: true,
    })
    category!: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);

// 🔍 Indexes
EventSchema.index({ title: "text", description: "text", category: "text" });
EventSchema.index({ date: 1 }); // for sorting upcoming events