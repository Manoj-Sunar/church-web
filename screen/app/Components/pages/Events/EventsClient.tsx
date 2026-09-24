"use client";

import React, { memo, useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Search,
  Sparkles,
  Users,
  Heart,
  Quote,
  ChevronRight,
  Bell,
  Star,
  Globe,
  HandHeart,
  Filter,
  CalendarDays,
  BookOpen,
} from "lucide-react";

import { Container } from "@/app/Components/UI/Container";
import { Heading } from "@/app/Components/UI/Heading";
import { Card } from "@/app/Components/UI/Card";
import { Badge } from "@/app/Components/UI/Badge";
import { Button } from "@/app/Components/UI/Button/Button";
import { LinkButton } from "../../UI/Button/LinkButton";
import CommonHeroSection from "../../Common/CommonHeroSection";
import { Paragraph } from "../../Typography/TypoGraphy";
import { Event } from "@/app/Types/DataTypes";
import { PageContentResponse } from "@/app/Types/PageContent.types";
import { Pagination } from "@/app/Types/APIResponse";

interface IEventProps {
  events: Event[];
  contents: PageContentResponse;
  pagination: Pagination;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------------------------------- STATIC CONTENT ---------------------------------- */

const eventStats = [
  { value: "50+", label: "Events This Year", icon: CalendarDays },
  { value: "5K+", label: "Attendees Welcomed", icon: Users },
  { value: "12+", label: "Ministry Partners", icon: HandHeart },
  { value: "100%", label: "Free to Attend", icon: Heart },
];

const eventCategories = [
  {
    icon: BookOpen,
    title: "Bible Conferences",
    description:
      "Deep dive into Scripture with extended teaching sessions and workshops.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: HandHeart,
    title: "Outreach Programs",
    description:
      "Community service initiatives bringing hope and practical help to those in need.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Users,
    title: "Fellowship Gatherings",
    description:
      "Meaningful connection times for believers to grow together in Christ.",
    color: "from-rose-500 to-rose-600",
  },
  {
    icon: Sparkles,
    title: "Worship Nights",
    description:
      "Extended evenings of praise, prayer, and seeking the presence of God.",
    color: "from-purple-500 to-purple-600",
  },
];

const whyAttend = [
  {
    icon: Sparkles,
    title: "Encounter God",
    description:
      "Experience His presence through worship, teaching, and prayer in a powerful way.",
  },
  {
    icon: Users,
    title: "Build Community",
    description:
      "Connect with believers who share your faith and journey together in Christ.",
  },
  {
    icon: BookOpen,
    title: "Grow in Faith",
    description:
      "Deepen your understanding of Scripture and mature in your walk with God.",
  },
  {
    icon: Heart,
    title: "Be Refreshed",
    description:
      "Find rest, encouragement, and renewal for your soul in these gatherings.",
  },
];

const upcomingHighlights = [
  {
    title: "Annual Bible Conference",
    month: "Coming Soon",
    description:
      "Three days of powerful teaching, worship, and fellowship with believers from across Nepal.",
  },
  {
    title: "Village Outreach Trip",
    month: "Next Month",
    description:
      "Join us as we take the Gospel to unreached villages and serve communities in need.",
  },
  {
    title: "Youth Worship Night",
    month: "This Month",
    description:
      "An evening of passionate worship and prayer designed specifically for young believers.",
  },
];

const testimonials = [
  {
    quote:
      "The Bible conference completely transformed my walk with God. I came with questions and left with a deeper hunger for His Word.",
    name: "Anita K.",
    role: "Regular Attendee",
  },
  {
    quote:
      "Our church family looks forward to every event. They're always well-organized, Spirit-filled, and genuinely impactful.",
    name: "Pastor James M.",
    role: "Ministry Partner",
  },
  {
    quote:
      "I invited my neighbor to the outreach event, and she gave her life to Christ that day. These gatherings truly change lives.",
    name: "Sarah P.",
    role: "Church Member",
  },
];

const whatToExpect = [
  "Warm welcome and friendly community",
  "Powerful worship and praise sessions",
  "Biblically-grounded teaching",
  "Prayer and ministry time",
  "Opportunities for connection and fellowship",
  "Refreshments and comfortable facilities",
];

const faqs = [
  {
    question: "Do I need to register in advance?",
    answer:
      "Many of our events are open to all without registration. For larger conferences and outreach trips, we recommend registering in advance to help us plan better.",
  },
  {
    question: "Is there a cost to attend?",
    answer:
      "Most of our events are completely free. Some larger conferences may have a small registration fee to cover materials and meals, but we never want cost to be a barrier.",
  },
  {
    question: "Can I bring my family?",
    answer:
      "Absolutely! Most events are family-friendly and we welcome children. Some events even have dedicated programs for kids and youth.",
  },
  {
    question: "How can I stay updated on upcoming events?",
    answer:
      "Subscribe to our newsletter, follow us on social media, or check this page regularly. We announce all events at least two weeks in advance.",
  },
];

/* ---------------------------------- UTILITIES ---------------------------------- */

function useDebouncedValue<T>(value: T, delay = 250) {
  const [debounced, setDebounced] = useState(value);

  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}

/* ---------------------------------- COMPONENTS ---------------------------------- */

function EventsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl border border-slate-200 overflow-hidden bg-white"
        >
          <div className="h-64 bg-slate-100 animate-pulse" />
          <div className="p-8 space-y-4">
            <div className="h-6 w-28 bg-slate-100 animate-pulse rounded-full" />
            <div className="h-7 w-2/3 bg-slate-100 animate-pulse rounded" />
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-slate-100 animate-pulse rounded" />
              <div className="h-4 w-1/2 bg-slate-100 animate-pulse rounded" />
              <div className="h-4 w-2/3 bg-slate-100 animate-pulse rounded" />
            </div>
            <div className="h-11 w-full bg-slate-100 animate-pulse rounded-2xl mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

const EventCard = memo(function EventCard({
  event,
  priority,
  index,
}: {
  event: Event;
  priority?: boolean;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const href = `/events/${event._id}`;

  const dateText = useMemo(() => {
    const d = new Date(event.date);
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [event.date]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className="h-full"
    >
      <Card className="group p-0 overflow-hidden h-full flex flex-col md:flex-row border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl">
        <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={reduceMotion ? undefined : { scale: 1.08 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Image
              src={event.image.url}
              alt={event.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={priority}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent md:bg-gradient-to-r" />

          {/* Date badge */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2 text-center shadow-lg">
            <div className="text-xs font-bold text-primary uppercase tracking-wider">
              {new Date(event.date).toLocaleDateString("en-US", {
                month: "short",
              })}
            </div>
            <div className="text-xl font-bold text-slate-800 leading-none">
              {new Date(event.date).getDate()}
            </div>
          </div>
        </div>

        <div className="md:w-3/5 p-7 flex flex-col">
          <Badge variant="accent" className="mb-4 w-fit">
            {event.category}
          </Badge>

          <Heading
            level={3}
            className="mb-4 group-hover:text-primary transition-colors line-clamp-2"
          >
            {event.title}
          </Heading>

          <div className="space-y-3 mb-6 flex-grow">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Calendar size={16} className="text-primary shrink-0" />
              <span className="font-medium">{dateText}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Clock size={16} className="text-primary shrink-0" />
              <span className="font-medium">{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <MapPin size={16} className="text-primary shrink-0" />
              <span className="font-medium line-clamp-1">{event.location}</span>
            </div>
          </div>

          <LinkButton
            href={`/pages${href}`}
            variant="outline"
            className="mt-auto w-full rounded-xl border-2 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 flex items-center justify-center gap-2"
          >
            View Details
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </LinkButton>
        </div>
      </Card>
    </motion.div>
  );
});

/* ---------------------------------- MAIN ---------------------------------- */

export default function EventsClient({ events, contents, pagination }: IEventProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const debouncedSearch = useDebouncedValue(searchTerm, 200);

  const filteredEvents = useMemo(() => {
    if (!debouncedSearch) return events;
    const term = debouncedSearch.toLowerCase();
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(term) ||
        e.location?.toLowerCase().includes(term) ||
        e.category?.toLowerCase().includes(term) ||
        e.description?.toLowerCase().includes(term)
    );
  }, [events, debouncedSearch]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <CommonHeroSection
        heading={contents?.data.hero?.title || "Upcoming Events"}
        paragraph={
          contents?.data.hero?.subtitle ||
          "Join us for powerful gatherings, conferences, and outreach programs designed to strengthen your faith and connect you with our church family."
        }
        backgroundImage={contents?.data.hero?.image?.url || ""}
      />

      {/* STATS BAR */}
      <section className="relative -mt-10 z-10">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {eventStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-5 md:p-6 shadow-xl border border-slate-100 text-center hover:shadow-2xl transition-shadow"
              >
                <stat.icon className="w-7 h-7 mx-auto mb-3 text-primary" />
                <div className="text-2xl md:text-3xl font-bold text-slate-800">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-slate-500 font-semibold mt-1">
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
              "Let us not give up meeting together, as some are in the habit of
              doing, but let us encourage one another."
            </blockquote>
            <cite className="text-primary font-semibold text-lg not-italic">
              — Hebrews 10:25
            </cite>
          </motion.div>
        </Container>
      </section>

      {/* WHY ATTEND */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
                Why Join Us
              </span>
              <Heading level={2} className="mb-4">
                Why Attend Our Events
              </Heading>
              <Paragraph className="text-slate-500 max-w-2xl mx-auto">
                Every gathering is an opportunity to encounter God, grow in
                faith, and connect with others on the same journey.
              </Paragraph>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyAttend.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
              >
                <Card className="p-7 h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl bg-white">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <Heading level={4} className="mb-3 text-slate-800">
                    {item.title}
                  </Heading>
                  <Paragraph className="text-slate-500 text-sm leading-relaxed">
                    {item.description}
                  </Paragraph>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* EVENT CATEGORIES */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
                Types of Events
              </span>
              <Heading level={2} className="mb-4">
                What We Host
              </Heading>
              <Paragraph className="text-slate-500 max-w-2xl mx-auto">
                From intimate fellowship gatherings to large-scale conferences,
                we create spaces for every kind of spiritual encounter.
              </Paragraph>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer"
              >
                <Card className="p-7 h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl bg-white">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <Heading
                    level={4}
                    className="mb-3 group-hover:text-primary transition-colors"
                  >
                    {category.title}
                  </Heading>
                  <Paragraph className="text-slate-500 text-sm leading-relaxed">
                    {category.description}
                  </Paragraph>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* UPCOMING HIGHLIGHTS */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
                Don't Miss Out
              </span>
              <Heading level={2} className="mb-4">
                Upcoming Highlights
              </Heading>
              <Paragraph className="text-slate-500 max-w-2xl mx-auto">
                Mark your calendar for these special gatherings designed to
                strengthen your faith and connect you with our community.
              </Paragraph>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 border-l-4 border-l-primary">
                  <div className="inline-flex items-center gap-1.5 bg-primary/15 text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                    <Bell className="w-3 h-3" />
                    {highlight.month}
                  </div>
                  <Heading level={4} className="mb-3 text-slate-800">
                    {highlight.title}
                  </Heading>
                  <Paragraph className="text-slate-600 text-sm leading-relaxed">
                    {highlight.description}
                  </Paragraph>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ALL EVENTS + SEARCH */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
                Full Calendar
              </span>
              <Heading level={2} className="mb-4">
                All Upcoming Events
              </Heading>
              <Paragraph className="text-slate-500 max-w-2xl mx-auto">
                Browse through all our scheduled events and find the next
                opportunity to connect and grow.
              </Paragraph>
            </motion.div>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search events by title, location, or category..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
                value={searchTerm}
                onChange={onChange}
                aria-label="Search events"
              />
            </div>
          </div>

          {/* Events grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredEvents.map((event, idx) => (
                <EventCard
                  key={event._id}
                  event={event}
                  priority={idx < 2}
                  index={idx}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
                <Search className="w-10 h-10 text-slate-300" />
              </div>
              <Heading level={3} className="text-slate-400 mb-2">
                No events found
              </Heading>
              <Paragraph className="text-slate-400 mb-6">
                Try adjusting your search terms
              </Paragraph>
              <Button
                variant="outline"
                type="button"
                onClick={() => setSearchTerm("")}
              >
                Clear search
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* WHAT TO EXPECT */}
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
                First Time?
              </span>
              <Heading level={2} className="mb-6 text-white">
                What to Expect When You Visit
              </Heading>
              <Paragraph className="text-slate-400 mb-8 leading-relaxed">
                We want you to feel completely at home from the moment you
                arrive. Here's what you can look forward to at any of our
                events.
              </Paragraph>

              <div className="space-y-4">
                {whatToExpect.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Star className="w-3 h-3 text-primary fill-primary" />
                    </div>
                    <span className="text-slate-300">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10">
                <Button className="bg-primary hover:bg-primary/90 rounded-2xl px-8 py-4">
                  <Bell className="w-4 h-4 mr-2" />
                  Get Event Notifications
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Users, label: "Welcoming Community" },
                { icon: Sparkles, label: "Spirit-Filled Worship" },
                { icon: BookOpen, label: "Sound Teaching" },
                { icon: Heart, label: "Prayer Support" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition-colors"
                >
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-sm font-semibold text-white">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <Container>
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
                Testimonies
              </span>
              <Heading level={2} className="mb-4">
                Lives Touched at Our Events
              </Heading>
              <Paragraph className="text-slate-500 max-w-2xl mx-auto">
                Hear from those whose lives have been impacted by attending
                our gatherings.
              </Paragraph>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full border-0 shadow-lg relative overflow-hidden rounded-3xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <Paragraph className="text-slate-600 mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </Paragraph>
                  <div className="pt-4 border-t border-slate-100">
                    <div className="font-semibold text-slate-800">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-400">
                      {testimonial.role}
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
                Questions
              </span>
              <Heading level={2} className="mb-4">
                Frequently Asked Questions
              </Heading>
              <Paragraph className="text-slate-500 max-w-2xl mx-auto">
                Everything you need to know about our events.
              </Paragraph>
            </motion.div>
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
                    onClick={() =>
                      setOpenFaq(openFaq === index ? null : index)
                    }
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
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === index ? "auto" : 0,
                      opacity: openFaq === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-500 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
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
            <Bell className="w-14 h-14 mx-auto mb-6 text-white/90" />
            <Heading level={2} className="mb-4 text-white">
              Never Miss an Event
            </Heading>
            <Paragraph className="text-white/85 mb-8 text-lg leading-relaxed">
              Subscribe to receive notifications about upcoming events,
              conferences, and ministry gatherings. Be part of what God is
              doing in our community.
            </Paragraph>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-slate-100 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg">
                Subscribe for Updates
              </Button>
              <Button
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-2xl"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}