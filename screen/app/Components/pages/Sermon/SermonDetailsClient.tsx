'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    User,
    ArrowLeft,
    Play,
    Download,
    Share2,
} from 'lucide-react';
import { Container } from '../../UI/Container';
import { Heading } from '../../UI/Heading';
import { LinkButton } from '../../UI/Button/LinkButton';
import { Button } from '../../UI/Button/Button';
import { Sermon } from '@/app/Types/DataTypes';
import { getYouTubeId, getYouTubeThumbnail } from '@/app/utils/utilityFunction';

interface Isermon {
    sermon: Sermon;
}

// Helper: Format date
function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}



export default function SermonDetailClient({ sermon }: Isermon) {
    const [isPlaying, setIsPlaying] = useState(false);

    if (!sermon) {
        return (
            <Container className="py-20 text-center">
                <Heading level={2}>Sermon not found</Heading>
                <LinkButton href="/pages/sermons" className="mt-4 inline-block">
                    Back to Sermon
                </LinkButton>
            </Container>
        );
    }

    const videoId = getYouTubeId(sermon?.videoUrl || "");
    const thumbnail = getYouTubeThumbnail(sermon?.videoUrl || "");

    return (
        <main className="pb-20">
            {/* Video Player Section */}
            <section className="bg-slate-900 py-12">
                <Container>
                    <Link
                        href="/pages/sermons"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft size={20} /> Back to Sermons
                    </Link>

                    <div className="aspect-video w-full rounded-4xl overflow-hidden bg-black disney-shadow relative group">
                        {!isPlaying ? (
                            <>
                                {/* Thumbnail */}
                                {thumbnail && (
                                    <img
                                        src={thumbnail}
                                        alt={sermon.title}
                                        className="w-full h-full object-cover opacity-70"
                                    />
                                )}

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        whileHover={{ scale: 1.06 }}
                                        whileTap={{ scale: 0.96 }}
                                    >
                                        <Button
                                            size="lg"
                                            className="rounded-full h-20 w-20 p-0"
                                            onClick={() => setIsPlaying(true)}
                                        >
                                            <Play className="fill-white ml-1" size={32} />
                                        </Button>
                                    </motion.div>
                                </div>
                            </>
                        ) : (
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                title={sermon.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        )}
                    </div>
                </Container>
            </section>

            <Container className="mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main */}
                    <article className="lg:col-span-2 space-y-8">
                        <header>
                            <Heading level={1} className="mb-4 ">
                                {sermon.title}
                            </Heading>

                            <div className="flex flex-wrap gap-6 text-slate-500 font-bold">
                                <div className="flex items-center gap-2">
                                    <User size={20} className="text-primary" />
                                    <span>{sermon.speaker}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={20} className="text-primary" />
                                    <span>{formatDate(sermon.date)}</span>
                                </div>
                            </div>
                        </header>

                        <section className="prose prose-lg max-w-none text-slate-600">
                            <Heading level={3} className="mb-4">
                                About this Message
                            </Heading>
                            <p>{sermon.description}</p>
                        </section>
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        <div className="bg-white rounded-3xl p-8 disney-shadow border-4 border-primary-soft">
                            <Heading level={4} className="mb-6">
                                Resources
                            </Heading>

                            <div className="space-y-4">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-4"
                                    type="button"
                                    onClick={() => {
                                        // TODO: connect to real audio file
                                    }}
                                >
                                    <Download size={20} /> Download Audio
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-4"
                                    type="button"
                                    onClick={() => {
                                        // TODO: connect to real PDF
                                    }}
                                >
                                    <Download size={20} /> Sermon Notes (PDF)
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-4"
                                    type="button"
                                >
                                    <Share2 size={20} /> Share Message
                                </Button>
                            </div>
                        </div>

                        <div className="bg-secondary-soft rounded-3xl p-8 border-4 border-secondary/20">
                            <Heading level={4} className="mb-4 text-secondary">
                                Join us in person
                            </Heading>
                            <p className="text-slate-600 mb-6">
                                We&apos;d love to have you join us for a live service this Sunday at 10:00 AM.
                            </p>
                            <Link href="/contact">
                                <Button variant="secondary" className="w-full">
                                    Plan Your Visit
                                </Button>
                            </Link>
                        </div>
                    </aside>
                </div>
            </Container>
        </main>
    );
}