"use client";

import React, { memo, useCallback, useMemo, useState } from "react";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, MapPin, Clock, Search } from "lucide-react";

import { Container } from "@/app/Components/UI/Container";
import { Heading } from "@/app/Components/UI/Heading";
import { Card } from "@/app/Components/UI/Card";
import { Badge } from "@/app/Components/UI/Badge";
import { Button } from "@/app/Components/UI/Button/Button";
import { LinkButton } from "../../UI/Button/LinkButton";
import CommonHeroSection from "../../Common/CommonHeroSection";
import { Event } from "@/app/Types/DataTypes";
import { PageContentResponse } from "@/app/Types/PageContent.types";
import { Pagination } from "@/app/Types/APIResponse";


interface IEventProps {
  events: Event[];
  contents: PageContentResponse;
  pagination: Pagination;
}


const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function useDebouncedValue<T>(value: T, delay = 250) {
  const [debounced, setDebounced] = useState(value);

  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}



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
}: {
  event: Event;
  priority?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const href = `/events/${event._id}`;

  const dateText = useMemo(() => {
    // Stable formatting (avoid hydration mismatch issues)
    const d = new Date(event.date);
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [event.date]);

  return (


    <motion.div
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: EASE }}
      className="h-full"
    >
      <Card className="group p-0 overflow-hidden h-full flex flex-col md:flex-row">
        <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={reduceMotion ? undefined : { scale: 1.06 }}
            transition={{ duration: 0.55, ease: EASE }}
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
        </div>

        <div className="md:w-3/5 p-8 flex flex-col">
          <Badge variant="accent" className="mb-4 w-fit">
            {event.category}
          </Badge>

          <Heading level={3} className="mb-4 group-hover:text-primary transition-colors">
            {event.title}
          </Heading>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-slate-500 font-bold">
              <Calendar size={18} className="text-primary" />
              <span>{dateText}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-bold">
              <Clock size={18} className="text-primary" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-bold">
              <MapPin size={18} className="text-primary" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>

          {/* NOTE: button is inside Link but it's NOT an <a>, so it's safe */}
          <LinkButton href={`/pages/${href}`} variant="outline" className="mt-auto w-full">
            Event Details
          </LinkButton>
        </div>
      </Card>
    </motion.div>

  );
});

export default function EventsClient({ events, contents, pagination }: IEventProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebouncedValue(searchTerm, 200);



  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);


  return (
    <div className="py-12 space-y-12">
      {/* Hero */}
      <CommonHeroSection heading={contents?.data.hero?.title || ""} paragraph={contents?.data.hero?.subtitle || ""} backgroundImage={contents?.data.hero?.image?.url || ""} />

      <Container>
        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-grow">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-12 pr-4 py-4 rounded-3xl border-4 border-white disney-shadow focus:outline-none focus:ring-4 focus:ring-primary/20"
              value={searchTerm}
              onChange={onChange}
              aria-label="Search events"
            />
          </div>
        </div>

        {/* Content */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, idx) => (
            <EventCard key={event._id} event={event} priority={idx < 2} />
          ))}
        </div>

      </Container>
    </div>
  );
}