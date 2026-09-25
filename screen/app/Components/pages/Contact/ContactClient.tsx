"use client";

import React, { memo, useCallback, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  Heart,
  Users,
  Sparkles,
  Quote,
  ChevronRight,
  Facebook,
  Youtube,
  CheckCircle2,
  HelpCircle,
  HandHeart,
  BookOpen,
  Calendar,
  Bell,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { Container } from "@/app/Components/UI/Container";
import { Heading } from "@/app/Components/UI/Heading";
import { Button } from "@/app/Components/UI/Button/Button";
import { Card } from "@/app/Components/UI/Card";
import CommonHeroSection from "../../Common/CommonHeroSection";
import { InputField } from "../../TextField/InputField";
import { TextAreaField } from "../../TextField/TextAreaField";
import { Paragraph } from "../../Typography/TypoGraphy";
import { PageContentResponse } from "@/app/Types/PageContent.types";
import { publicAPI } from "@/app/API/public.api";
import toast from "react-hot-toast";

/* ---------- TikTok Icon (inline SVG — no external dependency) ---------- */
const TikTokIcon = memo(function TikTokIcon({
  className = "w-5 h-5",
}: {
  className?: string;
}) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
});

/* ---------------------------------- TYPES ---------------------------------- */

type Subject =
  | "General Inquiry"
  | "Prayer Request"
  | "Volunteer Interest"
  | "Other";

type FormValues = {
  name: string;
  email: string;
  subject: Subject;
  messages: string;
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
  // ✅ Allow null — page passes null if API fails
  content: PageContentResponse | null;
}

/* ---------------------------------- STATIC CONTENT ---------------------------------- */

const contactReasons = [
  {
    icon: Heart,
    title: "Prayer Requests",
    description:
      "Share your prayer needs with us. Our prayer team will intercede on your behalf.",
    color: "from-rose-500 to-rose-600",
  },
  {
    icon: HandHeart,
    title: "Volunteer Interest",
    description:
      "Discover how you can use your gifts to serve God and bless others in our ministries.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: MessageCircle,
    title: "General Questions",
    description:
      "Have questions about our church, beliefs, or events? We're here to help.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Calendar,
    title: "Speaking Engagements",
    description:
      "Invite Pastor Daniel to speak at your event, conference, or church gathering.",
    color: "from-purple-500 to-purple-600",
  },
];

const contactStats = [
  { value: "24h", label: "Response Time", icon: Clock },
  { value: "100%", label: "Messages Read", icon: Mail },
  { value: "7 Days", label: "Weekly Availability", icon: Calendar },
  { value: "Always", label: "Here to Help", icon: Heart },
];

const officeHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
  { day: "Sunday", hours: "Service at 10:00 AM" },
  { day: "Public Holidays", hours: "Closed" },
];

// ✅ Typed social links with `key` field
const socialLinks = [
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/daniel.tiruwa.5",
    color: "hover:bg-blue-600",
    Icon: Facebook,
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@daniel_tiruwa",
    color: "hover:bg-red-600",
    Icon: Youtube,
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@danieltr104",
    color: "hover:bg-pink-600",
    Icon: TikTokIcon,
  },
] as const;

const faqs = [
  {
    question: "How quickly will I receive a response?",
    answer:
      "We aim to respond to all messages within 24 hours. Prayer requests receive priority attention and are forwarded to our prayer team immediately.",
  },
  {
    question: "Can I visit the church in person?",
    answer:
      "Absolutely! We would love to welcome you. Our Sunday service begins at 10:00 AM. Feel free to visit during office hours or join us for any of our weekly gatherings.",
  },
  {
    question: "How can I request Pastor Daniel for a speaking engagement?",
    answer:
      "Please submit your request through this contact form with details about your event, date, and location. Our team will review and respond with availability.",
  },
  {
    question: "Is there someone I can talk to for counseling?",
    answer:
      "Yes, we offer pastoral counseling by appointment. Please indicate 'General Inquiry' in the subject and mention counseling in your message so we can connect you with the right person.",
  },
];

const whatToExpect = [
  {
    icon: Send,
    title: "You Send",
    description: "Fill out the contact form with your message or prayer request.",
  },
  {
    icon: Mail,
    title: "We Receive",
    description: "Our team reads every message and routes it appropriately.",
  },
  {
    icon: Heart,
    title: "We Pray & Respond",
    description:
      "Your request is prayed over, and we respond within 24 hours.",
  },
];

/* ---------------------------------- SUB-COMPONENTS ---------------------------------- */

const ContactInfoItem = memo(function ContactInfoItem({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <h4 className="font-bold text-slate-800 mb-1 text-sm uppercase tracking-wider">
          {title}
        </h4>
        <p className="text-slate-700 font-medium break-words">{value}</p>
        {description && (
          <p className="text-xs text-slate-400 mt-1">{description}</p>
        )}
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
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
          label="Email Address"
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
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Subject <span className="text-rose-500">*</span>
        </label>
        <select
          {...register("subject", { required: true })}
          className="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <TextAreaField
        label="Your Message"
        {...register("messages", {
          required: "Message required",
          minLength: { value: 20, message: "Min 20 characters" },
        })}
        error={errors.messages?.message}
        rows={6}
      />

      <Button
        type="submit"
        className="w-full rounded-xl py-3.5 font-semibold shadow-lg"
        isLoading={isSubmitting}
      >
        <Send className="w-4 h-4 mr-2" />
        Send Message
      </Button>

      <p className="text-xs text-slate-400 text-center">
        Your information is safe with us. We never share your details.
      </p>
    </form>
  );
});

/* ---------------------------------- MAIN ---------------------------------- */

export default function ContactClient({ content }: IContactProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const { mutate, isPending } = useMutation({
    mutationFn: publicAPI.SendMessages,
  });

  const handleSubmit = useCallback(
    (values: FormValues, resetForm: () => void) => {
      if (isPending) return;

      const payload = {
        ...values,
        messages: values.messages,
      };

      mutate(payload as any, {
        onSuccess: (res: any) => {
          const msg = res?.data?.message || "Message sent successfully";
          toast.success(msg);
          resetForm();
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || "Failed to send message";
          toast.error(msg);
        },
      });
    },
    [mutate, isPending]
  );

  // ✅ Safe content access — never crash on null
  const safeContent = content?.data ?? null;
  const hero = safeContent?.hero ?? null;
  const contact = safeContent?.contact ?? null;

  return (
    <div className="overflow-hidden bg-white">
      {/* HERO */}
      <CommonHeroSection
        heading={hero?.title || "Get in Touch"}
        paragraph={
          hero?.subtitle ||
          "We would love to hear from you. Reach out for prayer, questions, or to connect with our ministry."
        }
        backgroundImage={hero?.image?.url}
      />

      {/* STATS BAR */}
      <section className="relative -mt-10 z-10">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contactStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100 text-center hover:shadow-2xl transition-shadow"
              >
                <stat.icon className="w-7 h-7 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold text-slate-800">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SCRIPTURE BANNER */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <Quote className="w-12 h-12 mx-auto mb-6 text-primary/40" />
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif text-slate-700 italic leading-relaxed mb-6">
              "Call to me and I will answer you and tell you great and
              unsearchable things you do not know."
            </blockquote>
            <cite className="text-primary font-semibold text-lg not-italic">
              — Jeremiah 33:3
            </cite>
          </div>
        </Container>
      </section>

      {/* WHY CONTACT US */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-14">
            <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
              We're Here For You
            </span>
            <Heading level={2} className="mb-4">
              How Can We Help?
            </Heading>
            <Paragraph className="text-slate-500 max-w-2xl mx-auto">
              Whether you need prayer, have a question, or want to get
              involved, there's a place for you here.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactReasons.map((reason) => (
              <Card
                key={reason.title}
                className="p-7 h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl bg-white group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <reason.icon className="w-7 h-7 text-white" />
                </div>
                <Heading
                  level={4}
                  className="mb-3 group-hover:text-primary transition-colors"
                >
                  {reason.title}
                </Heading>
                <Paragraph className="text-slate-500 text-sm leading-relaxed">
                  {reason.description}
                </Paragraph>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* LEFT SIDE - INFO */}
            <div className="space-y-8">
              <div>
                <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
                  Contact Information
                </span>
                <Heading level={2} className="mb-4">
                  Reach Out To Us
                </Heading>
                <Paragraph className="text-slate-600 leading-relaxed mb-8">
                  We would be delighted to hear from you. Whether you have a
                  question, need prayer, or simply want to say hello, don't
                  hesitate to reach out. Our team is ready to assist you.
                </Paragraph>
              </div>

              <div className="space-y-4">
                <ContactInfoItem
                  icon={<MapPin size={22} />}
                  title="Visit Us"
                  value={contact?.address || "Kathmandu, Nepal"}
                  description="Come worship with us in person"
                />
                <ContactInfoItem
                  icon={<Phone size={22} />}
                  title="Call Us"
                  value={contact?.phone || "+977 9825612100"}
                  description="Mon-Fri, 9 AM - 6 PM"
                />
                <ContactInfoItem
                  icon={<Mail size={22} />}
                  title="Email Us"
                  value={contact?.email || "trdaniel2022@gmail.com"}
                  description="We respond within 24 hours"
                />
              </div>

              {/* Office Hours */}
              <Card className="p-6 border-0 shadow-lg rounded-3xl bg-white mt-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <Heading level={4} className="text-slate-800">
                    Office Hours
                  </Heading>
                </div>

                <div className="space-y-3">
                  {officeHours.map((item) => (
                    <div
                      key={item.day}
                      className="flex items-center justify-between text-sm border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-slate-600 font-medium">
                        {item.day}
                      </span>
                      <span className="text-slate-800 font-semibold">
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Social Media */}
              <Card className="p-6 border-0 shadow-lg rounded-3xl bg-white">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <Heading level={4} className="text-slate-800">
                    Follow Us
                  </Heading>
                </div>

                <Paragraph className="text-sm text-slate-500 mb-5">
                  Stay connected and be the first to know about our events and
                  updates.
                </Paragraph>

                {/* ✅ Fixed social icons — all use <a href> */}
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map(({ key, label, href, color, Icon }) => (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 transition-all duration-300 ${color} hover:text-white hover:scale-110`}
                      aria-label={`Follow us on ${label}`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </Card>
            </div>

            {/* RIGHT SIDE - FORM */}
            <div>
              <Card className="p-8 md:p-10 border-0 shadow-2xl rounded-3xl bg-white sticky top-24">
                <div className="mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Send className="w-6 h-6 text-primary" />
                  </div>
                  <Heading level={3} className="mb-2 text-slate-800">
                    Send Us a Message
                  </Heading>
                  <Paragraph className="text-slate-500 text-sm">
                    Fill out the form below and we'll get back to you as soon
                    as possible.
                  </Paragraph>
                </div>

                <ContactForm isSubmitting={isPending} onSubmit={handleSubmit} />
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="py-20 bg-slate-900 text-white">
        <Container>
          <div className="text-center mb-14">
            <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 bg-primary/20 px-4 py-1.5 rounded-full">
              Our Process
            </span>
            <Heading level={2} className="mb-4 text-white">
              What Happens After You Reach Out
            </Heading>
            <Paragraph className="text-slate-400 max-w-2xl mx-auto">
              We take every message seriously. Here's what you can expect when
              you contact us.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whatToExpect.map((step, index) => (
              <div key={step.title} className="relative text-center">
                {index < whatToExpect.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-1/2" />
                )}
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center mb-5 border border-primary/30">
                    <step.icon className="w-9 h-9 text-primary" />
                  </div>
                  <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
                    Step {index + 1}
                  </div>
                  <Heading level={4} className="mb-3 text-white">
                    {step.title}
                  </Heading>
                  <Paragraph className="text-slate-400 text-sm leading-relaxed">
                    {step.description}
                  </Paragraph>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-14">
            <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
              Common Questions
            </span>
            <Heading level={2} className="mb-4">
              Frequently Asked Questions
            </Heading>
            <Paragraph className="text-slate-500 max-w-2xl mx-auto">
              Quick answers to the questions we receive most often.
            </Paragraph>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={faq.question}
                className="overflow-hidden border-0 shadow-md rounded-2xl"
              >
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
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Sparkles className="w-14 h-14 mx-auto mb-6 text-white/90" />
            <Heading level={2} className="mb-4 text-white">
              We'd Love to Hear From You
            </Heading>
            <Paragraph className="text-white/85 mb-8 text-lg leading-relaxed">
              Whether you're seeking prayer, have a question, or want to get
              involved in ministry — we're just a message away. Reach out
              today and let's connect.
            </Paragraph>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-slate-100 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg">
                <Send className="w-5 h-5 mr-2" />
                Send a Message
              </Button>
              <Button
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-2xl"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}