// 🔥 Better naming (consistent PascalCase)
export type PageKey =
  | "home"
  | "about"
  | "sermons"
  | "ministries"
  | "events"
  | "contact"
  | "donate";

// ================= IMAGE =================
export type CloudinaryImage = {
  url?: string;
  publicId?: string;
  alt?: string;
};

// ================= HERO =================
export type HeroSection = {
  title?: string;
  subtitle?: string;
  image?: CloudinaryImage;
};

// ================= MAIN =================
export type MainSection = {
  text?: string;
};

// ================= ABOUT =================
export type MissionContentItem = {
  missionTitle?: string;
  missionDescription?: string;
};

export type AboutSection = {
  mission?: string;
  missionImage?: CloudinaryImage;
  missionContent?: MissionContentItem[];
};

// ================= CONTACT =================
export type ContactSection = {
  email?: string;
  phone?: string;
  address?: string;
};

// ================= DONATE =================
export type DonateSection = {
  bankInfo?: string;
};

// ================= RESPONSE =================


type pageResponse={
 _id?: string;
  pageName: PageKey;

  hero?: HeroSection;
  main?: MainSection;
  about?: AboutSection;
  contact?: ContactSection;
  donate?: DonateSection;

  updatedBy?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type PageContentResponse = {
   success:boolean;
   message:string;
   data:pageResponse;
};



export type UpdatePageContentPayload = {
  pageName?: PageKey; // 🔥 make optional (backend validates)
  hero?: HeroSection;
  main?: MainSection;
  about?: AboutSection;
  contact?: ContactSection;
  donate?: DonateSection;
};