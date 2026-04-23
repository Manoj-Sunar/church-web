"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Event } from "@/app/Types/DataTypes";
import { InputField } from "@/app/Components/TextField/InputField";
import { ImageUploader } from "../ImageUploader";
import { TextAreaField } from "@/app/Components/TextField/TextAreaField";
import { FormActions } from "../AdminFormAction";

const todayISO = () => new Date().toISOString().split("T")[0];

interface EventFormProps {
  initialData?: Event;
  onSubmit: (data: Partial<Event>) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function EventForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: EventFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<Event>({
    defaultValues: {
      title: "",
      slug: "",
      date: todayISO(),
      time: "",
      location: "",
      category: "",
      image: {
        url: "",
        publicId: "",
        alt: "",
      },
      description: "",
    },
  });

  const imageValue = watch("image")?.url;

  // ✅ Reset form properly
  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        date: initialData.date?.slice(0, 10) ?? todayISO(),
      });
    } else {
      reset({
        title: "",
        slug: "",
        date: todayISO(),
        time: "",
        location: "",
        category: "",
        image: {
          url: "",
          publicId: "",
          alt: "",
        },
        description: "",
      });
    }
  }, [initialData, reset]);

  // ✅ Auto slug generator
  const titleValue = watch("title");

  useEffect(() => {
    if (titleValue) {
      const slug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

      setValue("slug", slug);
    }
  }, [titleValue, setValue]);

  const onFormSubmit = (data: Event) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Title"
          {...register("title", { required: "Title is required" })}
          error={errors.title?.message}
          required
        />

        <InputField
          label="Slug"
          {...register("slug")}
          disabled
        />

        <InputField
          label="Date"
          type="date"
          {...register("date", { required: "Date is required" })}
          error={errors.date?.message}
          required
        />

        <InputField
          label="Time"
          {...register("time", { required: "Time is required" })}
          error={errors.time?.message}
          required
        />

        <InputField
          label="Location"
          {...register("location", { required: "Location is required" })}
          error={errors.location?.message}
          required
        />

        <InputField
          label="Category"
          {...register("category", { required: "Category is required" })}
          error={errors.category?.message}
          required
        />
      </div>

      {/* ✅ FIXED IMAGE */}
      <ImageUploader
        label="Event Image"
        value={imageValue}
        onChange={(url, publicId) => {
          setValue("image", {
            url,
            publicId: publicId || "",
            alt: "event image",
          });
        }}
        aspectRatio="video"
        width={160}
        height={90}
      />

      <TextAreaField
        label="Description"
        {...register("description", {
          required: "Description is required",
          minLength: { value: 10, message: "Minimum 10 characters" },
        })}
        error={errors.description?.message}
        required
      />

      <FormActions
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        submitLabel={initialData ? "Update Event" : "Create Event"}
      />
    </form>
  );
}