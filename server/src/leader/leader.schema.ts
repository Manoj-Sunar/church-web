import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {
  CloudinaryImage,
  CloudinaryImageSchema,
} from "@/src/page-content/page-content.schema";

export type LeaderDocument = HydratedDocument<Leader>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Leader {
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
    minlength: 3,
    maxlength: 100,
  })
  role!: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 10,
   
  })
  bio!: string;

  @Prop({
    type: CloudinaryImageSchema,
    required: true,
  })
  image!: CloudinaryImage;

  @Prop({
    required: true,
    
  })
  order_index!: number;
}

export const LeaderSchema = SchemaFactory.createForClass(Leader);

// 🔍 Sorting index
LeaderSchema.index({ order_index: 1 });