"use client";

import { InputField } from "@/app/Components/TextField/InputField";
import { TextAreaField } from "@/app/Components/TextField/TextAreaField";
import { FormActions } from "../AdminFormAction";
import type { Sermon as ChurchSermon } from "@/app/Types/DataTypes";
import { useForm } from "react-hook-form";
import { formatToDateInput} from "@/app/utils/utilityFunction";

export type SermonFormValues = {
    title: string;
    slug: string;
    speaker: string;
    date: string;
    videoUrl: string;
    description: string;
};


interface SermonFormProps {
    initialData?: ChurchSermon | null;
    onSubmit: (data: SermonFormValues) => void;
    onCancel: () => void;
    isSubmitting?: boolean;
}

const SermonForm = ({
    initialData,
    onSubmit,
    onCancel,
    isSubmitting = false,
}: SermonFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SermonFormValues>({
        defaultValues: {
            title: initialData?.title ?? "",
            slug: initialData?.slug ?? "",
            speaker: initialData?.speaker ?? "",
            date: formatToDateInput(initialData?.date) ?? "",
            videoUrl: initialData?.videoUrl ?? "",
            description: initialData?.description ?? "",
        },
    });




    const onFormSubmit = (data: SermonFormValues) => {
        onSubmit(data);

    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    label="Title"
                    {...register("title", {
                        required: "Title is required",
                        minLength: { value: 5, message: "Title must be at least 5 characters" },
                    })}
                    error={errors.title?.message}
                    required
                    placeholder="Enter sermon title"
                />

                <InputField
                    label="Slug"
                    {...register("slug", {
                        required: "Slug is required",
                        minLength: { value: 5, message: "Slug must be at least 5 characters" },
                    })}
                    error={errors.slug?.message}
                    required
                    placeholder="Enter sermon slug"
                />

                <InputField
                    label="Speaker"
                    {...register("speaker", {
                        required: "Speaker is required",
                        minLength: { value: 3, message: "Speaker must be at least 3 characters" },
                    })}
                    error={errors.speaker?.message}
                    required
                    placeholder="Enter sermon speaker"
                />

                <InputField
                    type="date"
                    label="Date"
                    {...register("date", {
                        required: "Date is required",
                    })}
                    error={errors.date?.message}
                    required
                />




            </div>

            <InputField
                type="link"
                label="Video"
                {...register("videoUrl", {
                    required: "video Url is required",
                })}
                error={errors.videoUrl?.message}
                required
                placeholder="Sermon video link"
            />

            <TextAreaField
                label="Description"
                {...register("description", {
                    required: "Description is required",
                    minLength: { value: 20, message: "Description must be at least 20 characters" },
                })}
                required
                error={errors.description?.message}
                placeholder="description"
            />

            <FormActions
                onCancel={onCancel}
                isSubmitting={isSubmitting}
                submitLabel={initialData ? "Update Sermon" : "Create Sermon"}
            />
        </form>
    );
};

export default SermonForm;