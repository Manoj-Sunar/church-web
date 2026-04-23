import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { CloudinaryImage, CloudinaryImageSchema } from "@/src/page-content/page-content.schema";

export type MinistryDocument = HydratedDocument<Ministry>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Ministry {
  
  @Prop({
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  })
  name!: string;

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
    minlength: 3,
  })
  leader!: string;

  @Prop({
    type: CloudinaryImageSchema,
    required: true,
  })
  image!: CloudinaryImage;

  @Prop({
    required: true,
    trim: true,
    minlength: 10,
    
  })
  description!: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 20,
  })
  longDescription!: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  date!: Date;
}

export const MinistrySchema = SchemaFactory.createForClass(Ministry);

// ✅ Add indexes for search
MinistrySchema.index({ name: "text", description: "text" });