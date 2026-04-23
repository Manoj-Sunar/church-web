"use client";

import React, { memo, useCallback, useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { Container } from "@/app/Components/UI/Container";
import { Heading } from "@/app/Components/UI/Heading";
import { Button } from "@/app/Components/UI/Button/Button";
import { Card } from "@/app/Components/UI/Card";
import CommonHeroSection from "../../Common/CommonHeroSection";
import { InputField } from "../../TextField/InputField";
import { TextAreaField } from "../../TextField/TextAreaField";
import { SuccessMessage } from "../../Common/SuccessMSG";
import { PageContentResponse } from "@/app/Types/PageContent.types";
import { publicAPI } from "@/app/API/public.api";
import toast from "react-hot-toast";

type Subject =
  | "General Inquiry"
  | "Prayer Request"
  | "Volunteer Interest"
  | "Other";

type FormValues = {
  name: string;
  email: string;
  subject: Subject;
  messages: string; // ✅ FIXED
};

const DEFAULT_VALUES: FormValues = {
  name: "",
  email: "",
  subject: "General Inquiry",
  messages: "",
};

const SUBJECTS: readonly Subject[] = [
  "General Inquiry",
  "Prayer Request",
  "Volunteer Interest",
  "Other",
] as const;




interface IContactProps {
  content: PageContentResponse;
}

const ContactInfoItem = memo(function ContactInfoItem({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-2xl bg-primary-soft p-4">{icon}</div>
      <div>
        <h4 className="font-display font-bold text-slate-800">{title}</h4>
        <p className="text-slate-600">{value}</p>
      </div>
    </div>
  );
});



const ContactForm = memo(function ContactForm({
  isSubmitting,
  onSubmit,
}: {
  isSubmitting: boolean;
  onSubmit: (values: FormValues, resetForm: () => void) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const submitHandler = (values: FormValues) => {
    onSubmit(values, () => reset(DEFAULT_VALUES));
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <InputField
        label="Full Name"
        {...register("name", {
          required: "Name is required",
          minLength: { value: 3, message: "Min 3 characters" },
        })}
        error={errors.name?.message}
        required
      />

      <InputField
        label="Email"
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Invalid email",
          },
        })}
        error={errors.email?.message}
        required
      />

      <select
        {...register("subject", { required: true })}
        className="w-full rounded-2xl border px-4 py-3"
      >
        {SUBJECTS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <TextAreaField
        label="Message"
        {...register("messages", {
          required: "Message required",
          minLength: { value: 20, message: "Min 20 characters" },
        })}
        error={errors.messages?.message}
        rows={6}
      />

      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Send Message
      </Button>
    </form>
  );
});

export default function ContactClient({ content }: IContactProps) {


  const [resetFormRef, setResetFormRef] = useState<null | (() => void)>(null);

  // ✅ MUTATION INLINE
  const { mutate, isPending } = useMutation({
    mutationFn: publicAPI.SendMessages,
  });



  const handleSubmit = useCallback(
    (values: FormValues, resetForm: () => void) => {
      if (isPending) return;

      setResetFormRef(() => resetForm);

      // ✅ FIX: transform data here
      const payload = {
        ...values,
        messages: values.messages, // 🔥 mapping fix
      };

      mutate(payload as any, {
        onSuccess: (res: any) => {
          const msg =
            res?.data?.message || "Message sent successfully";
          toast.success(msg);


          resetForm();
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message ||
            "Failed to send message";

          toast.error(msg);
        },
      });
    },
    [mutate, isPending]
  );





  return (
    <div className="space-y-12 py-12">
      <CommonHeroSection
        heading={content.data.hero?.title || ""}
        paragraph={content.data.hero?.subtitle || ""}
        backgroundImage={content.data.hero?.image?.url}
      />

      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div className="space-y-12">
            <Heading level={2}>Get in Touch</Heading>

            <ContactInfoItem
              icon={<MapPin />}
              title="Visit Us"
              value={content.data.contact?.address || ""}
            />
            <ContactInfoItem
              icon={<Phone />}
              title="Call Us"
              value={content.data.contact?.phone || ""}
            />
            <ContactInfoItem
              icon={<Mail />}
              title="Email Us"
              value={content.data.contact?.email || ""}
            />
          </div>

          <Card className="p-8">


            <ContactForm
              isSubmitting={isPending}
              onSubmit={handleSubmit}
            />


          </Card>
        </div>
      </Container>
    </div>
  );
}