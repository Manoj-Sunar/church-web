import { InputField } from '@/app/Components/TextField/InputField';
import type { Member as ChurchMember } from '@/app/Types/DataTypes';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { ImageUploader } from '../ImageUploader';
import { FormActions } from '../AdminFormAction';
import { formatToDateInput } from '@/app/utils/utilityFunction';






interface MemberFormProps {
    initialData?: ChurchMember;
    onSubmit: (data: Partial<ChurchMember>) => void;
    onCancel: () => void;
    isSubmitting?: boolean;
}

const MemberForm = ({ initialData,
    onSubmit,
    onCancel,
    isSubmitting = false }: MemberFormProps) => {

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<ChurchMember>({
        defaultValues: {
            name: initialData?.name,
            join_date: formatToDateInput(initialData?.join_date),
            phone: initialData?.phone,
            image: initialData?.image,
        }
    })

    const imageValue = watch("image")?.url;


    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name,
                image: initialData.image,
            });
        } else {
            reset();
        }
    }, [initialData, reset]);


    const onFormSubmit = (data: ChurchMember) => {
        onSubmit(data);
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
                <InputField
                    label="Full Name"
                    {...register("name", {
                        required: "Name is required",
                        minLength: { value: 3, message: "Name must be at least 5 characters" }
                    })}
                    error={errors.name?.message}
                    required
                    placeholder="Enter member name"
                />
                <InputField
                    label="join date"
                    type='date'
                    {...register("join_date", {
                        required: "join date is required",

                    })}
                    error={errors.join_date?.message}
                    required

                />

                <InputField
                    label="phone"
                    type='number'
                    {...register("phone", {
                        required: "phone number is required",

                    })}
                    error={errors.phone?.message}
                    required

                />

                <ImageUploader
                    label="member Image"
                    value={imageValue}
                    onChange={
                        (url, publicId) => {
                            setValue("image", {
                                url,
                                publicId: publicId || "",
                                alt: "member image",
                            }
                            )
                        }}
                    aspectRatio="video"
                    width={160}
                    height={90}
                />

            </div>




            <FormActions
                onCancel={onCancel}
                isSubmitting={isSubmitting}
                submitLabel={initialData ? "Update Member" : "Create Member"}
            />
        </form>
    )
}

export default MemberForm
