import { PageName } from "@/src/page-content/page-content.schema";


export class PageContentResponseDto {
  id!: string;
  pageName!: PageName;
  hero!: {
    title: string;
    subtitle: string;
    image: {
      url: string;
      publicId: string;
      alt: string;
    };
  };
  main!: {
    text: string;
  };
  about!: {
    heading: string;
    description: string;
  };
  contact!: {
    email: string;
    phone: string;
    address: string;
  };
  donate!: {
    bankInfo: string;
  };
 
  createdAt!: Date;
  updatedAt!: Date;
}