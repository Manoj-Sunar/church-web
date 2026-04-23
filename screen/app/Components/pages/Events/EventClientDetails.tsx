"use client";

import React, { memo, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import {
    Calendar,
    MapPin,
    Clock,
    ArrowLeft,
    Share2,
    CalendarPlus,
} from "lucide-react";

import { Container } from "@/app/Components/UI/Container";
import { Heading } from "@/app/Components/UI/Heading";
import { Badge } from "@/app/Components/UI/Badge";
import { Button } from "@/app/Components/UI/Button/Button";
import { Event } from "@/app/Types/DataTypes";
import { formatToMMDDYY } from "@/app/utils/utilityFunction";

interface IEventProps {
    event: Event;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

            <Container className="mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="h-8 w-60 bg-slate-100 rounded animate-pulse" />
                        <div className="h-5 w-full bg-slate-100 rounded animate-pulse" />
                        <div className="h-5 w-11/12 bg-slate-100 rounded animate-pulse" />
                        <div className="h-5 w-10/12 bg-slate-100 rounded animate-pulse" />
                    </div>
                    <div className="space-y-8">
                        <div className="h-64 bg-slate-100 rounded-3xl animate-pulse" />
                        <div className="h-20 bg-slate-100 rounded-3xl animate-pulse" />
                    </div>
                </div>
            </Container>
        </div>
    );
}




const NotFoundState = memo(function NotFoundState() {
    return (
        <Container className="py-20 text-center">
            <Heading level={2}>Event not found</Heading>
            <Link href="/events" className="mt-4 inline-block">
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
        <div className="flex items-center gap-4 p-4 bg-white rounded-2xl disney-shadow border-2 border-primary-soft">
            <div className="bg-primary-soft p-3 rounded-xl">{icon}</div>
            <div>
                <p className="text-xs text-slate-400 font-bold uppercase">{label}</p>
                <p className="font-display font-bold text-slate-800">{value}</p>
            </div>
        </div>
    );
});






export default function EventDetailClient({ event }:IEventProps) {
    const reduceMotion = useReducedMotion();













    return (
        <div className="pb-20">
            {/* Header/Hero */}
            <section className="bg-primary-soft py-12">
                <Container>
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition-colors font-bold"
                    >
                        <ArrowLeft size={20} /> Back to Events
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge variant="accent" className="mb-4">
                                {event.category}
                            </Badge>

                            <Heading level={1} className="mb-6">
                                {event.title}
                            </Heading>

                            <div className="space-y-4">
                                <InfoRow
                                    icon={<Calendar className="text-primary" />}
                                    label="Date"
                                    value={formatToMMDDYY(event.date)}
                                />
                                <InfoRow
                                    icon={<Clock className="text-primary" />}
                                    label="Time"
                                    value={event.time}
                                />
                                <InfoRow
                                    icon={<MapPin className="text-primary" />}
                                    label="Location"
                                    value={event.location}
                                />
                            </div>
                        </div>

                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 10, rotate: 1 }}
                            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 2 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="rounded-4xl overflow-hidden border-8 border-white disney-shadow"
                        >
                            <div className="relative w-full h-[320px] sm:h-[360px]">
                                <Image
                                    src={event.image.url}
                                    alt={event.image.alt}
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </section>

            <Container className="mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Description */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="prose prose-lg max-w-none text-slate-600">
                            <Heading level={3} className="mb-6">
                                Event Description
                            </Heading>

                            <p className="text-xl leading-relaxed">{event.description}</p>

                            <p>
                                Join us for this special event! We believe in creating spaces
                                where community can thrive and faith can grow. Whether you&apos;re
                                a long-time member or visiting for the first time, you are
                                welcome here.
                            </p>

                            <p>
                                Please feel free to bring your friends and family. If you have
                                any questions regarding this event, don&apos;t hesitate to reach
                                out to our office.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl p-8 disney-shadow border-4 border-primary-soft">
                            <Heading level={4} className="mb-6">
                                Registration
                            </Heading>
                            <p className="text-slate-600 mb-6">
                                This event is free to attend, but registration helps us plan
                                better.
                            </p>

                            <Button className="w-full mb-4">Register Now</Button>

                            <Button variant="outline" className="w-full gap-2">
                                <CalendarPlus size={20} /> Add to Calendar
                            </Button>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button
                                type="button"
                                
                                className="p-4 rounded-2xl bg-white disney-shadow hover:text-primary transition-colors"
                                aria-label="Share event"
                            >
                                <Share2 />
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}