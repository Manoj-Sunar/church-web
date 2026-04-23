import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {
    CloudinaryImage,
    CloudinaryImageSchema,
} from "@/src/page-content/page-content.schema";

export type MemberDocument = HydratedDocument<Member>;

@Schema({
    timestamps: true,
    versionKey: false,
})
export class Member {
    @Prop({
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    })
    name!: string;

     @Prop({
        required: true,
        trim: true,
       
    })
    phone!: string;
    

    @Prop({
        required: true,
        type: Date,
        index: true,
    })
    join_date!: Date;

    @Prop({
        type: CloudinaryImageSchema,
        required: false,
    })
    image?: CloudinaryImage;
}

export const MemberSchema = SchemaFactory.createForClass(Member);

// 🔍 Index for sorting newest members first
MemberSchema.index({ join_date: -1 });