"use client";

import React, { memo, useCallback, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Share2,
  CalendarPlus,
  Users,
  Heart,
  Sparkles,
  Quote,
  ChevronRight,
  BookOpen,
  MessageCircle,
  Facebook,
  Twitter,
  LinkIcon,
  CheckCircle2,
  Star,
  Bell,
  HandHeart,
  Music,
  Coffee,
  Car,
  Utensils,
  Baby,
  Accessibility,
  Camera,
} from "lucide-react";

import { Container } from "@/app/Components/UI/Container";
import { Heading } from "@/app/Components/UI/Heading";
import { Badge } from "@/app/Components/UI/Badge";
import { Button } from "@/app/Components/UI/Button/Button";
import { Card } from "@/app/Components/UI/Card";
import { Paragraph } from "@/app/Components/Typography/TypoGraphy";
import { Event } from "@/app/Types/DataTypes";
import { formatToMMDDYY } from "@/app/utils/utilityFunction";

interface IEventProps {
  event: Event;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------------------------------- STATIC CONTENT ---------------------------------- */

const eventHighlights = [
  {
    icon: Music,
    title: "Powerful Worship",
    description:
      "Enter into God's presence through Spirit-led worship and praise.",
  },
  {
    icon: BookOpen,
    title: "Biblical Teaching",
    description:
      "Receive sound, practical teaching rooted in the Word of God.",
  },
  {
    icon: Users,
    title: "Fellowship",
    description:
      "Connect with believers who will encourage and strengthen your faith.",
  },
  {
    icon: Heart,
    title: "Prayer Ministry",
    description:
      "Experience personal prayer and ministry from our dedicated team.",
  },
];

const whatToBring = [
  { icon: BookOpen, item: "Your Bible (or use one of ours)" },
  { icon: MessageCircle, item: "A notebook for notes and reflections" },
  { icon: Heart, item: "An open heart ready to receive from God" },
  { icon: Users, item: "Friends and family — everyone is welcome!" },
];

const eventSchedule = [
  {
    time: "Arrival & Welcome",
    description: "Friendly greeters welcome you, refreshments available",
    icon: Coffee,
  },
  {
    time: "Opening Worship",
    description: "Corporate praise and worship to center our hearts on God",
    icon: Music,
  },
  {
    time: "Main Teaching",
    description: "In-depth biblical message with practical application",
    icon: BookOpen,
  },
  {
    time: "Prayer & Ministry",
    description: "Personal prayer and ministry time for all who desire",
    icon: HandHeart,
  },
  {
    time: "Fellowship & Refreshments",
    description: "Connect with others over light refreshments",
    icon: Coffee,
  },
];

const amenities = [
  { icon: Car, label: "Free Parking" },
  { icon: Utensils, label: "Refreshments" },
  { icon: Baby, label: "Child-Friendly" },
  { icon: Accessibility, label: "Wheelchair Access" },
  { icon: Camera, label: "Photo Friendly" },
  { icon: Users, label: "Group Welcome" },
];

const organizerInfo = {
  name: "Pastor Daniel Tiruwa",
  role: "Senior Pastor & Event Host",
  bio: "Pastor Daniel has been faithfully shepherding our church community for over 15 years. His passion for God's Word and heart for people make every event a transformative experience.",
};

const relatedEvents = [
  {
    title: "Sunday Worship Service",
    date: "Every Sunday",
    location: "Main Church",
  },
  {
    title: "Mid-Week Bible Study",
    date: "Every Wednesday",
    location: "Fellowship Hall",
  },
  {
    title: "Monthly Prayer Meeting",
    date: "First Friday",
    location: "Prayer Room",
  },
];

const shareLinks = [
  { icon: Facebook, label: "Facebook", color: "hover:bg-blue-600" },
  { icon: Twitter, label: "Twitter", color: "hover:bg-sky-500" },
  { icon: MessageCircle, label: "WhatsApp", color: "hover:bg-green-600" },
  { icon: LinkIcon, label: "Copy Link", color: "hover:bg-slate-700" },
];

/* ---------------------------------- COMPONENTS ---------------------------------- */

function EventDetailSkeleton() {
  return (
    <div className="pb-20">
      <section className="bg-primary-soft py-12">
        <Container>
          <div className="h-6 w-40 bg-white/60 rounded animate-pulse mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="h-7 w-28 bg-white/60 rounded-full animate-pulse" />
              <div className="h-10 w-3/4 bg-white/60 rounded animate-pulse" />
              <div className="space-y-4">
                <div className="h-20 bg-white/60 rounded-2xl animate-pulse" />
                <div className="h-20 bg-white/60 rounded-2xl animate-pulse" />
                <div className="h-20 bg-white/60 rounded-2xl animate-pulse" />
              </div>
            </div>
            <div className="h-[320px] bg-white/60 rounded-4xl border-8 border-white animate-pulse" />
          </div>
        </Container>
      </section>
    </div>
  );
}

const NotFoundState = memo(function NotFoundState() {
  return (
    <Container className="py-32 text-center">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
        <Calendar className="w-10 h-10 text-slate-300" />
      </div>
      <Heading level={2} className="mb-3">
        Event Not Found
      </Heading>
      <Paragraph className="text-slate-500 mb-6">
        The event you're looking for doesn't exist or has been removed.
      </Paragraph>
      <Link href="/events">
        <Button variant="outline">Back to Events</Button>
      </Link>
    </Container>
  );
});

const InfoRow = memo(function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
      <div className="bg-primary/10 p-3 rounded-xl shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
          {label}
        </p>
        <p className="font-semibold text-slate-800 truncate">{value}</p>
      </div>
    </div>
  );
});

/* ---------------------------------- MAIN ---------------------------------- */

export default function EventDetailClient({ event }: IEventProps) {
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = useCallback(() => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  if (!event) return <NotFoundState />;

  return (
    <div className="pb-20 bg-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 py-12 md:py-16">
        <Container>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition-colors font-bold group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Events
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="accent">{event.category}</Badge>
                <span className="inline-flex items-center gap-1.5 bg-white text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  Upcoming Event
                </span>
              </div>

              <Heading level={1} className="mb-6 text-slate-800">
                {event.title}
              </Heading>

              <div className="space-y-3">
                <InfoRow
                  icon={<Calendar className="text-primary" size={20} />}
                  label="Date"
                  value={formatToMMDDYY(event.date)}
                />
                <InfoRow
                  icon={<Clock className="text-primary" size={20} />}
                  label="Time"
                  value={event.time}
                />
                <InfoRow
                  icon={<MapPin className="text-primary" size={20} />}
                  label="Location"
                  value={event.location}
                />
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200"
            >
              <div className="relative w-full h-[320px] sm:h-[400px]">
                <Image
                  src={event.image.url}
                  alt={event.image.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2 text-center shadow-lg">
                  <div className="text-xs font-bold text-primary uppercase tracking-wider">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </div>
                  <div className="text-2xl font-bold text-slate-800 leading-none">
                    {new Date(event.date).getDate()}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* QUICK INFO BAR */}
      <section className="relative -mt-8 z-10">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Clock, label: "Duration", value: "2-3 Hours" },
              { icon: Users, label: "Attendance", value: "Open to All" },
              { icon: Heart, label: "Cost", value: "Free Entry" },
              { icon: Star, label: "Format", value: "In Person" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-4 md:p-5 shadow-xl border border-slate-100 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold">
                    {item.label}
                  </div>
                  <div className="font-bold text-slate-800 text-sm">
                    {item.value}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-12">
            {/* ABOUT EVENT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-4">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  About This Event
                </span>
              </div>
              <Heading level={3} className="mb-6 text-slate-800">
                Event Overview
              </Heading>

              <Paragraph className="text-lg leading-relaxed text-slate-600 mb-6">
                {event.description}
              </Paragraph>

              <Paragraph className="leading-relaxed text-slate-600 mb-6">
                This gathering is part of our ongoing commitment to build up
                the body of Christ and reach our community with the love of
                Jesus. Whether you're a long-time member or visiting for the
                first time, you are warmly welcome here.
              </Paragraph>

              <Paragraph className="leading-relaxed text-slate-600">
                Come expectant, come as you are. We believe God has something
                special in store for everyone who attends. Bring your friends
                and family — this is an event for all generations.
              </Paragraph>
            </motion.div>

            {/* HIGHLIGHTS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-4">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Event Highlights
                </span>
              </div>
              <Heading level={3} className="mb-6 text-slate-800">
                What You'll Experience
              </Heading>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {eventHighlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-white">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <Heading level={5} className="mb-2 text-slate-800">
                        {item.title}
                      </Heading>
                      <Paragraph className="text-sm text-slate-500 leading-relaxed">
                        {item.description}
                      </Paragraph>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* SCHEDULE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-4">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Program Flow
                </span>
              </div>
              <Heading level={3} className="mb-6 text-slate-800">
                What to Expect
              </Heading>

              <div className="space-y-3">
                {eventSchedule.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-800 mb-1">
                        {item.time}
                      </div>
                      <div className="text-sm text-slate-500 leading-relaxed">
                        {item.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* WHAT TO BRING */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 border border-primary/10"
            >
              <div className="inline-flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full mb-4">
                <Heart className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Come Prepared
                </span>
              </div>
              <Heading level={3} className="mb-6 text-slate-800">
                What to Bring
              </Heading>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {whatToBring.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/60 rounded-xl"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-slate-700">{item.item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AMENITIES */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-4">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Amenities
                </span>
              </div>
              <Heading level={3} className="mb-6 text-slate-800">
                What's Provided
              </Heading>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenities.map((amenity, index) => (
                  <motion.div
                    key={amenity.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <amenity.icon className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-medium text-slate-700">
                      {amenity.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* SHARE SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <Heading level={3} className="text-white mb-2">
                    Share This Event
                  </Heading>
                  <Paragraph className="text-slate-400 text-sm">
                    Invite your friends and family — everyone is welcome!
                  </Paragraph>
                </div>

                <div className="flex flex-wrap gap-3">
                  {shareLinks.map((link) => (
                    <button
                      key={link.label}
                      type="button"
                      onClick={
                        link.label === "Copy Link" ? handleCopyLink : undefined
                      }
                      className={`w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${link.color} hover:scale-110`}
                      aria-label={`Share on ${link.label}`}
                    >
                      {link.label === "Copy Link" && copied ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <link.icon className="w-5 h-5" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-8">
            {/* REGISTRATION CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="p-7 border-0 shadow-xl rounded-3xl bg-white sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-primary" />
                  </div>
                  <Heading level={4} className="text-slate-800">
                    Reserve Your Spot
                  </Heading>
                </div>

                <Paragraph className="text-slate-600 text-sm mb-6 leading-relaxed">
                  This event is free to attend. Registering helps us prepare
                  better and keeps you informed of any updates.
                </Paragraph>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-sm text-slate-500 font-medium">
                      Admission
                    </span>
                    <span className="text-sm font-bold text-emerald-600">
                      Free
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-sm text-slate-500 font-medium">
                      Open To
                    </span>
                    <span className="text-sm font-bold text-slate-700">
                      Everyone
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-sm text-slate-500 font-medium">
                      Registration
                    </span>
                    <span className="text-sm font-bold text-slate-700">
                      Recommended
                    </span>
                  </div>
                </div>

                <Button className="w-full mb-3 rounded-xl bg-primary hover:bg-primary/90 shadow-lg py-3">
                  <CalendarPlus size={18} className="mr-2" />
                  Register Now
                </Button>

                <Button
                  variant="outline"
                  className="w-full gap-2 rounded-xl border-2 py-3"
                >
                  <CalendarPlus size={18} />
                  Add to Calendar
                </Button>
              </Card>
            </motion.div>

            {/* ORGANIZER CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-7 border-0 shadow-lg rounded-3xl bg-white">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <Heading level={4} className="text-slate-800">
                    Event Organizer
                  </Heading>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white shadow-lg shrink-0">
                    <Users size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">
                      {organizerInfo.name}
                    </div>
                    <div className="text-xs text-primary font-semibold mb-2">
                      {organizerInfo.role}
                    </div>
                  </div>
                </div>

                <Paragraph className="text-sm text-slate-500 leading-relaxed">
                  {organizerInfo.bio}
                </Paragraph>
              </Card>
            </motion.div>

            {/* RELATED EVENTS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-7 border-0 shadow-lg rounded-3xl bg-white">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <Heading level={4} className="text-slate-800">
                    Regular Gatherings
                  </Heading>
                </div>

                <div className="space-y-4">
                  {relatedEvents.map((item, index) => (
                    <div
                      key={index}
                      className="group flex items-start gap-3 p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-800 text-sm leading-snug mb-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span>{item.date}</span>
                          <span>•</span>
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* NEED HELP CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="p-7 border-0 shadow-lg rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-white relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 opacity-10">
                  <MessageCircle size={180} className="text-white" />
                </div>
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <Heading level={4} className="text-white mb-2">
                    Need Help?
                  </Heading>
                  <Paragraph className="text-white/80 text-sm mb-5 leading-relaxed">
                    Have questions about this event? Our team is here to help
                    you with anything you need.
                  </Paragraph>
                  <Link href="/contact">
                    <Button className="w-full rounded-xl bg-white text-primary hover:bg-slate-100 font-semibold">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </aside>
        </div>
      </Container>
    </div>
  );
}