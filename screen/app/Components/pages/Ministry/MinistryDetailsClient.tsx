"use client";

import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  User,
  Target,
  Users,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Share2,
  ChevronRight,
  Quote,
  Sparkles,
  CheckCircle2,
  HandHeart,
  MessageCircle,
  Phone,
  Mail,
  Star,
} from "lucide-react";
import { Container } from "../../UI/Container";
import { Heading } from "../../UI/Heading";
import { Button } from "../../UI/Button/Button";
import { Card } from "../../UI/Card";
import { Paragraph } from "../../Typography/TypoGraphy";
import { Ministry } from "@/app/Types/DataTypes";

interface IMinistryProps {
  ministry: Ministry;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------------------------------- STATIC CONTENT ---------------------------------- */

const ministryValues = [
  {
    icon: Heart,
    title: "Christ-Centered Love",
    description:
      "Everything we do flows from the love of Christ. We serve not out of obligation, but out of gratitude for His sacrifice.",
  },
  {
    icon: BookOpen,
    title: "Faithful to Scripture",
    description:
      "God's Word is our foundation. We teach, serve, and lead according to biblical truth and principles.",
  },
  {
    icon: Users,
    title: "Genuine Community",
    description:
      "We believe transformation happens in relationship. Together we grow, encourage, and sharpen one another.",
  },
  {
    icon: Target,
    title: "Purposeful Mission",
    description:
      "Every activity is intentional, designed to fulfill the Great Commission and glorify God in all we do.",
  },
];

const whatWeDo = [
  "Weekly gatherings for worship, teaching, and fellowship",
  "Community outreach and practical service initiatives",
  "Discipleship and mentorship for spiritual growth",
  "Prayer support and pastoral care for all members",
  "Mission trips and evangelism in surrounding regions",
  "Training and equipping believers for Kingdom work",
];

const howToJoinSteps = [
  {
    step: "01",
    title: "Attend a Gathering",
    description:
      "Visit one of our weekly meetings to experience the ministry firsthand and meet our team.",
  },
  {
    step: "02",
    title: "Meet Our Leaders",
    description:
      "Connect with ministry leaders to discuss your calling, gifts, and how you might serve.",
  },
  {
    step: "03",
    title: "Complete Orientation",
    description:
      "Participate in a short orientation to understand our vision, values, and expectations.",
  },
  {
    step: "04",
    title: "Begin Serving",
    description:
      "Start your journey with ongoing support, mentorship, and training from our team.",
  },
];

const impactStats = [
  { value: "500+", label: "Members Served" },
  { value: "25+", label: "Outreach Events" },
  { value: "10+", label: "Years Active" },
  { value: "100%", label: "Kingdom Focused" },
];

const relatedScriptures = [
  {
    verse:
      "Let the little children come to me, and do not hinder them, for the kingdom of heaven belongs to such as these.",
    reference: "Matthew 19:14",
  },
  {
    verse:
      "Go into all the world and preach the gospel to all creation.",
    reference: "Mark 16:15",
  },
  {
    verse:
      "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
    reference: "Colossians 3:23",
  },
];

const contactOptions = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+977-XXXXXXXXX",
    description: "Available Mon-Sat, 9 AM - 6 PM",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "ministry@danieltiruwa.com",
    description: "We respond within 24 hours",
  },
  {
    icon: MessageCircle,
    title: "Meet In Person",
    value: "Visit Our Church",
    description: "Sunday service at 10 AM",
  },
];

/* ---------------------------------- SUB-COMPONENTS ---------------------------------- */

function MinistryDetailSkeleton() {
  return (
    <div className="pb-20">
      <section className="relative h-[450px] overflow-hidden bg-slate-100 animate-pulse" />
      <Container className="mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-28 rounded-3xl bg-slate-100 animate-pulse" />
            <div className="space-y-3">
              <div className="h-8 w-2/3 bg-slate-100 animate-pulse rounded" />
              <div className="h-5 w-full bg-slate-100 animate-pulse rounded" />
              <div className="h-5 w-11/12 bg-slate-100 animate-pulse rounded" />
              <div className="h-5 w-10/12 bg-slate-100 animate-pulse rounded" />
            </div>
            <div className="h-72 rounded-3xl bg-slate-100 animate-pulse" />
          </div>
          <div className="space-y-8">
            <div className="h-72 rounded-3xl bg-slate-100 animate-pulse" />
            <div className="h-64 rounded-3xl bg-slate-100 animate-pulse" />
          </div>
        </div>
      </Container>
    </div>
  );
}

const NotFoundState = memo(function NotFoundState() {
  return (
    <Container className="py-32 text-center">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
        <Target className="w-10 h-10 text-slate-300" />
      </div>
      <Heading level={2} className="mb-3">
        Ministry Not Found
      </Heading>
      <Paragraph className="text-slate-500 mb-6">
        The ministry you're looking for doesn't exist or has been removed.
      </Paragraph>
      <Link href="/pages/ministries">
        <Button variant="outline">Back to Ministries</Button>
      </Link>
    </Container>
  );
});

const Hero = memo(function Hero({ ministry }: { ministry: Ministry }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative h-[450px] overflow-hidden">
      <motion.div
        initial={reduceMotion ? false : { scale: 1.1 }}
        animate={reduceMotion ? false : { scale: 1 }}
        transition={{ duration: 1.5, ease: EASE }}
        className="absolute inset-0"
      >
        <Image
          src={ministry.image.url}
          alt={ministry.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/30" />

      <Container className="absolute bottom-0 left-0 right-0 pb-12">
        <Link
          href="/pages/ministries"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Ministries
        </Link>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-bold">
              <Sparkles className="w-3 h-3" />
              Active Ministry
            </span>
          </div>
          <Heading level={1} className="text-white text-4xl md:text-5xl mb-4">
            {ministry.name}
          </Heading>
          <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              Led by {ministry.leader}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              Nepal
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
});

const LeaderCard = memo(function LeaderCard({ leader }: { leader: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-5 p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl border border-primary/20"
    >
      <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shrink-0">
        <User size={32} />
      </div>
      <div>
        <Paragraph className="text-xs text-primary font-bold uppercase tracking-widest mb-1">
          Ministry Leader
        </Paragraph>
        <Heading level={4} className="text-slate-800">
          {leader}
        </Heading>
        <Paragraph className="text-sm text-slate-500 mt-1">
          Dedicated servant of God leading with vision and compassion
        </Paragraph>
      </div>
    </motion.div>
  );
});

const SupportCTA = memo(function SupportCTA({
  ministryName,
  onDonate,
}: {
  ministryName: string;
  onDonate: () => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-3xl p-8 md:p-10 border border-amber-200/50 relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
            Support Our Mission
          </span>
        </div>
        <Heading level={3} className="text-slate-800 mb-4">
          Partner With {ministryName}
        </Heading>
        <Paragraph className="text-slate-600 mb-8 max-w-xl leading-relaxed">
          Your generosity enables us to continue the work God has called us to.
          Every gift — whether financial, practical, or through prayer — helps
          us reach more lives with the love of Christ.
        </Paragraph>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="secondary"
            size="lg"
            className="bg-rose-500 hover:bg-rose-600 text-white rounded-2xl shadow-lg"
            onClick={onDonate}
          >
            <Heart className="mr-2 fill-white" size={18} /> Donate Now
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-slate-300 text-slate-700 hover:bg-white rounded-2xl"
          >
            <HandHeart className="mr-2" size={18} /> Volunteer With Us
          </Button>
        </div>
      </div>

      <div className="absolute -bottom-16 -right-16 opacity-[0.07] pointer-events-none">
        <Heart size={320} className="text-rose-500 fill-rose-500" />
      </div>
    </motion.section>
  );
});

function DonationModal({
  open,
  ministryName,
  onClose,
}: {
  open: boolean;
  ministryName: string;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Donate to ${ministryName}`}
        >
          <motion.div
            initial={reduceMotion ? false : { scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close donation modal"
              type="button"
            >
              &times;
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-rose-100 flex items-center justify-center">
                <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
              </div>
              <Heading level={3} className="mb-2">
                Support {ministryName}
              </Heading>
              <Paragraph className="text-slate-500 text-sm">
                Scan the QR code below to make your donation
              </Paragraph>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <Image
                src={"/qr.jpeg"}
                width={300}
                height={300}
                alt="Donation QR Code"
                className="w-full h-auto rounded-xl"
              />
            </div>

            <Paragraph className="text-center text-xs text-slate-400 mt-4">
              Every gift makes an eternal difference
            </Paragraph>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------------------------- MAIN COMPONENT ---------------------------------- */

export default function MinistryDetailClient({ ministry }: IMinistryProps) {
  const [showDonationModal, setShowDonationModal] = useState(false);

  const openDonate = useCallback(() => setShowDonationModal(true), []);
  const closeDonate = useCallback(() => setShowDonationModal(false), []);

  if (!ministry) return <NotFoundState />;

  return (
    <div className="pb-20 bg-white overflow-hidden">
      <Hero ministry={ministry} />

      {/* IMPACT STATS */}
      <section className="relative -mt-10 z-10">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100 text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-slate-500 font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Leader */}
            <LeaderCard leader={ministry.leader} />

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-4">
                <BookOpen className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Our Story
                </span>
              </div>
              <Heading level={3} className="mb-6 text-slate-800">
                About {ministry.name}
              </Heading>

              <Paragraph className="text-lg leading-relaxed text-slate-600 mb-6">
                {ministry.longDescription}
              </Paragraph>

              <Paragraph className="leading-relaxed text-slate-600 mb-6">
                This ministry exists to glorify God by making disciples,
                serving our community, and building up the body of Christ.
                We believe that when believers come together with one heart
                and one purpose, God moves powerfully in and through us.
              </Paragraph>

              <Paragraph className="leading-relaxed text-slate-600">
                Whether you're seeking spiritual growth, meaningful
                relationships, or a place to use your gifts, there is a home
                for you here. We invite you to join us as we walk together in
                faith, hope, and love.
              </Paragraph>
            </motion.div>

            {/* What We Do */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-4">
                <Target className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Our Activities
                </span>
              </div>
              <Heading level={3} className="mb-6 text-slate-800">
                What We Do
              </Heading>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {whatWeDo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm leading-relaxed">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Our Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-4">
                <Heart className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Our Values
                </span>
              </div>
              <Heading level={3} className="mb-6 text-slate-800">
                What Guides Us
              </Heading>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {ministryValues.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 h-full border-0 shadow-md hover:shadow-xl transition-shadow rounded-2xl bg-white">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <value.icon className="w-5 h-5 text-primary" />
                      </div>
                      <Heading level={5} className="mb-2 text-slate-800">
                        {value.title}
                      </Heading>
                      <Paragraph className="text-sm text-slate-500 leading-relaxed">
                        {value.description}
                      </Paragraph>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Scripture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 md:p-10 border border-primary/10"
            >
              <Quote className="w-10 h-10 text-primary/40 mb-5" />
              <blockquote className="text-xl md:text-2xl font-serif text-slate-700 italic leading-relaxed mb-5">
                "{relatedScriptures[0].verse}"
              </blockquote>
              <cite className="text-primary font-semibold not-italic">
                — {relatedScriptures[0].reference}
              </cite>
            </motion.div>

            {/* Support CTA */}
            <SupportCTA ministryName={ministry.name} onDonate={openDonate} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* How to Join */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-7 border-0 shadow-lg rounded-3xl bg-white">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <HandHeart className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <Heading level={4} className="text-slate-800">
                    How to Join
                  </Heading>
                </div>

                <div className="space-y-5">
                  {howToJoinSteps.map((step, index) => (
                    <div key={step.step} className="flex gap-4">
                      <div className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {step.step}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 text-sm mb-1">
                          {step.title}
                        </div>
                        <div className="text-xs text-slate-500 leading-relaxed">
                          {step.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-6 rounded-xl bg-primary hover:bg-primary/90">
                  Get Started
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Card>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-7 border-0 shadow-lg rounded-3xl bg-white">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <Heading level={4} className="text-slate-800">
                    Get in Touch
                  </Heading>
                </div>

                <div className="space-y-4">
                  {contactOptions.map((option) => (
                    <div
                      key={option.title}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                        <option.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 text-sm">
                          {option.title}
                        </div>
                        <div className="text-xs text-primary font-medium">
                          {option.value}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {option.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quick Facts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-7 border-0 shadow-lg rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                    <Star className="w-4.5 h-4.5 text-amber-400" />
                  </div>
                  <Heading level={4} className="text-white">
                    Quick Facts
                  </Heading>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-sm text-slate-300 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Meeting Day
                    </span>
                    <span className="font-semibold text-sm">Sunday</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-sm text-slate-300 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Time
                    </span>
                    <span className="font-semibold text-sm">10:00 AM</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-sm text-slate-300 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Location
                    </span>
                    <span className="font-semibold text-sm">Main Church</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300 flex items-center gap-2">
                      <Users className="w-4 h-4" /> Open To
                    </span>
                    <span className="font-semibold text-sm">Everyone</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-6 rounded-xl border-white/20 text-white hover:bg-white/10"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Ministry
                </Button>
              </Card>
            </motion.div>
          </aside>
        </div>
      </Container>

      <DonationModal
        open={showDonationModal}
        ministryName={ministry.name}
        onClose={closeDonate}
      />
    </div>
  );
}