"use client";

import React, { FC, useEffect, useMemo, useState } from "react";
import { Controller, Path, useForm } from "react-hook-form";
import { ImageIcon, Save, Type, CloudCheck } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TextAreaField } from "@/app/Components/TextField/TextAreaField";
import { InputField } from "@/app/Components/TextField/InputField";
import { Button } from "@/app/Components/UI/Button/Button";
import { Card } from "@/app/Components/UI/Card";
import { Heading } from "@/app/Components/UI/Heading";
import { ImageUploader } from "../ImageUploader";

import {
  AdminContentFormValues,
  getDefaultFormValues,
  mapFormToUpdatePayload,
} from "./Page-Content.mapper";
import {
  PageContentResponse,
  PageKey,
} from "@/app/Types/PageContent.types";
import { adminAPI } from "@/app/API/admin.api";
import { ErrorMessage } from "@/app/Components/Common/ErrorMessage";
import { SuccessMessage } from "@/app/Components/Common/SuccessMSG";
import toast from "react-hot-toast";

type FieldType = "text" | "textarea" | "email" | "tel";

type FieldConfig = {
  name: Path<AdminContentFormValues>;
  label: string;
  type: FieldType;
  rows?: number;
  placeholder?: string;
  colSpan?: "1" | "2";
  rules?: {
    required?: string;
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
};

type SectionConfig = {
  title: string;
  fields: FieldConfig[];
};

const HERO_FIELDS: FieldConfig[] = [
  {
    name: "hero_title",
    label: "Main Heading",
    type: "text",
    placeholder: "Enter hero title",
    rules: {
      minLength: {
        value: 2,
        message: "Main heading must be at least 2 characters",
      },
      maxLength: {
        value: 120,
        message: "Main heading must be at most 120 characters",
      },
    },
  },
  {
    name: "hero_subtitle",
    label: "Subheading",
    type: "textarea",
    rows: 3,
    placeholder: "Enter hero subtitle",
    rules: {
      minLength: {
        value: 5,
        message: "Subheading must be at least 5 characters",
      },
      maxLength: {
        value: 500,
        message: "Subheading must be at most 500 characters",
      },
    },
  },
];

const MAIN_TEXT_FIELD: FieldConfig = {
  name: "main_text",
  label: "Description / Body Text",
  type: "textarea",
  rows: 6,
  placeholder: "Enter page content",
  rules: {
    minLength: {
      value: 10,
      message: "Content must be at least 10 characters",
    },
    maxLength: {
      value: 10000,
      message: "Content must be at most 10000 characters",
    },
  },
};

const ABOUT_MISSION_FIELDS: FieldConfig[] = [
  {
    name: "mission",
    label: "Mission Title",
    type: "text",
    placeholder: "Enter mission title",
    rules: {
      minLength: {
        value: 2,
        message: "Mission title must be at least 2 characters",
      },
      maxLength: {
        value: 120,
        message: "Mission title must be at most 120 characters",
      },
    },
  },

  {
    name: "missionContent.0.missionTitle",
    label: "Mission 1",
    type: "text",
    placeholder: "Enter title",
  },
  {
    name: "missionContent.0.missionDescription",
    label: "Description",
    type: "textarea",
    rows: 4,
    placeholder: "Enter description",
  },

  {
    name: "missionContent.1.missionTitle",
    label: "Mission 2",
    type: "text",
    placeholder: "Enter title",
  },
  {
    name: "missionContent.1.missionDescription",
    label: "Description",
    type: "textarea",
    rows: 4,
    placeholder: "Enter description",
  },

  {
    name: "missionContent.2.missionTitle",
    label: "Mission 3",
    type: "text",
    placeholder: "Enter title",
  },
  {
    name: "missionContent.2.missionDescription",
    label: "Description",
    type: "textarea",
    rows: 4,
    placeholder: "Enter description",
  },

  {
    name: "missionContent.3.missionTitle",
    label: "Mission 4",
    type: "text",
    placeholder: "Enter title",
  },
  {
    name: "missionContent.3.missionDescription",
    label: "Description",
    type: "textarea",
    rows: 4,
    placeholder: "Enter description",
  },
];

const CONTACT_FIELDS: FieldConfig[] = [
  {
    name: "contact_email",
    label: "Email",
    type: "email",
    placeholder: "Enter contact email",
    colSpan: "1",
    rules: {
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: "Enter a valid email address",
      },
    },
  },
  {
    name: "contact_phone",
    label: "Phone",
    type: "tel",
    placeholder: "Enter contact phone",
    colSpan: "1",
    rules: {
      maxLength: {
        value: 30,
        message: "Phone must be at most 30 characters",
      },
    },
  },
  {
    name: "contact_address",
    label: "Address",
    type: "text",
    placeholder: "Enter contact address",
    colSpan: "2",
    rules: {
      maxLength: {
        value: 255,
        message: "Address must be at most 255 characters",
      },
    },
  },
];

const DONATION_FIELDS: FieldConfig[] = [
  {
    name: "bank_info",
    label: "Bank Account Info",
    type: "textarea",
    rows: 4,
    placeholder: "Enter donation / bank info",
    rules: {
      minLength: {
        value: 5,
        message: "Bank info must be at least 5 characters",
      },
      maxLength: {
        value: 3000,
        message: "Bank info must be at most 3000 characters",
      },
    },
  },
];

const inputCls =
  "w-full px-6 py-4 rounded-2xl border-4 border-slate-50 focus:border-primary-soft focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all";

const getSectionsByPage = (page: PageKey): SectionConfig[] => {
  if (page === "about") {
    return [
      { title: "Hero Section", fields: HERO_FIELDS },
      { title: "Mission Section", fields: ABOUT_MISSION_FIELDS },
    ];
  }

  if (page === "contact") {
    return [
      { title: "Hero Section", fields: HERO_FIELDS },
      { title: "Main Content", fields: [MAIN_TEXT_FIELD] },
      { title: "Contact Information", fields: CONTACT_FIELDS },
    ];
  }

  if (page === "donate") {
    return [
      { title: "Hero Section", fields: HERO_FIELDS },
      { title: "Main Content", fields: [MAIN_TEXT_FIELD] },
      { title: "Donation Details", fields: DONATION_FIELDS },
    ];
  }

  return [
    { title: "Hero Section", fields: HERO_FIELDS },
    { title: "Main Content", fields: [MAIN_TEXT_FIELD] },
  ];
};

interface AdminContentFormProps {
  activePage: PageKey;
  content?: PageContentResponse;
}

const AdminContentForm: FC<AdminContentFormProps> = ({
  activePage,
  content,
}) => {
  const queryClient = useQueryClient();
  const sections = useMemo(() => getSectionsByPage(activePage), [activePage]);
  const isAboutPage = activePage === "about";
  
  

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    setError,
    setValue,
    formState: { errors, isDirty },
  } = useForm<AdminContentFormValues>({
    defaultValues: getDefaultFormValues(content),
    mode: "onBlur",
  });

  useEffect(() => {
    reset(getDefaultFormValues(content));
  }, [content, reset]);


  const updateMutation = useMutation({
    mutationFn: async (values: AdminContentFormValues) => {
      const payload = mapFormToUpdatePayload(activePage, values);
      return adminAPI.updatePageContent(activePage, payload);
    },

    onSuccess: async (updated) => {

      const data = updated as PageContentResponse;
      // ✅ Update cache instantly
      queryClient.setQueryData(["content", activePage], updated);



      // ✅ Revalidate
      await queryClient.invalidateQueries({
        queryKey: ["content", activePage],
      });

      // ✅ Reset form with fresh data
      reset(getDefaultFormValues(data));
      toast.success(data.message);
    
    
    },

    onError: (error: any) => {
      let message = "Failed to update page content";

      if (error?.response) {
        message =
          error.response.data?.message ||
          error.response.data?.error ||
          message;

          toast.error(message);
      } else if (error?.request) {
        message = "Network error. Please check connection.";
        toast.error(message);
      }

      setError("root", {
        type: "server",
        message,
      });
    },
  });

  const onSubmit = (values: AdminContentFormValues) => {

    updateMutation.mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
     

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {sections.map((section) => (
            <Card
              key={section.title}
              className="space-y-6 border-4 border-white p-8 disney-shadow"
            >
              <div className="mb-4 flex items-center gap-2">
                <Type className="text-primary" />
                <Heading level={4}>{section.title}</Heading>
              </div>

              <div
                className={
                  section.title === "Contact Information"
                    ? "grid grid-cols-1 gap-4 md:grid-cols-2"
                    : "space-y-4"
                }
              >
                {section.fields.map((field) => {
                  const errorMessage = getNestedError(errors, field.name);

                  return (
                    <Field
                      key={String(field.name)}
                      label={field.label}
                      colSpan={field.colSpan}
                    >
                      {field.type === "textarea" ? (
                        <TextAreaField
                          {...register(field.name, field.rules)}
                          rows={field.rows ?? 4}
                          placeholder={field.placeholder}
                          className={`${inputCls} resize-none`}
                          error={errorMessage}
                        />
                      ) : (
                        <InputField
                          {...register(field.name, field.rules)}
                          type={field.type}
                          placeholder={field.placeholder}
                          className={inputCls}
                          error={errorMessage}
                        />
                      )}
                    </Field>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-8">
          {/* Hero Image */}
          <Card className="space-y-6 border-4 border-white p-8 disney-shadow">
            <div className="mb-4 flex items-center gap-2">
              <ImageIcon className="text-primary" />
              <Heading level={4}>Hero Media</Heading>
            </div>

            <Controller
              name="hero_image_url"
              control={control}
              render={({ field }) => (
                <ImageUploader
                  label="Hero Image"
                  value={field.value || ""}
                  onChange={(value, publicId) => {
                    field.onChange(value);
                    setValue("hero_image_publicId", publicId ?? "", {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                  onRemove={() => {
                    field.onChange("");
                    setValue("hero_image_publicId", "", {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                    setValue("hero_image_alt", "", {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                  aspectRatio="video"
                  width={320}
                  height={180}
                />
              )}
            />

            <InputField
              {...register("hero_image_alt")}
              type="text"
              placeholder="Enter hero image alt text"
              className={inputCls}
              error={errors.hero_image_alt?.message}
            />

            <InputField
              {...register("hero_image_publicId")}
              type="text"
              placeholder="Hero image public ID (optional)"
              className={inputCls}
              error={errors.hero_image_publicId?.message}
            />
          </Card>

          {/* Mission Image only for about page */}
          {isAboutPage ? (
            <Card className="space-y-6 border-4 border-white p-8 disney-shadow">
              <div className="mb-4 flex items-center gap-2">
                <ImageIcon className="text-primary" />
                <Heading level={4}>Mission Media</Heading>
              </div>

              <Controller
                name="missionImage"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    label="Mission Image"
                    value={field.value?.url || ""}
                    onChange={(value, publicId) => {
                      field.onChange({
                        url: value || "",
                        publicId: publicId || "",
                        alt: field.value?.alt || "",
                      });
                    }}
                    onRemove={() => {
                      field.onChange({
                        url: "",
                        publicId: "",
                        alt: "",
                      });
                    }}
                    aspectRatio="video"
                    width={320}
                    height={180}
                  />
                )}
              />

              <InputField
                value={watch("missionImage")?.alt || ""}
                onChange={(e) =>
                  setValue("missionImage", {
                    ...(watch("missionImage") ?? {
                      url: "",
                      publicId: "",
                      alt: "",
                    }),
                    alt: e.target.value,
                  })
                }
                type="text"
                placeholder="Enter mission image alt text"
                className={inputCls}
              />

              <InputField
                value={watch("missionImage")?.publicId || ""}
                onChange={(e) =>
                  setValue("missionImage", {
                    ...(watch("missionImage") ?? {
                      url: "",
                      publicId: "",
                      alt: "",
                    }),
                    publicId: e.target.value,
                  })
                }
                type="text"
                placeholder="Mission image public ID"
                className={inputCls}
              />
            </Card>
          ) : null}

          <div className="sticky top-8">
            <Button
              type="submit"
              className="flex w-full items-center justify-center gap-2 py-6 text-xl"
              isLoading={updateMutation.isPending}
              disabled={updateMutation.isPending || !isDirty}
            >
              <Save size={24} />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdminContentForm;

function Field({
  label,
  colSpan,
  children,
}: {
  label: string;
  colSpan?: "1" | "2";
  children: React.ReactNode;
}) {
  return (
    <div className={`space-y-2 ${colSpan === "2" ? "md:col-span-2" : ""}`}>
      <label className="ml-2 font-display font-bold text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}

function getNestedError(
  errors: Record<string, any>,
  path: string,
): string | undefined {
  const normalizedPath = path.replace(/\[(\d+)\]/g, ".$1");
  const value = normalizedPath.split(".").reduce((acc, key) => {
    if (!acc) return undefined;
    return acc[key];
  }, errors);

  return value?.message as string | undefined;
}