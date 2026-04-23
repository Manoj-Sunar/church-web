"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Leader } from "@/app/Types/DataTypes";
import { InputField } from "@/app/Components/TextField/InputField";
import { TextAreaField } from "@/app/Components/TextField/TextAreaField";
import { ImageUploader } from "../ImageUploader";
import { FormActions } from "../AdminFormAction";

interface LeaderFormProps {
  initialData?: Leader;
  onSubmit: (data: Partial<Leader>) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

type LeaderFormValues = {
  name: string;
  role: string;
  bio: string;
  image: {
    url: string,
    alt: string,
    publicId: string,
  };
  order_index: number;
};

export function LeaderForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: LeaderFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<LeaderFormValues>({
    defaultValues: {
      name: initialData?.name || "",
      role: initialData?.role || "",
      bio: initialData?.bio || "",
      image: initialData?.image,
      order_index: initialData?.order_index || 0,
    },
  });

  const imageValue = watch("image")?.url;

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        role: initialData.role || "",
        bio: initialData.bio || "",
        image: initialData.image,
        order_index: initialData.order_index || 0,
      });
    } else {
      reset({
        name: "",
        role: "",
        bio: "",
        image: {
          url: "",
          alt: "",
          publicId: "",

        },
        order_index: 0,
      });
    }
  }, [initialData, reset]);

  const onFormSubmit = (data: LeaderFormValues) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Full Name"
          {...register("name", {
            required: "Full name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters"
            }
          })}
          error={errors.name?.message}
          required
          placeholder="Enter leader's name"
        />

        <InputField
          label="Role"
          {...register("role", {
            required: "Role is required"
          })}
          error={errors.role?.message}
          required
          placeholder="e.g., Senior Pastor"
        />
      </div>

      <TextAreaField
        label="Bio"
        {...register("bio", {
          required: "Bio is required",
          minLength: {
            value: 10,
            message: "Bio must be at least 10 characters"
          }
        })}
        error={errors.bio?.message}
        required
        placeholder="Enter leader's biography"
        rows={4}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImageUploader
          label="Leader Image"
          value={imageValue}
          onChange={
            (url, publicId) => {
              setValue("image", {
                url,
                publicId: publicId || "",
                alt: "leader image",
              }
              )
            }}
          aspectRatio="square"
          width={96}
          height={96}
        />

        <InputField
          label="Display Order"
          type="number"
          {...register("order_index", {
            required: "Display order is required",
            min: {
              value: 0,
              message: "Order must be at least 0"
            },
            max: {
              value: 999,
              message: "Order must be at most 999"
            },
            valueAsNumber: true
          })}
          error={errors.order_index?.message}
          min={0}
          max={999}
          helperText="Lower numbers appear first"
        />
      </div>

      <FormActions
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        submitLabel={initialData ? "Update Leader" : "Add Leader"}
      />
    </form>
  );
}