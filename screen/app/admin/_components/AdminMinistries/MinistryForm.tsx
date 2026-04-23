"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Ministry } from "@/app/Types/DataTypes";

import { InputField } from "@/app/Components/TextField/InputField";
import { TextAreaField } from "@/app/Components/TextField/TextAreaField";
import { ImageUploader } from "../ImageUploader";
import { FormActions } from "../AdminFormAction";

type MinistryFormValues = {
  name: string;
  slug: string;
  leader: string;
  image: string;
  publicId?: string; // ✅ ADD
  description: string;
  longDescription: string;
};

interface MinistryFormProps {
  initialData?: Ministry;
  onSubmit: (data: Partial<Ministry>) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function MinistryForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: MinistryFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<MinistryFormValues>({
    defaultValues: {
      name: initialData?.name ?? "",
      slug: initialData?.slug ?? "",
      leader: initialData?.leader ?? "",
      image: initialData?.image.url ?? "",
      description: initialData?.description ?? "",
      longDescription: initialData?.longDescription ?? "",
    },
  });

  const imageValue = watch("image");

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name ?? "",
        slug: initialData.slug ?? "",
        leader: initialData.leader ?? "",
        image: initialData.image.url ?? "",
        description: initialData.description ?? "",
        longDescription: initialData.longDescription ?? "",
      });
    } else {
      reset({
        name: "",
        slug: "",
        leader: "",
        image: "",
        description: "",
        longDescription: "",
      });
    }
  }, [initialData, reset]);

  const onFormSubmit = (data: MinistryFormValues) => {
    onSubmit({
      name: data.name.trim(),
      slug: data.slug.trim(),
      leader: data.leader.trim(),
      image: {
        url: data.image,
        publicId: "",
        alt: data.name,
      }, // ✅ FIXED
      description: data.description.trim(),
      longDescription: data.longDescription.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          })}
          error={errors.name?.message}
          required
          placeholder="Enter ministry name"
        />

        <InputField
          label="Slug"
          {...register("slug", {
            required: "Slug is required",
            pattern: {
              value: /^[a-z0-9-]+$/,
              message: "Only lowercase letters, numbers, and hyphens",
            },
          })}
          error={errors.slug?.message}
          required
          placeholder="ministry-url-slug"
          helperText="Lowercase letters, numbers, and hyphens only"
        />

        <InputField
          label="Leader"
          {...register("leader", {
            required: "Leader name is required",
            minLength: {
              value: 2,
              message: "Leader name must be at least 2 characters",
            },
          })}
          error={errors.leader?.message}
          required
          placeholder="Enter ministry leader name"
        />
      </div>

      <ImageUploader
        label="Ministry Image"
        value={imageValue}
        onChange={(url, publicId) => {
          setValue("image", url);
          setValue("publicId", publicId || "");
        }}
        aspectRatio="video"
        width={160}
        height={90}
      />

      <TextAreaField
        label="Short Description"
        {...register("description", {
          required: "Short description is required",
          minLength: {
            value: 10,
            message: "Short description must be at least 10 characters",
          },
        })}
        error={errors.description?.message}
        required
        placeholder="Enter short description"
        rows={3}
      />

      <TextAreaField
        label="Long Description"
        {...register("longDescription", {
          required: "Long description is required",
          minLength: {
            value: 20,
            message: "Long description must be at least 20 characters",
          },
        })}
        error={errors.longDescription?.message}
        required
        placeholder="Enter long description"
        rows={5}
      />

      <FormActions
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        submitLabel={initialData ? "Update Ministry" : "Create Ministry"}
      />
    </form>
  );
}