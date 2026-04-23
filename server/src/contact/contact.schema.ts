import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type ContactDocument = HydratedDocument<Contact>


@Schema({
    timestamps: true,
    versionKey: false,
})

export class Contact {
    @Prop({
        required: true,
        minLength: 3,
        maxLength: 30,
        trim: true,
    })
    name!: string

    @Prop({
        required: true,
        trim: true,
    })
    email!: string

    @Prop({
        required: true,
        trim: true,
    })
    subject!: string

    @Prop({
        required: true,
        trim: true,
    })
    messages!: string


}

export const ContactSchema = SchemaFactory.createForClass(Contact);

ContactSchema.index({ email: "text", subject: "text", name: "text" });
ContactSchema.index({ date: 1 });