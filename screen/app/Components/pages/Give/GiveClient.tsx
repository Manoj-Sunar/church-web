"use client";

import React, { memo, useCallback, useMemo, useState } from "react";
import {
  useForm,
  type FieldErrors,
  type UseFormRegister,
  type UseFormWatch,
} from "react-hook-form";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Heart,
  IndianRupee,
  Landmark,
  Gift,
  ArrowRight,
  Globe,
} from "lucide-react";

import { Container } from "@/app/Components/UI/Container";
import { Heading } from "@/app/Components/UI/Heading";
import { Button } from "@/app/Components/UI/Button/Button";
import { Card } from "@/app/Components/UI/Card";
import { Badge } from "@/app/Components/UI/Badge";
import { GiveReasonAndMissionCard } from "../../Common/GiveReasonAndMissionCard";
import { Paragraph, Span } from "../../Typography/TypoGraphy";
import { InputField } from "../../TextField/InputField";
import Image from "next/image";
import { PageContentResponse } from "@/app/Types/PageContent.types";
import CommonHeroSection from "../../Common/CommonHeroSection";

type Step = 1 | 2 | 3;

type DonateFormValues = {
  amount: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
};

interface IDonateProps {
  content: PageContentResponse;
}

const QUICK_AMOUNTS = ["1000", "2500", "5000", "10000", "25000", "50000"] as const;

const WHY_GIVE = [
  {
    icon: Landmark,
    title: "Ministry Operations",
    desc: "Supporting our daily activities and staff.",
  },
  {
    icon: Heart,
    title: "Community Care",
    desc: "Helping those in need within our local area.",
  },
  {
    icon: Globe,
    title: "Global Missions",
    desc: "Spreading the Gospel across the world.",
  },
  {
    icon: Gift,
    title: "Special Projects",
    desc: "Funding new initiatives and facility improvements.",
  },
] as const;

// Format money
function formatMoney(amount: string): string {
  const n = Number(amount);
  if (!Number.isFinite(n) || n <= 0) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NPR",
  }).format(n);
}

// Validate amount
function isValidAmount(amount: string): boolean {
  const n = Number(amount);
  return Number.isFinite(n) && n > 0;
}

// Parse bank info from string
function parseBankInfo(text: string) {
  if (!text) return { bankName: "", accountNumber: "", accountHolder: "" };
  return {
    bankName: text.match(/Bank Name\s*:\s*(.*?)\s*Account Number/)?.[1]?.trim() || "",
    accountNumber: text.match(/Account Number\s*:\s*(.*?)\s*Account Holder Name/)?.[1]?.trim() || "",
    accountHolder: text.match(/Account Holder Name\s*:\s*(.*)/)?.[1]?.trim() || "",
  };
}

// Motion wrapper for step animation
const MotionStep = memo(function MotionStep({
  children,
  stepKey,
}: {
  children: React.ReactNode;
  stepKey: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      key={stepKey}
      initial={reduceMotion ? false : { opacity: 0, x: 16 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -16 }}
      transition={{ duration: 0.22 }}
    >
      {children}
    </motion.div>
  );
});

// Step 1: Select amount
const AmountStep = memo(function AmountStep({
  amount,
  setAmount,
  onNext,
}: any) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <Heading level={3}>Choose Amount</Heading>
        <Paragraph className="text-slate-500">Select an amount to donate</Paragraph>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {QUICK_AMOUNTS.map((amt) => (
          <button
            key={amt}
            onClick={() => setAmount(amt)}
            className={`py-3 sm:py-4 rounded-2xl border-4 text-sm sm:text-lg font-bold flex items-center justify-cente r ${amount === amt
                ? "border-primary bg-primary-soft text-primary"
                : "border-slate-50"
              }`}
          >
          <IndianRupee/> <Span>{amt}</Span>
          </button>
        ))}
      </div>

      <div className="relative">
        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Custom Amount"
          className="w-full pl-12 py-5 border-4 rounded-2xl focus:border-primary-soft focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <Button disabled={!isValidAmount(amount)} onClick={onNext} className="w-full py-6">
        Next Step <ArrowRight className="ml-2" />
      </Button>
    </div>
  );
});

// Step 2: User details
const UserDetailsStep = memo(function UserDetailsStep({
  amount,
  formattedAmount,
  onBack,
  onNext,
  register,
  errors,
  watch,
}: {
  amount: string;
  formattedAmount: string;
  onBack: () => void;
  onNext: () => void;
  register: UseFormRegister<DonateFormValues>;
  errors: FieldErrors<DonateFormValues>;
  watch: UseFormWatch<DonateFormValues>;
}) {
  const values = watch();
  const isValid =
    values.fullName?.length >= 3 &&
    /\S+@\S+\.\S+/.test(values.email || "") &&
    values.phone?.length >= 7 &&
    values.address?.length >= 5;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Heading level={3}>Your Details</Heading>
        <Paragraph className="text-slate-500">
          Amount: <Span className="text-primary font-bold">{formattedAmount || `$${amount}`}</Span>
        </Paragraph>
      </div>

      <InputField
        label="Full Name"
        {...register("fullName", { required: "Name required" })}
        error={errors.fullName?.message}
      />
      <InputField
        label="Email"
        {...register("email", {
          required: "Email required",
          pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
        })}
        error={errors.email?.message}
      />
      <InputField
        label="Phone"
        {...register("phone", { required: "Phone required" })}
        error={errors.phone?.message}
      />
      <InputField
        label="Address"
        {...register("address", { required: "Address required" })}
        error={errors.address?.message}
      />

      <div className="flex gap-4">
        <Button variant="outline" className="flex-1" onClick={onBack}>
          Back
        </Button>
        <Button className="flex-[2] py-6 text-xl" disabled={!isValid} onClick={onNext}>
          Next <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
});

// Step 3: QR & Bank info
const QRStep = memo(function QRStep({ amount, formattedAmount, bankInfo }: any) {
  return (
    <div className="text-center space-y-2 ">
      <Heading level={3}>Scan & Give</Heading>
      <Paragraph className="text-slate-500">
        Amount: <Span className="text-primary font-bold">{formattedAmount || `$${amount}`}</Span>
      </Paragraph>

      <div className="p-2 rounded-2xl  bg-white shadow-sm inline-block">
        <Image
          src="/qr.jpeg"
          alt="QR Code"
          width={500}
          height={500}
          className="mx-auto w-[100%] object-cover"
          priority
        />
      </div>



      <Paragraph className="text-sm text-slate-500">
        Scan using your mobile banking app to complete donation
      </Paragraph>
    </div>
  );
});

export default function DonateClient({ content }: IDonateProps) {
  const [step, setStep] = useState<Step>(1);

  const { register, watch, setValue, formState: { errors } } = useForm<DonateFormValues>({
    defaultValues: { amount: "", fullName: "", email: "", phone: "", address: "" },
  });

  const amount = watch("amount");
  const formattedAmount = useMemo(() => formatMoney(amount), [amount]);
  const bankInfo = useMemo(() => parseBankInfo(content.data.donate?.bankInfo || ""), [content.data.donate?.bankInfo]);

  const setAmount = useCallback((value: string) => setValue("amount", value), [setValue]);

  return (
    <div className="py-12 space-y-12">

      <CommonHeroSection
        heading={content.data.hero?.title || ""}
        paragraph={content.data.hero?.subtitle || ""}
        backgroundImage={content?.data.hero?.image?.url}
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 ">
          {/* Left Content */}
          <div className="space-y-8 ">
            <Heading level={2}>Why Give?</Heading>
            <div className="grid sm:grid-cols-2 gap-6">
              {WHY_GIVE.map(item => (
                <GiveReasonAndMissionCard
                  key={item.title}
                  Icon={item.icon}
                  title={item.title}
                  desc={item.desc}
                />
              ))}
            </div>

            <div className="mt-6 w-full rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-white p-6 shadow-sm space-y-3 mx-auto">
              <Heading level={4} className="text-primary mb-2 flex items-center justify-center gap-2">
                <Landmark /> Bank Information
              </Heading>
              <div className="text-left space-y-1 text-sm sm:text-base w-full">
                <p><span className="text-slate-500 font-medium">Bank Name: </span> {bankInfo.bankName}</p>
                <p><span className="text-slate-500 font-medium">Account Number: </span> {bankInfo.accountNumber}</p>
                <p><span className="text-slate-500 font-medium">Account Holder: </span> {bankInfo.accountHolder}</p>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <Card className="p-6 sm:p-8 border-4 w-full lg:w-[90%] mx-auto lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              {step === 1 && <MotionStep stepKey="1"><AmountStep amount={amount} setAmount={setAmount} onNext={() => setStep(2)} /></MotionStep>}
              {step === 2 && <MotionStep stepKey="2"><UserDetailsStep amount={amount} formattedAmount={formattedAmount} onBack={() => setStep(1)} onNext={() => setStep(3)} register={register} errors={errors} watch={watch} /></MotionStep>}
              {step === 3 && <MotionStep stepKey="3"><QRStep amount={amount} formattedAmount={formattedAmount} bankInfo={bankInfo} /></MotionStep>}
            </AnimatePresence>
          </Card>
        </div>
      </Container>
    </div>
  );
}