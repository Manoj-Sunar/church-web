import {
  PageContentResponse,
  PageKey,
  UpdatePageContentPayload,
} from "@/app/Types/PageContent.types";

/* ================= TYPES ================= */

type MissionContentItemForm = {
  missionTitle: string;
  missionDescription: string;
};

export type MissionImage = {
  url?: string;
  publicId?: string;
  alt?: string;
};

export type AdminContentFormValues = {
  hero_title: string;
  hero_subtitle: string;
  hero_image_url: string;
  hero_image_publicId: string;
  hero_image_alt: string;

  main_text: string;

  mission: string;
  missionImage?: MissionImage;

  missionContent: MissionContentItemForm[];

  contact_email: string;
  contact_phone: string;
  contact_address: string;

  bank_info: string;
};

/* ================= DEFAULTS ================= */

const getDefaultMissionContent = (): MissionContentItemForm[] => [
  { missionTitle: "", missionDescription: "" },
  { missionTitle: "", missionDescription: "" },
  { missionTitle: "", missionDescription: "" },
  { missionTitle: "", missionDescription: "" },
];

const getDefaultMissionImage = (): MissionImage => ({
  url: "",
  publicId: "",
  alt: "",
});

/* ================= GET DEFAULT VALUES ================= */

export function getDefaultFormValues(
  content?: PageContentResponse
): AdminContentFormValues {
  const missionContent =
    content?.data.about?.missionContent?.length === 4
      ? content.data.about.missionContent.map((item) => ({
        missionTitle: item?.missionTitle ?? "",
        missionDescription: item?.missionDescription ?? "",
      }))
      : getDefaultMissionContent();

  return {
    hero_title: content?.data.hero?.title ?? "",
    hero_subtitle: content?.data.hero?.subtitle ?? "",
    hero_image_url: content?.data.hero?.image?.url ?? "",
    hero_image_publicId: content?.data.hero?.image?.publicId ?? "",
    hero_image_alt: content?.data.hero?.image?.alt ?? "",

    main_text: content?.data.main?.text ?? "",

    mission: content?.data.about?.mission ?? "",
    missionImage: content?.data.about?.missionImage,
    missionContent,

    contact_email: content?.data.contact?.email ?? "",
    contact_phone: content?.data.contact?.phone ?? "",
    contact_address: content?.data.contact?.address ?? "",

    bank_info: content?.data.donate?.bankInfo ?? "",


  };
}

/* ================= HELPERS ================= */

function normalizeText(value?: string) {
  return value?.trim() || "";
}

/* ================= MAPPER ================= */

export function mapFormToUpdatePayload(
  pageName: PageKey,
  values: AdminContentFormValues
): UpdatePageContentPayload {
  const payload: UpdatePageContentPayload = {
    pageName,

    hero: {
      title: normalizeText(values.hero_title),
      subtitle: normalizeText(values.hero_subtitle),
      image: {
        url: normalizeText(values.hero_image_url),
        publicId: normalizeText(values.hero_image_publicId),
        alt: normalizeText(values.hero_image_alt),
      },
    },


  };

  /* ===== ABOUT ===== */
  if (pageName === "about") {
    payload.about = {
      mission: normalizeText(values.mission),

      missionImage: {
        url: normalizeText(values.missionImage?.url),
        publicId: normalizeText(values.missionImage?.publicId),
        alt: normalizeText(values.missionImage?.alt),
      },

      // ✅ FIX
      missionContent: cleanMissionContent(values.missionContent),
    };
  }

  /* ===== CONTACT ===== */
  if (pageName === "contact") {
    payload.main = {
      text: normalizeText(values.main_text),
    };

    payload.contact = {
      email: normalizeText(values.contact_email).toLowerCase(),
      phone: normalizeText(values.contact_phone),
      address: normalizeText(values.contact_address),
    };
  }

  /* ===== DONATE ===== */
  if (pageName === "donate") {
    payload.main = {
      text: normalizeText(values.main_text),
    };

    payload.donate = {
      bankInfo: normalizeText(values.bank_info),
    };
  }

  /* ===== OTHER ===== */
  if (
    pageName === "home" ||
    pageName === "sermons" ||
    pageName === "ministries" ||
    pageName === "events"
  ) {
    payload.main = {
      text: normalizeText(values.main_text),
    };
  }

  return removeEmptyDeep(payload);
}

/* ================= CLEAN EMPTY ================= */

function removeEmptyDeep<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj
      .map(removeEmptyDeep)
      .filter((item) => item !== undefined) as T;
  }

  if (obj && typeof obj === "object") {
    const cleaned = Object.entries(obj).reduce((acc, [key, value]) => {
      const cleanedValue = removeEmptyDeep(value);

      const isEmptyObject =
        cleanedValue &&
        typeof cleanedValue === "object" &&
        !Array.isArray(cleanedValue) &&
        Object.keys(cleanedValue).length === 0;

      if (
        cleanedValue !== undefined &&
        cleanedValue !== null &&
        cleanedValue !== "" &&
        !isEmptyObject
      ) {
        (acc as any)[key] = cleanedValue;
      }

      return acc;
    }, {} as Record<string, unknown>);

    return cleaned as T;
  }

  return obj;
}



function cleanMissionContent(items: any[]) {
  return items
    .map((item) => ({
      missionTitle: item.missionTitle?.trim(),
      missionDescription: item.missionDescription?.trim(),
    }))
    .filter(
      (item) => item.missionTitle || item.missionDescription // remove empty
    );
}