"use client";

import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, DollarSign, Heart, User } from "lucide-react";
import { Container } from "../../UI/Container";
import { Heading } from "../../UI/Heading";
import { Button } from "../../UI/Button/Button";
import { Card } from "../../UI/Card";

import { Paragraph, Span } from "../../Typography/TypoGraphy";
import { Ministry } from "@/app/Types/DataTypes";

interface IMinistryProps {
    ministry: Ministry;
}




const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function MinistryDetailSkeleton() {
    return (
        <div className="pb-20">
            <section className="relative h-[400px] overflow-hidden bg-slate-100 animate-pulse" />
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
                        <div className="h-72 rounded-4xl bg-slate-100 animate-pulse" />
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
        <Container className="py-20 text-center">
            <Heading level={2}>Ministry not found</Heading>
            <Link href="/pages/ministries" className="mt-4 inline-block">
                <Button variant="outline">Back to Ministries</Button>
            </Link>
        </Container>
    );
});



const Hero = memo(function Hero({ ministry }: { ministry: Ministry }) {
    return (
        <section className="relative h-[400px] overflow-hidden">
            <Image
                src={ministry.image.url}
                alt={ministry.image.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

            <Container className="absolute bottom-0 left-0 right-0 pb-12">
                <Link
                    href="/ministries"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft size={20} /> Back to Ministries
                </Link>
                <Heading level={1} className="text-white">
                    {ministry.name}
                </Heading>
            </Container>
        </section>
    );
});




const LeaderCard = memo(function LeaderCard({
    leader,
}: {
    leader: string;
}) {
    return (
        <div className="flex items-center gap-4 p-6 bg-primary-soft rounded-3xl border-4 border-white disney-shadow">
            <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-white">
                <User size={32} />
            </div>
            <div>
                <Paragraph className="text-sm text-primary font-bold uppercase tracking-wider">
                    Ministry Leader
                </Paragraph>
                <Heading level={4}>{leader}</Heading>
            </div>
        </div>
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
        <section className="bg-accent-soft rounded-4xl p-12 border-4 border-white disney-shadow relative overflow-hidden">
            <div className="relative z-10">
                <Heading level={2} className="text-accent mb-6">
                    Support Our Mission
                </Heading>
                <Paragraph className="text-lg text-slate-700 mb-8 max-w-xl">
                    Your generosity helps us continue the work of {ministryName}. Every
                    gift, no matter the size, makes a difference in the lives we serve.
                </Paragraph>
                <div className="flex flex-wrap gap-4">
                    <Button
                        variant="secondary"
                        size="lg"
                        className="bg-accent hover:bg-accent/90"
                        onClick={onDonate}
                    >
                        <Heart className="mr-2 fill-white" /> Donate Now
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        className="border-accent text-accent hover:bg-accent/10"
                    >
                        Volunteer
                    </Button>
                </div>
            </div>

            <div className="absolute -bottom-10 -right-10 opacity-10">
                <Heart size={300} className="text-accent fill-accent" />
            </div>
        </section>
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
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    const presetAmounts = useMemo(() => [25, 50, 100], []);
    const [amount, setAmount] = useState<number | "">("");

    const handleSelect = useCallback((v: number) => setAmount(v), []);
    const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setAmount(v === "" ? "" : Number(v));
    }, []);

    const canSubmit = amount !== "" && Number(amount) > 0;

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={reduceMotion ? { opacity: 1 } : { opacity: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
                    onMouseDown={(e) => {
                        // close on backdrop click
                        if (e.target === e.currentTarget) onClose();
                    }}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Donate to ${ministryName}`}
                >
                    <motion.div
                        initial={reduceMotion ? false : { scale: 0.96, opacity: 0 }}
                        animate={reduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { scale: 0.98, opacity: 0 }}
                        transition={{ duration: 0.22, ease: EASE }}
                        className="bg-white rounded-4xl p-8 max-w-md w-full disney-shadow relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
                            aria-label="Close donation modal"
                            type="button"
                        >
                            &times;
                        </button>

                        <Heading level={3} className="mb-6 text-center">
                            Support {ministryName}
                        </Heading>

                        <div className="w-full">
                            <Image src={"/qr.jpeg"} width={200} height={200} alt={"qr"} className=" w-full object-cover" />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}




export default function MinistryDetailClient({ ministry }: IMinistryProps) {
    const [showDonationModal, setShowDonationModal] = useState(false);





    const openDonate = useCallback(() => setShowDonationModal(true), []);
    const closeDonate = useCallback(() => setShowDonationModal(false), []);





    if (!ministry) return <NotFoundState />;

    return (
        <div className="pb-20">
            <Hero ministry={ministry} />

            <Container className="mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main */}
                    <div className="lg:col-span-2 space-y-8">
                        <LeaderCard leader={ministry.leader} />

                        <div className="prose prose-lg max-w-none text-slate-600">
                            <Heading level={3} className="mb-6">
                                About {ministry.name}
                            </Heading>

                            <Paragraph className="text-xl leading-relaxed mb-6">
                                {ministry.longDescription}
                            </Paragraph>

                            {/* Optional extra paragraph - keep if you want, or remove */}
                            <Paragraph>
                                We gather to grow in faith, serve with love, and build a strong
                                community. Join us as we walk together in purpose and hope.
                            </Paragraph>
                        </div>

                        <SupportCTA ministryName={ministry.name} onDonate={openDonate} />
                    </div>

                  
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