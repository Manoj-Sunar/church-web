import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PageContentDocument = HydratedDocument<PageContent>;

export enum PageName {
    HOME = 'home',
    ABOUT = 'about',
    SERMONS = 'sermons',
    MINISTRIES = 'ministries',
    EVENTS = 'events',
    CONTACT = 'contact',
    DONATE = 'donate',
}




@Schema({ _id: false })
export class CloudinaryImage {
    @Prop({ trim: true, default: '' })
    url!: string;

    @Prop({ trim: true, default: '' })
    publicId!: string;

    @Prop({ trim: true, default: '' })
    alt!: string;
}
export const CloudinaryImageSchema =
    SchemaFactory.createForClass(CloudinaryImage);




@Schema({ _id: false })
export class HeroSection {
    @Prop({ trim: true, default: '' })
    title!: string;

    @Prop({ trim: true, default: '' })
    subtitle!: string;

    @Prop({ type: CloudinaryImageSchema, default: {} })
    image!: CloudinaryImage;
}
export const HeroSectionSchema = SchemaFactory.createForClass(HeroSection);





@Schema({ _id: false })
export class MainSection {
    @Prop({ trim: true, default: '' })
    text!: string;
}
export const MainSectionSchema = SchemaFactory.createForClass(MainSection);





@Schema({ _id: false })
export class MissionContentItem {
    @Prop({ trim: true, default: '' })
    missionTitle!: string;

    @Prop({ trim: true, default: '' })
    missionDescription!: string;
}
export const MissionContentItemSchema =
    SchemaFactory.createForClass(MissionContentItem);





@Schema({ _id: false })
export class MissionSection {
    @Prop({ trim: true, default: '' })
    mission!: string;

    @Prop({ trim: true, default:{} })
    missionImage!:CloudinaryImage;

    @Prop({
        type: [MissionContentItemSchema],
        default: [
            {
                missionTitle: '',
                missionDescription: '',
            },
            {
                missionTitle: '',
                missionDescription: '',
            },
            {
                missionTitle: '',
                missionDescription: '',
            },
            {
                missionTitle: '',
                missionDescription: '',
            },
        ],
        validate: {
            validator: function (value: MissionContentItem[]) {
                return value.length === 4;
            },
            message: 'missionContent must contain exactly 4 items',
        },
    })
    missionContent!: MissionContentItem[];
}
export const MissionSectionSchema = SchemaFactory.createForClass(MissionSection);




@Schema({ _id: false })
export class ContactSection {
    @Prop({ trim: true, lowercase: true, default: '' })
    email!: string;

    @Prop({ trim: true, default: '' })
    phone!: string;

    @Prop({ trim: true, default: '' })
    address!: string;
}
export const ContactSectionSchema = SchemaFactory.createForClass(ContactSection);






@Schema({ _id: false })
export class DonateSection {
    @Prop({ trim: true, default: '' })
    bankInfo!: string;
}
export const DonateSectionSchema = SchemaFactory.createForClass(DonateSection);






@Schema({
    timestamps: true,
    versionKey: false,
    collection: 'page_contents',
})
export class PageContent {
    @Prop({
        type: String,
        enum: Object.values(PageName),
        required: true,
        unique: true,
    })
    pageName!: PageName;

    @Prop({ type: HeroSectionSchema, default: {} })
    hero!: HeroSection;

    @Prop({ type: MainSectionSchema, default: {} })
    main!: MainSection;

    @Prop({ type: MissionSectionSchema, default: {} })
    about!: MissionSection;

    @Prop({ type: ContactSectionSchema, default: {} })
    contact!: ContactSection;

    @Prop({ type: DonateSectionSchema, default: {} })
    donate!: DonateSection;

    

    @Prop({ type: Types.ObjectId, ref: 'User', default: null })
    updatedBy!: Types.ObjectId | null;
}

export const PageContentSchema = SchemaFactory.createForClass(PageContent);