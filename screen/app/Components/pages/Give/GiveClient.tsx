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
  Users,
  BookOpen,
  Sparkles,
  Quote,
  Shield,
  CheckCircle2,
  Star,
  HandHeart,
  Church,
  Baby,
  Home,
  GraduationCap,
  Utensils,
  ChevronRight,
  Lock,
  Clock,
  TrendingUp,
  Mail,
  Bell,
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

/* ---------------------------------- STATIC CONTENT ---------------------------------- */

const WHY_GIVE = [
  {
    icon: Landmark,
    title: "Ministry Operations",
    desc: "Supporting our daily activities, staff, and facilities.",
  },
  {
    icon: Heart,
    title: "Community Care",
    desc: "Helping those in need within our local community.",
  },
  {
    icon: Globe,
    title: "Global Missions",
    desc: "Spreading the Gospel to unreached regions.",
  },
  {
    icon: Gift,
    title: "Special Projects",
    desc: "Funding new initiatives and ministry expansion.",
  },
] as const;

const givingStats = [
  { value: "5K+", label: "Lives Impacted", icon: Users },
  { value: "50+", label: "Villages Reached", icon: Globe },
  { value: "100%", label: "Kingdom Focused", icon: Heart },
  { value: "15+", label: "Years of Ministry", icon: Clock },
];

const givingImpact = [
  {
    icon: Utensils,
    title: "Feed the Hungry",
    description:
      "Your gift provides meals and basic necessities to families in need across Nepal.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: GraduationCap,
    title: "Educate Children",
    description:
      "Support education for underprivileged children, giving them hope and a future.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Church,
    title: "Build Churches",
    description:
      "Help construct and maintain places of worship in remote villages.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Baby,
    title: "Care for Orphans",
    description:
      "Provide shelter, care, and love to orphaned and vulnerable children.",
    color: "from-rose-500 to-rose-600",
  },
  {
    icon: BookOpen,
    title: "Train Leaders",
    description:
      "Equip pastors and ministry leaders with biblical training and resources.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Home,
    title: "Support Widows",
    description:
      "Extend compassion and practical support to widows in our community.",
    color: "from-cyan-500 to-cyan-600",
  },
];

const givingOptions = [
  {
    icon: Gift,
    title: "One-Time Gift",
    description: "Make a single donation of any amount to support the ministry.",
  },
  {
    icon: Heart,
    title: "Monthly Partnership",
    description: "Become a regular partner with recurring monthly gifts.",
  },
  {
    icon: Sparkles,
    title: "Special Project",
    description: "Designate your gift toward a specific ministry initiative.",
  },
  {
    icon: Users,
    title: "Sponsor a Child",
    description: "Provide ongoing support for a child's education and care.",
  },
];

const testimonies = [
  {
    quote:
      "Giving to this ministry has been one of the greatest joys of my life. Seeing how God multiplies even small gifts is truly amazing.",
    name: "Ramesh T.",
    role: "Monthly Partner",
  },
  {
    quote:
      "I've witnessed firsthand how donations transform communities. The transparency and stewardship here are exceptional.",
    name: "Sarah M.",
    role: "Regular Donor",
  },
  {
    quote:
      "My family sponsors a child through this ministry. The blessing we receive far exceeds what we give.",
    name: "David K.",
    role: "Child Sponsor",
  },
];

const stewardshipPoints = [
  "Every donation is handled with integrity and accountability",
  "Financial records are audited and available upon request",
  "You'll receive regular updates on how your gift is making a difference",
  "Your personal information is kept secure and confidential",
];

const scriptureBanner = {
  verse:
    "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
  reference: "2 Corinthians 9:7",
};

const faqs = [
  {
    question: "Is my donation secure?",
    answer:
      "Absolutely. We use secure banking channels and handle all donations with the highest standards of financial integrity and confidentiality.",
  },
  {
    question: "Can I designate my gift to a specific cause?",
    answer:
      "Yes! You can choose to support specific areas like children's ministry, village outreach, or general ministry operations. Just mention it in your communication.",
  },
  {
    question: "Will I receive a receipt for my donation?",
    answer:
      "Yes, every donor receives an acknowledgment of their gift. For tax purposes, please contact our office directly for official documentation.",
  },
  {
    question: "How can I set up a recurring donation?",
    answer:
      "Contact our ministry office to set up monthly or quarterly giving. We'll help you establish a convenient recurring donation plan.",
  },
];

/* ---------------------------------- UTILITIES ---------------------------------- */

function formatMoney(amount: string): string {
  const n = Number(amount);
  if (!Number.isFinite(n) || n <= 0) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(n);
}

function isValidAmount(amount: string): boolean {
  const n = Number(amount);
  return Number.isFinite(n) && n > 0;
}

function parseBankInfo(text: string) {
  if (!text) return { bankName: "", accountNumber: "", accountHolder: "" };
  return {
    bankName: text.match(/Bank Name\s*:\s*(.*?)\s*Account Number/)?.[1]?.trim() || "",
    accountNumber: text.match(/Account Number\s*:\s*(.*?)\s*Account Holder Name/)?.[1]?.trim() || "",
    accountHolder: text.match(/Account Holder Name\s*:\s*(.*)/)?.[1]?.trim() || "",
  };
}

/* ---------------------------------- MOTION WRAPPER ---------------------------------- */

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
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
});

/* ---------------------------------- STEP 1: AMOUNT ---------------------------------- */

const AmountStep = memo(function AmountStep({
  amount,
  setAmount,
  onNext,
}: {
  amount: string;
  setAmount: (v: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-7">
      <div className="text-center">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
          <Gift className="w-7 h-7 text-primary" />
        </div>
        <Heading level={3} className="mb-1">
          Choose Your Gift
        </Heading>
        <Paragraph className="text-slate-500 text-sm">
          Every amount makes an eternal difference
        </Paragraph>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Quick Amounts
        </label>
        <div className="grid grid-cols-3 gap-3">
          {QUICK_AMOUNTS.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setAmount(amt)}
              className={`py-3 rounded-xl border-2 text-sm sm:text-base font-bold flex items-center justify-center gap-0.5 transition-all duration-200 ${
                amount === amt
                  ? "border-primary bg-primary/10 text-primary shadow-md"
                  : "border-slate-200 text-slate-600 hover:border-primary/40 hover:bg-slate-50"
              }`}
            >
              <IndianRupee size={14} />
              <span>{Number(amt).toLocaleString()}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Custom Amount
        </label>
        <div className="relative">
          <IndianRupee
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter any amount"
            className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all text-lg font-semibold"
          />
        </div>
        {formattedAmountHelper(amount) && (
          <p className="text-xs text-slate-400 mt-2 text-center">
            You're giving{" "}
            <span className="font-bold text-primary">
              {formattedAmountHelper(amount)}
            </span>
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
        <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
        <span className="text-xs text-emerald-700 font-medium">
          Your gift is secure and handled with integrity
        </span>
      </div>

      <Button
        disabled={!isValidAmount(amount)}
        onClick={onNext}
        className="w-full py-4 text-base font-semibold rounded-xl"
      >
        Continue <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );
});

function formattedAmountHelper(amount: string) {
  const n = Number(amount);
  if (!Number.isFinite(n) || n <= 0) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(n);
}

/* ---------------------------------- STEP 2: DETAILS ---------------------------------- */

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
        <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
          <Users className="w-7 h-7 text-primary" />
        </div>
        <Heading level={3} className="mb-1">
          Your Details
        </Heading>
        <Paragraph className="text-slate-500 text-sm">
          Giving{" "}
          <Span className="text-primary font-bold">
            {formattedAmount || `NPR ${amount}`}
          </Span>
        </Paragraph>
      </div>

      <div className="space-y-4">
        <InputField
          label="Full Name"
          {...register("fullName", { required: "Name required" })}
          error={errors.fullName?.message}
        />
        <InputField
          label="Email"
          type="email"
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
      </div>

      <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
        <Lock className="w-4 h-4 text-blue-600 shrink-0" />
        <span className="text-xs text-blue-700 font-medium">
          Your information is safe and never shared with third parties
        </span>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 rounded-xl py-3" onClick={onBack}>
          Back
        </Button>
        <Button
          className="flex-[2] rounded-xl py-3 font-semibold"
          disabled={!isValid}
          onClick={onNext}
        >
          Continue <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
});

/* ---------------------------------- STEP 3: QR ---------------------------------- */

const QRStep = memo(function QRStep({
  amount,
  formattedAmount,
  bankInfo,
  onBack,
}: {
  amount: string;
  formattedAmount: string;
  bankInfo: ReturnType<typeof parseBankInfo>;
  onBack: () => void;
}) {
  return (
    <div className="text-center space-y-5">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 flex items-center justify-center mb-3">
        <CheckCircle2 className="w-7 h-7 text-emerald-600" />
      </div>
      <Heading level={3}>Complete Your Gift</Heading>
      <Paragraph className="text-slate-500 text-sm">
        Scan to give{" "}
        <Span className="text-primary font-bold">
          {formattedAmount || `NPR ${amount}`}
        </Span>
      </Paragraph>

      <div className="p-4 rounded-2xl bg-white shadow-lg inline-block border-2 border-slate-100">
        <Image
          src="/qr.jpeg"
          alt="QR Code for donation"
          width={400}
          height={400}
          className="mx-auto w-full max-w-[260px] object-cover rounded-xl"
          priority
        />
      </div>

      <Paragraph className="text-xs text-slate-500 max-w-xs mx-auto">
        Open your mobile banking app, scan this QR code, and complete your
        donation in seconds.
      </Paragraph>

      <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-left">
        <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
        <span className="text-xs text-emerald-700 font-medium">
          Thank you for your generous gift. May God bless you abundantly!
        </span>
      </div>

      <Button
        variant="outline"
        className="w-full rounded-xl py-3"
        onClick={onBack}
      >
        Back to Details
      </Button>
    </div>
  );
});

/* ---------------------------------- MAIN ---------------------------------- */

export default function DonateClient({ content }: IDonateProps) {
  const [step, setStep] = useState<Step>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DonateFormValues>({
    defaultValues: { amount: "", fullName: "", email: "", phone: "", address: "" },
  });

  const amount = watch("amount");
  const formattedAmount = useMemo(() => formatMoney(amount), [amount]);
  const bankInfo = useMemo(
    () => parseBankInfo(content.data.donate?.bankInfo || ""),
    [content.data.donate?.bankInfo]
  );

  const setAmount = useCallback(
    (value: string) => setValue("amount", value),
    [setValue]
  );

  return (
    <div className="overflow-hidden bg-white">
      {/* HERO */}
      <CommonHeroSection
        heading={content.data.hero?.title || "Give & Support the Ministry"}
        paragraph={
          content.data.hero?.subtitle ||
          "Your generosity fuels the mission. Every gift helps us share the Gospel, serve communities, and expand God's Kingdom."
        }
        backgroundImage={content?.data.hero?.image?.url}
      />

      {/* STATS BAR */}
      <section className="relative -mt-10 z-10">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {givingStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100 text-center hover:shadow-2xl transition-shadow"
              >
                <stat.icon className="w-7 h-7 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold text-slate-800">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* SCRIPTURE BANNER */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <Quote className="w-12 h-12 mx-auto mb-6 text-primary/40" />
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif text-slate-700 italic leading-relaxed mb-6">
              "{scriptureBanner.verse}"
            </blockquote>
            <cite className="text-primary font-semibold text-lg not-italic">
              — {scriptureBanner.reference}
            </cite>
          </motion.div>
        </Container>
      </section>

      {/* MAIN GIVE SECTION */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* LEFT - WHY GIVE */}
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
                  Your Impact
                </span>
                <Heading level={2} className="mb-4">
                  Why Give?
                </Heading>
                <Paragraph className="text-slate-600 leading-relaxed">
                  Giving is an act of worship and a way to partner with what
                  God is doing. Every contribution, no matter the size, helps
                  us fulfill our mission of sharing Christ's love.
                </Paragraph>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-5">
                {WHY_GIVE.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <GiveReasonAndMissionCard
                      Icon={item.icon}
                      title={item.title}
                      desc={item.desc}
                    />
                  </motion.div>
                ))}
              </div>

              {/* BANK INFO */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-white p-6 md:p-8 shadow-md"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Landmark className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <Heading level={4} className="text-slate-800">
                      Direct Bank Transfer
                    </Heading>
                    <Paragraph className="text-xs text-slate-500">
                      For larger gifts or recurring donations
                    </Paragraph>
                  </div>
                </div>

                <div className="space-y-3">
                  {bankInfo.bankName && (
                    <div className="flex items-start justify-between p-3 bg-white rounded-xl border border-slate-100">
                      <span className="text-sm text-slate-500 font-medium">
                        Bank Name
                      </span>
                      <span className="text-sm font-bold text-slate-800 text-right">
                        {bankInfo.bankName}
                      </span>
                    </div>
                  )}
                  {bankInfo.accountNumber && (
                    <div className="flex items-start justify-between p-3 bg-white rounded-xl border border-slate-100">
                      <span className="text-sm text-slate-500 font-medium">
                        Account Number
                      </span>
                      <span className="text-sm font-bold text-slate-800 text-right">
                        {bankInfo.accountNumber}
                      </span>
                    </div>
                  )}
                  {bankInfo.accountHolder && (
                    <div className="flex items-start justify-between p-3 bg-white rounded-xl border border-slate-100">
                      <span className="text-sm text-slate-500 font-medium">
                        Account Holder
                      </span>
                      <span className="text-sm font-bold text-slate-800 text-right">
                        {bankInfo.accountHolder}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* RIGHT - DONATION FORM */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-24"
            >
              <Card className="p-6 sm:p-8 border-0 shadow-2xl rounded-3xl bg-white">
                {/* Progress indicator */}
                <div className="flex items-center justify-between mb-8">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center flex-1">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          step >= s
                            ? "bg-primary text-white shadow-md"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                      </div>
                      {s < 3 && (
                        <div
                          className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                            step > s ? "bg-primary" : "bg-slate-100"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <MotionStep stepKey="1">
                      <AmountStep
                        amount={amount}
                        setAmount={setAmount}
                        onNext={() => setStep(2)}
                      />
                    </MotionStep>
                  )}
                  {step === 2 && (
                    <MotionStep stepKey="2">
                      <UserDetailsStep
                        amount={amount}
                        formattedAmount={formattedAmount}
                        onBack={() => setStep(1)}
                        onNext={() => setStep(3)}
                        register={register}
                        errors={errors}
                        watch={watch}
                      />
                    </MotionStep>
                  )}
                  {step === 3 && (
                    <MotionStep stepKey="3">
                      <QRStep
                        amount={amount}
                        formattedAmount={formattedAmount}
                        bankInfo={bankInfo}
                        onBack={() => setStep(2)}
                      />
                    </MotionStep>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* GIVING IMPACT */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-14">
            <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
              Where Your Gift Goes
            </span>
            <Heading level={2} className="mb-4">
              Your Giving in Action
            </Heading>
            <Paragraph className="text-slate-500 max-w-2xl mx-auto">
              See how your generosity is transforming lives and communities
              for God's glory.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {givingImpact.map((impact, index) => (
              <motion.div
                key={impact.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
              >
                <Card className="p-7 h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl bg-white group">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${impact.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <impact.icon className="w-7 h-7 text-white" />
                  </div>
                  <Heading
                    level={4}
                    className="mb-3 group-hover:text-primary transition-colors"
                  >
                    {impact.title}
                  </Heading>
                  <Paragraph className="text-slate-500 text-sm leading-relaxed">
                    {impact.description}
                  </Paragraph>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* GIVING OPTIONS */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="text-center mb-14">
            <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
              Ways to Give
            </span>
            <Heading level={2} className="mb-4">
              Choose Your Giving Style
            </Heading>
            <Paragraph className="text-slate-500 max-w-2xl mx-auto">
              Whether it's a one-time gift or ongoing partnership, every
              contribution makes a difference.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {givingOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
              >
                <Card className="p-7 h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl bg-white text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 mx-auto">
                    <option.icon className="w-7 h-7 text-primary" />
                  </div>
                  <Heading level={4} className="mb-3 text-slate-800">
                    {option.title}
                  </Heading>
                  <Paragraph className="text-slate-500 text-sm leading-relaxed">
                    {option.description}
                  </Paragraph>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* STEWARDSHIP */}
      <section className="py-20 bg-slate-900 text-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 bg-primary/20 px-4 py-1.5 rounded-full">
                Our Commitment
              </span>
              <Heading level={2} className="mb-6 text-white">
                Faithful Stewardship
              </Heading>
              <Paragraph className="text-slate-400 mb-8 leading-relaxed">
                We take seriously the trust you place in us when you give.
                Every donation is handled with integrity, transparency, and
                a deep sense of accountability to God and to you.
              </Paragraph>

              <div className="space-y-4">
                {stewardshipPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-slate-300 leading-relaxed">
                      {point}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10 rounded-3xl text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <Heading level={3} className="text-white mb-4">
                  100% Trusted
                </Heading>
                <Paragraph className="text-slate-400 text-sm leading-relaxed mb-6">
                  Your giving is safe and secure. We are committed to
                  financial integrity and biblical stewardship.
                </Paragraph>
                <div className="flex justify-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* TESTIMONIES */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <Container>
          <div className="text-center mb-14">
            <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
              Testimonies
            </span>
            <Heading level={2} className="mb-4">
              The Joy of Giving
            </Heading>
            <Paragraph className="text-slate-500 max-w-2xl mx-auto">
              Hear from those who have experienced the blessing of generous
              giving.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonies.map((testimony, index) => (
              <motion.div
                key={testimony.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full border-0 shadow-lg relative overflow-hidden rounded-3xl bg-white">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <Paragraph className="text-slate-600 mb-6 italic leading-relaxed">
                    "{testimony.quote}"
                  </Paragraph>
                  <div className="pt-4 border-t border-slate-100">
                    <div className="font-semibold text-slate-800">
                      {testimony.name}
                    </div>
                    <div className="text-sm text-slate-400">
                      {testimony.role}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-14">
            <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
              Questions
            </span>
            <Heading level={2} className="mb-4">
              Frequently Asked Questions
            </Heading>
            <Paragraph className="text-slate-500 max-w-2xl mx-auto">
              Everything you need to know about giving to the ministry.
            </Paragraph>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-0 shadow-md rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-800 pr-4">
                      {faq.question}
                    </span>
                    <ChevronRight
                      className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                        openFaq === index ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-6 text-slate-500 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <HandHeart className="w-14 h-14 mx-auto mb-6 text-white/90" />
            <Heading level={2} className="mb-4 text-white">
              Give Generously, Bless Eternally
            </Heading>
            <Paragraph className="text-white/85 mb-8 text-lg leading-relaxed">
              Your generosity has the power to transform lives, strengthen
              communities, and advance God's Kingdom. Give today and be part
              of something eternal.
            </Paragraph>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-slate-100 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg">
                <Heart className="w-5 h-5 mr-2 fill-primary" />
                Give Now
              </Button>
              <Button
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-2xl"
              >
                <Bell className="w-5 h-5 mr-2" />
                Become a Partner
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}