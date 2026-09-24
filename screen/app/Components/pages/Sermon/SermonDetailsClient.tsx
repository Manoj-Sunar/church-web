'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
    Calendar,
    User,
    ArrowLeft,
    Play,
    Download,
    Share2,
    BookOpen,
    Clock,
    Heart,
    Quote,
    Sparkles,
    ChevronRight,
    MessageCircle,
    Facebook,
    Twitter,
    LinkIcon,
    CheckCircle2,
    Headphones,
    FileText,
    Users,
    MapPin,
    Phone,
    Mail,
    Star,
    Eye,
    ThumbsUp,
} from 'lucide-react';
import { Container } from '../../UI/Container';
import { Heading } from '../../UI/Heading';
import { LinkButton } from '../../UI/Button/LinkButton';
import { Button } from '../../UI/Button/Button';
import { Card } from '../../UI/Card';
import { Sermon } from '@/app/Types/DataTypes';
import { getYouTubeId, getYouTubeThumbnail } from '@/app/utils/utilityFunction';

interface Isermon {
    sermon: Sermon;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------------------------------- STATIC CONTENT ---------------------------------- */

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}

const keyTakeaways = [
    {
        icon: BookOpen,
        title: 'Rooted in Scripture',
        description:
            'Every message is grounded in the Word of God, carefully expounded and applied to everyday life.',
    },
    {
        icon: Heart,
        title: 'Practical Application',
        description:
            'You will walk away with clear, actionable steps to apply biblical truth in your daily walk with Christ.',
    },
    {
        icon: Sparkles,
        title: 'Spirit-Led Teaching',
        description:
            'Prayerfully prepared and delivered under the guidance of the Holy Spirit for maximum impact.',
    },
    {
        icon: Users,
        title: 'For Every Believer',
        description:
            'Whether you are a new believer or have walked with Christ for decades, this message is for you.',
    },
];

const discussionQuestions = [
    'What stood out to you most from this message?',
    'How does this teaching challenge your current walk with God?',
    'What practical step can you take this week to apply this truth?',
    'How can you share this message with someone who needs to hear it?',
];

const relatedSermons = [
    {
        title: 'Walking in Faith During Trials',
        speaker: 'Pastor Daniel Tiruwa',
        duration: '45 min',
    },
    {
        title: 'The Power of Prayer',
        speaker: 'Pastor Daniel Tiruwa',
        duration: '38 min',
    },
    {
        title: 'Understanding God\'s Grace',
        speaker: 'Pastor Daniel Tiruwa',
        duration: '52 min',
    },
];

const sermonStats = [
    { icon: Eye, value: '12K+', label: 'Views' },
    { icon: ThumbsUp, value: '850+', label: 'Likes' },
    { icon: Clock, value: '45 min', label: 'Duration' },
    { icon: Star, value: '4.9', label: 'Rating' },
];

const topics = ['Faith', 'Grace', 'Prayer', 'Hope', 'Love', 'Salvation', 'Discipleship'];

const shareLinks = [
    { icon: Facebook, label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: MessageCircle, label: 'WhatsApp', color: 'hover:bg-green-600' },
    { icon: LinkIcon, label: 'Copy Link', color: 'hover:bg-slate-700' },
];

const churchInfo = [
    { icon: MapPin, label: 'Location', value: 'Kathmandu, Nepal' },
    { icon: Clock, label: 'Sunday Service', value: '10:00 AM' },
    { icon: Phone, label: 'Phone', value: '+977-XXXXXXXXX' },
    { icon: Mail, label: 'Email', value: 'info@danieltiruwa.com' },
];

/* ---------------------------------- MAIN COMPONENT ---------------------------------- */

export default function SermonDetailClient({ sermon }: Isermon) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [copied, setCopied] = useState(false);
    const reduceMotion = useReducedMotion();

    if (!sermon) {
        return (
            <Container className="py-32 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-slate-300" />
                </div>
                <Heading level={2} className="mb-3">Sermon Not Found</Heading>
                <p className="text-slate-500 mb-6">
                    The sermon you're looking for doesn't exist or has been removed.
                </p>
                <LinkButton href="/pages/sermons">Back to Sermons</LinkButton>
            </Container>
        );
    }

    const videoId = getYouTubeId(sermon?.videoUrl || '');
    const thumbnail = getYouTubeThumbnail(sermon?.videoUrl || '');

    const handleCopyLink = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <main className="pb-20 bg-white overflow-hidden">
            {/* VIDEO PLAYER SECTION */}
            <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-10 md:py-14">
                <Container>
                    <Link
                        href="/pages/sermons"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group"
                    >
                        <ArrowLeft
                            size={20}
                            className="group-hover:-translate-x-1 transition-transform"
                        />
                        Back to Sermons
                    </Link>

                    <div className="aspect-video w-full rounded-3xl overflow-hidden bg-black shadow-2xl shadow-primary/20 relative group ring-1 ring-white/10">
                        {!isPlaying ? (
                            <>
                                {thumbnail && (
                                    <img
                                        src={thumbnail}
                                        alt={sermon.title}
                                        className="w-full h-full object-cover opacity-75 group-hover:opacity-85 transition-opacity duration-500"
                                    />
                                )}

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                                        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                                        className="relative"
                                    >
                                        <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                                        <Button
                                            size="lg"
                                            className="relative rounded-full h-20 w-20 md:h-24 md:w-24 p-0 shadow-2xl"
                                            onClick={() => setIsPlaying(true)}
                                            aria-label="Play sermon"
                                        >
                                            <Play className="fill-white ml-1.5" size={36} />
                                        </Button>
                                    </motion.div>
                                </div>

                                {/* Bottom info overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                                    <div className="flex items-center gap-3 text-white/90 text-sm">
                                        <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                                            <Clock className="w-3.5 h-3.5" />
                                            45 min
                                        </span>
                                        <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                                            <Sparkles className="w-3.5 h-3.5" />
                                            HD Quality
                                        </span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                                title={sermon.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        )}
                    </div>

                    {/* Stats bar under video */}
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                        {sermonStats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 md:p-4 border border-white/10 flex items-center gap-3"
                            >
                                <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                                    <stat.icon className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-sm md:text-base">
                                        {stat.value}
                                    </div>
                                    <div className="text-slate-400 text-xs">
                                        {stat.label}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            <Container className="mt-14">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* MAIN CONTENT */}
                    <article className="lg:col-span-2 space-y-12">
                        {/* TITLE + META */}
                        <header>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                    <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold">
                                        <Sparkles className="w-3 h-3" />
                                        Latest Message
                                    </span>
                                    {topics.slice(0, 3).map((topic) => (
                                        <span
                                            key={topic}
                                            className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full"
                                        >
                                            #{topic}
                                        </span>
                                    ))}
                                </div>

                                <Heading level={1} className="mb-6 text-slate-800">
                                    {sermon.title}
                                </Heading>

                                <div className="flex flex-wrap items-center gap-4 md:gap-6 pb-6 border-b border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                                            <User size={20} className="text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-800 text-sm">
                                                {sermon.speaker}
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                Pastor & Teacher
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                                        <Calendar size={16} className="text-primary" />
                                        <span>{formatDate(sermon.date)}</span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setIsLiked(!isLiked)}
                                        className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full transition-all ${
                                            isLiked
                                                ? 'bg-rose-50 text-rose-600'
                                                : 'text-slate-500 hover:bg-slate-50'
                                        }`}
                                    >
                                        <Heart
                                            size={16}
                                            className={isLiked ? 'fill-rose-500 text-rose-500' : ''}
                                        />
                                        {isLiked ? 'Liked' : 'Like'}
                                    </button>
                                </div>
                            </motion.div>
                        </header>

                        {/* ABOUT MESSAGE */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-4">
                                <BookOpen className="w-3.5 h-3.5 text-primary" />
                                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                    About This Message
                                </span>
                            </div>
                            <Heading level={3} className="mb-6 text-slate-800">
                                Message Overview
                            </Heading>
                            <p className="text-lg leading-relaxed text-slate-600 mb-6">
                                {sermon.description}
                            </p>
                            <p className="leading-relaxed text-slate-600">
                                This message is part of our ongoing commitment to
                                faithfully teach the whole counsel of God. We pray
                                it strengthens your faith, deepens your love for
                                Christ, and equips you to live out the Gospel in
                                every area of your life.
                            </p>
                        </motion.section>

                        {/* KEY TAKEAWAYS */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-4">
                                <Sparkles className="w-3.5 h-3.5 text-primary" />
                                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                    Key Takeaways
                                </span>
                            </div>
                            <Heading level={3} className="mb-6 text-slate-800">
                                What You'll Learn
                            </Heading>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {keyTakeaways.map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.4 }}
                                        viewport={{ once: true }}
                                    >
                                        <Card className="p-6 h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-white">
                                            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                                <item.icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <Heading level={5} className="mb-2 text-slate-800">
                                                {item.title}
                                            </Heading>
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        {/* SCRIPTURE HIGHLIGHT */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 md:p-10 border border-primary/10"
                        >
                            <Quote className="w-10 h-10 text-primary/40 mb-5" />
                            <blockquote className="text-xl md:text-2xl font-serif text-slate-700 italic leading-relaxed mb-5">
                                "For the word of God is alive and active. Sharper
                                than any double-edged sword, it penetrates even to
                                dividing soul and spirit, joints and marrow."
                            </blockquote>
                            <cite className="text-primary font-semibold not-italic">
                                — Hebrews 4:12
                            </cite>
                        </motion.section>

                        {/* DISCUSSION QUESTIONS */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-4">
                                <MessageCircle className="w-3.5 h-3.5 text-primary" />
                                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                    Reflect & Discuss
                                </span>
                            </div>
                            <Heading level={3} className="mb-6 text-slate-800">
                                Questions for Reflection
                            </Heading>

                            <div className="space-y-3">
                                {discussionQuestions.map((question, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.08, duration: 0.4 }}
                                        viewport={{ once: true }}
                                        className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                                    >
                                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                                            {index + 1}
                                        </div>
                                        <span className="text-slate-700 leading-relaxed text-sm md:text-base">
                                            {question}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        {/* SHARE SECTION */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white"
                        >
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div>
                                    <Heading level={3} className="text-white mb-2">
                                        Share This Message
                                    </Heading>
                                    <p className="text-slate-400 text-sm">
                                        Help others discover this life-changing message.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {shareLinks.map((link, index) => (
                                        <button
                                            key={link.label}
                                            type="button"
                                            onClick={link.label === 'Copy Link' ? handleCopyLink : undefined}
                                            className={`w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${link.color} hover:scale-110`}
                                            aria-label={`Share on ${link.label}`}
                                        >
                                            {link.label === 'Copy Link' && copied ? (
                                                <CheckCircle2 className="w-5 h-5" />
                                            ) : (
                                                <link.icon className="w-5 h-5" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.section>
                    </article>

                    {/* SIDEBAR */}
                    <aside className="space-y-8">
                        {/* RESOURCES CARD */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-7 border-0 shadow-lg rounded-3xl bg-white">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Download className="w-4 h-4 text-primary" />
                                    </div>
                                    <Heading level={4} className="text-slate-800">
                                        Resources
                                    </Heading>
                                </div>

                                <div className="space-y-3">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start gap-3 rounded-xl border-slate-200 hover:bg-primary/5 hover:border-primary/40 hover:text-primary transition-all"
                                        type="button"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <Headphones size={16} className="text-primary" />
                                        </div>
                                        <span className="text-sm font-medium">Download Audio</span>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="w-full justify-start gap-3 rounded-xl border-slate-200 hover:bg-primary/5 hover:border-primary/40 hover:text-primary transition-all"
                                        type="button"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <FileText size={16} className="text-primary" />
                                        </div>
                                        <span className="text-sm font-medium">Sermon Notes (PDF)</span>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="w-full justify-start gap-3 rounded-xl border-slate-200 hover:bg-primary/5 hover:border-primary/40 hover:text-primary transition-all"
                                        type="button"
                                        onClick={handleCopyLink}
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <Share2 size={16} className="text-primary" />
                                        </div>
                                        <span className="text-sm font-medium">
                                            {copied ? 'Link Copied!' : 'Share Message'}
                                        </span>
                                    </Button>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <div className="text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">
                                        Topics
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {topics.map((topic) => (
                                            <span
                                                key={topic}
                                                className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors cursor-pointer"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* JOIN US IN PERSON */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-7 border-0 shadow-lg rounded-3xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 relative overflow-hidden">
                                <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-200/30 rounded-full" />
                                <div className="relative">
                                    <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center mb-4 shadow-lg">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                    <Heading level={4} className="mb-3 text-slate-800">
                                        Join Us In Person
                                    </Heading>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-5">
                                        Experience worship, teaching, and fellowship
                                        with our church family. We'd love to have you.
                                    </p>

                                    <div className="space-y-3 mb-6">
                                        {churchInfo.slice(0, 2).map((info) => (
                                            <div
                                                key={info.label}
                                                className="flex items-center gap-3 text-sm"
                                            >
                                                <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                                                    <info.icon className="w-3.5 h-3.5 text-emerald-600" />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-slate-400 font-semibold">
                                                        {info.label}
                                                    </div>
                                                    <div className="text-slate-700 font-medium text-xs">
                                                        {info.value}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Link href="/contact">
                                        <Button className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg">
                                            Plan Your Visit
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        </motion.div>

                        {/* RELATED SERMONS */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-7 border-0 shadow-lg rounded-3xl bg-white">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Play className="w-4 h-4 text-primary" />
                                        </div>
                                        <Heading level={4} className="text-slate-800">
                                            Related Sermons
                                        </Heading>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {relatedSermons.map((item, index) => (
                                        <Link
                                            key={index}
                                            href="/pages/sermons"
                                            className="group flex items-start gap-3 p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors"
                                        >
                                            <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0 group-hover:from-primary/30 transition-all">
                                                <Play className="w-4 h-4 text-primary fill-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-semibold text-slate-800 text-sm leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2">
                                                    {item.title}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <span>{item.speaker}</span>
                                                    <span>•</span>
                                                    <span>{item.duration}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                <Link href="/pages/sermons">
                                    <Button
                                        variant="outline"
                                        className="w-full mt-5 rounded-xl border-slate-200 text-slate-700 hover:bg-primary hover:text-white hover:border-primary transition-all"
                                    >
                                        View All Sermons
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </Link>
                            </Card>
                        </motion.div>

                        {/* NEWSLETTER CARD */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-7 border-0 shadow-lg rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-white relative overflow-hidden">
                                <div className="absolute -bottom-10 -right-10 opacity-10">
                                    <Mail size={180} className="text-white" />
                                </div>
                                <div className="relative">
                                    <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                                        <Mail className="w-5 h-5 text-white" />
                                    </div>
                                    <Heading level={4} className="text-white mb-2">
                                        Never Miss a Message
                                    </Heading>
                                    <p className="text-white/80 text-sm mb-5 leading-relaxed">
                                        Subscribe to receive new sermons and updates
                                        directly in your inbox.
                                    </p>
                                    <Button className="w-full rounded-xl bg-white text-primary hover:bg-slate-100 font-semibold">
                                        Subscribe Now
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    </aside>
                </div>
            </Container>
        </main>
    );
}