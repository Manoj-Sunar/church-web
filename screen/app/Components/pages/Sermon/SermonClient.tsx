'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Filter, Play } from 'lucide-react';
import { Container } from '../../UI/Container';
import { Heading } from '../../UI/Heading';
import { Button } from '../../UI/Button/Button';
import { Spinner } from '../../UI/Spinner';
import { Card } from '../../UI/Card';
import CommonHeroSection from '../../Common/CommonHeroSection';
import { Paragraph } from '../../Typography/TypoGraphy';
import { PageContentResponse } from '@/app/Types/PageContent.types';
import { Sermon } from '@/app/Types/DataTypes';
import { Pagination } from '@/app/Types/APIResponse';
import { getYouTubeThumbnail } from '@/app/utils/utilityFunction';


interface IsermonsProps {
    sermons: Sermon[];
    pagination: Pagination;
    content: PageContentResponse;
}




function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}





export default function SermonsClient({ sermons, content, pagination }: IsermonsProps) {

    const [searchTerm, setSearchTerm] = React.useState('');
    const [isLoading, setIsloading] = React.useState(false);






    return (
        <main className="py-12 space-y-12">
            {/* Header */}
            <CommonHeroSection className='h-100' heading={content?.data.hero?.title || ""} paragraph={content?.data.hero?.subtitle || ""}  backgroundImage={content?.data?.hero?.image?.url}/>

            <Container>
                {/* Search + Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-12">
                    <div className="relative flex-grow">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            size={20}
                            aria-hidden="true"
                        />
                        <input
                            type="search"
                            inputMode="search"
                            placeholder="Search by title or speaker..."
                            className="w-full pl-12 pr-4 py-4 rounded-3xl border-4 border-white disney-shadow focus:outline-none focus:ring-4 focus:ring-primary/20"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search sermons"
                        />
                    </div>

                    {/* Filter button is placeholder (no filter logic yet) */}
                    <Button variant="outline" className="flex items-center gap-2" type="button">
                        <Filter size={20} aria-hidden="true" /> Filters
                    </Button>
                </div>

                {/* Loading */}
                {isLoading ? <Spinner /> : null}

                {/* Grid */}
                {!isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sermons.map((sermon) => (
                            <motion.div
                                key={sermon._id}
                                whileHover={{ y: -6 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                                className="h-full"
                            >
                                <Link href={`/pages/sermons/${sermon._id}`} className="block h-full">
                                    <Card className="group p-0 overflow-hidden h-full flex flex-col">
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={`${getYouTubeThumbnail(sermon?.videoUrl || "")}`}
                                                alt={sermon.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Play className="text-white fill-white" size={24} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 flex-grow flex flex-col">

                                            <Heading level={4} className="mb-2 group-hover:text-primary transition-colors">
                                                {sermon.title}
                                            </Heading>

                                            <Paragraph className="text-sm text-slate-500 mb-4 font-bold">{sermon.speaker}</Paragraph>

                                            <Paragraph className="text-slate-600 text-sm line-clamp-2 mb-4">
                                                {sermon.description}
                                            </Paragraph>

                                            <div className="mt-auto pt-4 border-t border-slate-100 text-xs text-slate-400 font-bold">
                                                {formatDate(sermon.date)}
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : null}

                {/* Empty state */}
                {!isLoading && sermons.length === 0 ? (
                    <div className="text-center py-20">
                        <Heading level={3} className="text-slate-400">
                            No sermons found matching your search.
                        </Heading>
                        <Button
                            variant="ghost"
                            type="button"
                            onClick={() => setSearchTerm('')}
                            className="mt-4"
                        >
                            Clear search
                        </Button>
                    </div>
                ) : null}
            </Container>
        </main>
    );
}