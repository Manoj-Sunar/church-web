'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Play, 
  BookOpen, 
  Heart, 
  Users, 
  Music, 
  Globe, 
  Sparkles,
  Quote,
  Clock,
  Calendar,
  ChevronRight,
  Headphones,
  Video,
  Share2,
  Bell
} from 'lucide-react';
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

// Static Content Data
const sermonCategories = [
  {
    icon: BookOpen,
    title: 'Bible Study',
    description: 'Deep dive into Scripture with verse-by-verse teachings',
    count: '45+ Messages',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Heart,
    title: 'Faith & Encouragement',
    description: 'Messages to strengthen your walk with God',
    count: '38+ Messages',
    color: 'from-rose-500 to-rose-600',
  },
  {
    icon: Users,
    title: 'Family & Relationships',
    description: 'Biblical principles for godly living',
    count: '27+ Messages',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Music,
    title: 'Worship & Praise',
    description: 'Understanding the heart of worship',
    count: '19+ Messages',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Globe,
    title: 'Missions & Evangelism',
    description: 'Sharing the Gospel to the nations',
    count: '23+ Messages',
    color: 'from-amber-500 to-amber-600',
  },
  {
    icon: Sparkles,
    title: 'Spiritual Growth',
    description: 'Maturing in Christ and bearing fruit',
    count: '34+ Messages',
    color: 'from-cyan-500 to-cyan-600',
  },
];


const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Kathmandu',
    text: 'These sermons have transformed my understanding of God\'s love. I listen every morning before work.',
    verse: 'Psalm 119:105',
  },
  {
    name: 'David K.',
    location: 'Pokhara',
    text: 'Pastor Daniel\'s teachings have helped me grow spiritually more than anything else. Truly blessed.',
    verse: '2 Timothy 3:16',
  },
  {
    name: 'Priya S.',
    location: 'Lalitpur',
    text: 'I share these messages with my family every week. They bring peace and hope to our home.',
    verse: 'Romans 10:17',
  },
];

const topics = [
  'Faith', 'Grace', 'Prayer', 'Love', 'Hope', 'Salvation', 
  'Forgiveness', 'Worship', 'Healing', 'Peace', 'Joy', 'Wisdom',
  'Patience', 'Kindness', 'Humility', 'Holiness', 'Obedience', 'Trust',
];

const stats = [
  { value: '200+', label: 'Sermons Available', icon: Video },
  { value: '50K+', label: 'Monthly Listeners', icon: Users },
  { value: '15+', label: 'Years of Ministry', icon: Clock },
  { value: '120+', label: 'Countries Reached', icon: Globe },
];

const howToListen = [
  {
    step: '01',
    title: 'Watch Online',
    description: 'Stream sermons directly from our website or YouTube channel anytime.',
    icon: Video,
  },
  {
    step: '02',
    title: 'Listen Anywhere',
    description: 'Download audio versions to listen during your commute or quiet time.',
    icon: Headphones,
  },
  {
    step: '03',
    title: 'Share & Discuss',
    description: 'Share messages with friends and family for meaningful discussions.',
    icon: Share2,
  },
  {
    step: '04',
    title: 'Subscribe for Updates',
    description: 'Get notified when new sermons are uploaded to stay connected.',
    icon: Bell,
  },
];

export default function SermonsClient({ sermons, content, pagination }: IsermonsProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const filteredSermons = React.useMemo(() => {
    if (!searchTerm) return sermons;
    const term = searchTerm.toLowerCase();
    return sermons.filter(
      (s) =>
        s.title.toLowerCase().includes(term) ||
        s.speaker?.toLowerCase().includes(term) ||
        s.description?.toLowerCase().includes(term)
    );
  }, [sermons, searchTerm]);

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <CommonHeroSection
        className="h-100"
        heading={content?.data.hero?.title || 'Sermons & Bible Teachings'}
        paragraph={content?.data.hero?.subtitle || 'Grow in your faith with powerful, Spirit-filled messages from the Word of God'}
        backgroundImage={content?.data?.hero?.image?.url}
      />

      {/* Stats Bar */}
      <section className="relative -mt-8 z-10">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl md:text-3xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Scripture Banner */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <Quote className="w-12 h-12 mx-auto mb-6 text-primary/40" />
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif text-slate-700 italic leading-relaxed mb-6">
              "Faith comes by hearing, and hearing by the word of God."
            </blockquote>
            <cite className="text-primary font-semibold text-lg not-italic">— Romans 10:17</cite>
          </motion.div>
        </Container>
      </section>

      {/* Browse by Category */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="text-center mb-14">
            <Heading level={2} className="mb-4">Browse by Category</Heading>
            <Paragraph className="text-slate-500 max-w-2xl mx-auto">
              Explore our sermon library organized by topics to find exactly what you need for your spiritual journey.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sermonCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <Card className="p-6 h-full bg-white hover:shadow-xl transition-all duration-300 border-0">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-5 shadow-lg`}>
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <Heading level={4} className="mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </Heading>
                  <Paragraph className="text-slate-500 text-sm mb-4">
                    {category.description}
                  </Paragraph>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {category.count}
                    </span>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

    

      {/* Latest Sermons Section */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">Latest Sermons</Heading>
            <Paragraph className="text-slate-500 max-w-2xl mx-auto">
              Watch our most recent messages and stay connected with what God is speaking to our church.
            </Paragraph>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-3xl mx-auto">
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
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search sermons"
              />
            </div>

            <Button variant="outline" className="flex items-center gap-2 py-4 px-6 rounded-2xl" type="button">
              <Filter size={20} aria-hidden="true" /> Filters
            </Button>
          </div>

          {/* Loading */}
          {isLoading ? <Spinner /> : null}

          {/* Grid */}
          {!isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSermons.map((sermon, index) => (
                <motion.div
                  key={sermon._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <Link href={`/pages/sermons/${sermon._id}`} className="block h-full">
                    <Card className="group p-0 overflow-hidden h-full flex flex-col border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={`${getYouTubeThumbnail(sermon?.videoUrl || '')}`}
                          alt={sermon.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl scale-75 group-hover:scale-100">
                            <Play className="text-primary fill-primary ml-1" size={28} />
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 flex items-center gap-2">
                          <span className="bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {formatDate(sermon.date)}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-grow flex flex-col">
                        <Heading level={4} className="mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {sermon.title}
                        </Heading>

                        <Paragraph className="text-sm text-slate-500 mb-4 font-semibold flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {sermon.speaker}
                        </Paragraph>

                        <Paragraph className="text-slate-600 text-sm line-clamp-2 mb-4 flex-grow">
                          {sermon.description}
                        </Paragraph>

                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs text-slate-400 font-medium">
                            {formatDate(sermon.date)}
                          </span>
                          <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                            Watch Now <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : null}

          {/* Empty state */}
          {!isLoading && filteredSermons.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
                <Search className="w-10 h-10 text-slate-300" />
              </div>
              <Heading level={3} className="text-slate-400 mb-2">
                No sermons found
              </Heading>
              <Paragraph className="text-slate-400 mb-6">
                Try adjusting your search terms
              </Paragraph>
              <Button
                variant="outline"
                type="button"
                onClick={() => setSearchTerm('')}
              >
                Clear search
              </Button>
            </div>
          ) : null}
        </Container>
      </section>

      {/* Popular Topics */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">Popular Topics</Heading>
            <Paragraph className="text-slate-500 max-w-2xl mx-auto">
              Find sermons on the topics that matter most to your spiritual journey.
            </Paragraph>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {topics.map((topic, index) => (
              <motion.button
                key={topic}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 bg-white border-2 border-slate-200 rounded-full text-slate-600 font-medium hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
              >
                {topic}
              </motion.button>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <div className="text-center mb-14">
            <Heading level={2} className="mb-4">What Listeners Are Saying</Heading>
            <Paragraph className="text-slate-500 max-w-2xl mx-auto">
              Hear from people whose lives have been touched by these messages.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full border-0 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <Paragraph className="text-slate-600 mb-6 italic leading-relaxed">
                    "{testimonial.text}"
                  </Paragraph>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <div className="font-semibold text-slate-800">{testimonial.name}</div>
                      <div className="text-sm text-slate-400">{testimonial.location}</div>
                    </div>
                    <span className="text-xs text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                      {testimonial.verse}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* How to Listen */}
      <section className="py-20 bg-slate-900 text-white">
        <Container>
          <div className="text-center mb-14">
            <Heading level={2} className="mb-4 text-white">How to Listen</Heading>
            <Paragraph className="text-slate-400 max-w-2xl mx-auto">
              Multiple ways to access these life-changing messages wherever you are.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howToListen.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-6xl font-bold text-white/5 absolute -top-4 -left-2">
                  {item.step}
                </div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-5">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Heading level={4} className="mb-2 text-white">{item.title}</Heading>
                  <Paragraph className="text-slate-400 text-sm">
                    {item.description}
                  </Paragraph>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-white/80" />
            <Heading level={2} className="mb-4 text-white">
              Never Miss a Message
            </Heading>
            <Paragraph className="text-white/80 mb-8 text-lg">
              Subscribe to receive notifications when new sermons are uploaded. Let the Word of God be your daily nourishment.
            </Paragraph>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-slate-100 px-8 py-4 text-lg font-semibold rounded-2xl">
                Subscribe Now
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-2xl">
                Browse All Sermons
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}