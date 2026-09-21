'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Heart,
  Sun,
  Users,
  Globe,
  Sparkles,
  BookOpen,
  Cross,
  Shield,
  
  Crown,
  Flame,
  Star,
  Quote,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Container } from '../../UI/Container';
import { Badge } from '../../UI/Badge';
import { Heading } from '../../UI/Heading';
import { Paragraph, Span } from '../../Typography/TypoGraphy';
import { GiveReasonAndMissionCard } from '../../Common/GiveReasonAndMissionCard';
import { PageContentResponse } from '@/app/Types/PageContent.types';
import { Leader } from '@/app/Types/DataTypes';
import { LeaderCard } from '../../UI/LeaderCard';
import Link from 'next/link';

type AboutClientProps = {
  content?: PageContentResponse;
  leaders: Leader[];
};

const VALUE_ICONS = [Heart, Sun, Users, Globe];

/* ---------- Core Beliefs Data (Static) ---------- */
const CORE_BELIEFS = [
  {
    id: 'salvation',
    icon: Cross,
    title: 'Salvation',
    subtitle: 'By Grace Through Faith',
    description:
      'We believe salvation is a free gift from God, received by grace through faith in Jesus Christ — not by works. Everyone who believes, repents, and confesses Jesus as Lord is saved and given eternal life.',
    verse: 'Ephesians 2:8-9',
    color: 'from-amber-500 to-orange-600',
    bg: 'from-amber-50 to-orange-50',
    accent: 'text-amber-600',
    border: 'border-amber-200',
    points: [
      'Believe in Jesus Christ as Lord & Savior',
      'Repent and turn from sin',
      'Confess Jesus with your mouth',
      'Receive eternal life by faith',
    ],
  },
  {
    id: 'trinity',
    icon: Sun,
    title: 'The Trinity',
    subtitle: 'One God, Three Persons',
    description:
      'We believe in one God eternally existing in three equal persons — God the Father, God the Son (Jesus Christ), and God the Holy Spirit. They are distinct yet perfectly one.',
    verse: 'Matthew 28:19',
    color: 'from-sky-500 to-blue-600',
    bg: 'from-sky-50 to-blue-50',
    accent: 'text-sky-600',
    border: 'border-sky-200',
    points: [
      'God the Father — Creator & Provider',
      'God the Son — Savior & Redeemer',
      'God the Holy Spirit — Comforter & Guide',
      'Three in One — equal and eternal',
    ],
  },
  {
    id: 'healing',
    icon: Heart,
    title: 'Divine Healing',
    subtitle: 'By His Wounds We Are Healed',
    description:
      'We believe Jesus paid for our healing on the cross. God still heals today through prayer, faith, and the power of the Holy Spirit — in His perfect timing and will.',
    verse: 'Isaiah 53:5',
    color: 'from-rose-500 to-pink-600',
    bg: 'from-rose-50 to-pink-50',
    accent: 'text-rose-600',
    border: 'border-rose-200',
    points: [
      'Jesus healed the sick and raised the dead',
      'Healing is provided through the cross',
      'Pray in faith in Jesus’ name',
      'Trust God’s will and timing',
    ],
  },
  {
    id: 'righteousness',
    icon: Shield,
    title: 'Righteousness',
    subtitle: 'Right With God Through Christ',
    description:
      'We believe believers are made righteous through Jesus Christ — not by their own works. God declares us righteous when we believe, and we then live righteously by His Spirit.',
    verse: '2 Corinthians 5:21',
    color: 'from-emerald-500 to-green-600',
    bg: 'from-emerald-50 to-green-50',
    accent: 'text-emerald-600',
    border: 'border-emerald-200',
    points: [
      'Imputed righteousness — a gift by faith',
      'Practical righteousness — a daily walk',
      'We are the righteousness of God in Christ',
      'Live holy by the power of the Spirit',
    ],
  },
  {
    id: 'victory-poverty',
    icon: Crown,
    title: 'Victory & Provision',
    subtitle: 'Freedom from Poverty',
    description:
      'We believe God is our provider and desires His children to walk in victory over poverty — through faith, hard work, generosity, and trust in His promises.',
    verse: 'Philippians 4:19',
    color: 'from-violet-500 to-purple-600',
    bg: 'from-violet-50 to-purple-50',
    accent: 'text-violet-600',
    border: 'border-violet-200',
    points: [
      'God supplies all your needs in Christ',
      'Seek first His kingdom and righteousness',
      'Give generously and be wise with money',
      'Believe God for breakthrough',
    ],
  },
  {
    id: 'authority',
    icon: Flame,
    title: 'Believers’ Authority',
    subtitle: 'Power in the Name of Jesus',
    description:
      'We believe every believer has been given authority by Jesus to overcome the enemy, pray in His name, and live in victory — because Christ defeated Satan on the cross.',
    verse: 'Luke 10:19',
    color: 'from-indigo-500 to-blue-700',
    bg: 'from-indigo-50 to-blue-50',
    accent: 'text-indigo-600',
    border: 'border-indigo-200',
    points: [
      'Pray in the mighty name of Jesus',
      'Resist the devil and he will flee',
      'Cast out demons and heal the sick',
      'Speak to mountains with faith',
    ],
  },
  {
    id: 'peace',
    icon:Crown,
    title: 'Peace & Victory',
    subtitle: 'Already Won on the Cross',
    description:
      'We believe every believer already has peace with God and victory in Christ. We now walk in that peace daily and enforce the victory Jesus won for us.',
    verse: 'Romans 5:1',
    color: 'from-teal-500 to-cyan-600',
    bg: 'from-teal-50 to-cyan-50',
    accent: 'text-teal-600',
    border: 'border-teal-200',
    points: [
      'Peace with God through Jesus Christ',
      'More than conquerors in Christ',
      'Victory already won on the cross',
      'Guard your peace daily by faith',
    ],
  },
];

/* ---------- "Already But Not Yet" Truth ---------- */
const ALREADY_NOT_YET = [
  { label: 'Salvation', already: true, note: 'Secured the moment you believe' },
  { label: 'Righteousness', already: true, note: 'Declared righteous in Christ' },
  { label: 'Peace with God', already: true, note: 'Given freely through Jesus' },
  { label: 'Victory in Christ', already: true, note: 'Won on the cross' },
  { label: 'Believers’ Authority', already: true, note: 'Given by Jesus Himself' },
  { label: 'Spiritual Riches', already: true, note: 'Every blessing in Christ' },
  { label: 'Healing', already: true, note: 'Purchased on the cross' },
  { label: 'Full Glory in Heaven', already: false, note: 'Coming when Jesus returns' },
];

/* ---------- Section Heading Component ---------- */
function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div
      className={
        align === 'center'
          ? 'text-center max-w-3xl mx-auto mb-14'
          : 'max-w-3xl mb-14'
      }
    >
      {eyebrow && (
        <Badge variant="accent" className="mb-4">
          {eyebrow}
        </Badge>
      )}
      <Heading level={2} className="mb-5 text-balance">
        {title}{' '}
        {highlight && (
          <Span className="text-primary relative inline-block">
            {highlight}
            <span className="absolute -bottom-1 left-0 right-0 h-1 bg-accent/30 rounded-full" />
          </Span>
        )}
      </Heading>
      {subtitle && (
        <Paragraph className="text-lg text-slate-600 leading-relaxed">
          {subtitle}
        </Paragraph>
      )}
    </div>
  );
}

/* ---------- Belief Card ---------- */
function BeliefCard({
  belief,
  index,
}: {
  belief: (typeof CORE_BELIEFS)[number];
  index: number;
}) {
  const Icon = belief.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.1 }}
      className="group relative"
    >
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${belief.bg} border ${belief.border} p-7 sm:p-9 h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-1`}
      >
        {/* Decorative glow */}
        <div
          className={`absolute -top-20 -right-20 w-56 h-56 rounded-full bg-gradient-to-br ${belief.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500`}
        />

        <div className="relative flex items-start gap-4 mb-5">
          <div
            className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${belief.color} flex items-center justify-center shadow-lg`}
          >
            <Icon className="w-7 h-7 text-white" strokeWidth={2} />
          </div>
          <div className="pt-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {belief.title}
            </h3>
            <p className={`text-sm font-semibold ${belief.accent} mt-0.5`}>
              {belief.subtitle}
            </p>
          </div>
        </div>

        <p className="relative text-slate-600 leading-relaxed mb-5">
          {belief.description}
        </p>

        <ul className="relative space-y-2.5 mb-6">
          {belief.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5">
              <CheckCircle2
                className={`w-4 h-4 mt-0.5 flex-shrink-0 ${belief.accent}`}
              />
              <span className="text-sm text-slate-700">{point}</span>
            </li>
          ))}
        </ul>

        <div
          className={`relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border ${belief.border}`}
        >
          <BookOpen className={`w-3.5 h-3.5 ${belief.accent}`} />
          <span className={`text-xs font-semibold ${belief.accent}`}>
            {belief.verse}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------- Main Component ---------- */
export default function AboutClient({ content, leaders }: AboutClientProps) {
  const heroTitle =
    content?.data.hero?.title || 'A Community Built on Faith and Love';

  const heroSubtitle =
    content?.data.hero?.subtitle ||
    'Light To The Nations Emanuel Church began with a simple vision: to create a place where the light of Christ shines through every person, reaching out to all nations with compassion and hope.';

  const missionText =
    content?.data.about?.mission ||
    'This is the main content for the about page. You can edit this in the admin panel.';

  const missionImage = content?.data.about?.missionImage?.url || '';

  const mergedValues = content?.data.about?.missionContent?.map((item, index) => ({
    icon: VALUE_ICONS[index % VALUE_ICONS.length],
    title: item?.missionTitle,
    description: item?.missionDescription,
  }));

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <main className="overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section
        className="relative bg-gradient-to-b from-primary-soft via-white to-white pt-20 pb-24 -mt-12 overflow-hidden"
        aria-labelledby="about-hero-title"
      >
        {/* Decorative elements */}
        <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-40 -right-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.03)_1px,transparent_0)] [background-size:32px_32px]" />

        <Container>
          <motion.div style={{ y: heroY }} className="relative max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="accent" className="mb-6">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Our Story & Beliefs
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Heading level={1} className="mb-6 text-balance" id="about-hero-title">
                {heroTitle.includes('Faith') || heroTitle.includes('Love') ? (
                  <>
                    {heroTitle.replace('Faith', '').replace('Love', '').trim()}{' '}
                    {heroTitle.includes('Faith') && (
                      <Span className="text-primary">Faith</Span>
                    )}{' '}
                    {heroTitle.includes('Love') && (
                      <Span className="text-accent">Love</Span>
                    )}
                  </>
                ) : (
                  heroTitle
                )}
              </Heading>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paragraph className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                {heroSubtitle}
              </Paragraph>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {['Grace', 'Faith', 'Love', 'Hope', 'Victory'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ================= MISSION ================= */}
      <section className="py-24 bg-white" aria-labelledby="mission-title">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-4xl overflow-hidden border-8 border-white shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-700">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={missionImage || 'https://picsum.photos/seed/mission/800/600'}
                    alt="Our church community together"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-8 -left-4 sm:-left-8 bg-white rounded-2xl shadow-2xl p-5 border border-slate-100 hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                    <Star className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">10+</div>
                    <div className="text-xs text-slate-500 font-medium">
                      Years of Ministry
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              <div>
                <Badge variant="accent" className="mb-4">
                  Our Mission
                </Badge>
                <Heading level={2} id="mission-title" className="mb-6">
                  Reaching the Nations with{' '}
                  <Span className="text-primary">Light</Span> &{' '}
                  <Span className="text-accent">Love</Span>
                </Heading>
                <Paragraph className="text-lg text-slate-600 leading-relaxed">
                  {missionText}
                </Paragraph>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {mergedValues?.map((item, key) => {
                  const Icon = item.icon;
                  return (
                    <GiveReasonAndMissionCard
                      title={item.title || ''}
                      Icon={Icon}
                      desc={item.description?.slice(0, 100) || ''}
                      key={key}
                    />
                  );
                })}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ================= CORE BELIEFS ================= */}
      <section
        className="relative py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
        aria-labelledby="beliefs-title"
      >
        {/* Decorative background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl -z-0" />

        <Container>
          <div className="relative">
            <SectionHeading
              eyebrow="What We Believe"
              title="Our Core"
              highlight="Beliefs"
              subtitle="Everything we teach and live by is rooted in Scripture. These are the foundational truths that shape our faith, our church, and our walk with God."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {CORE_BELIEFS.map((belief, index) => (
                <BeliefCard key={belief.id} belief={belief} index={index} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ================= ALREADY BUT NOT YET ================= */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:32px_32px]" />

        <Container>
          <div className="relative">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <Badge
                variant="accent"
                className="mb-4 bg-white/10 text-white border-white/20"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                The Believer's Inheritance
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 text-balance">
                Already, But{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                  Not Yet
                </span>
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                Jesus has already purchased everything for believers on the
                cross. We now receive it by faith — and one day we will see it
                fully in His presence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ALREADY_NOT_YET.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="group relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.already ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        item.already ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {item.already ? 'Already' : 'Not Yet'}
                    </span>
                  </div>
                  <h3 className="text-white font-bold mb-1.5">{item.label}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.note}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 flex items-center justify-center gap-4 text-center"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/20" />
              <p className="text-sm text-slate-400 italic max-w-xl">
                "Praise be to the God and Father of our Lord Jesus Christ, who
                has blessed us in the heavenly realms with every spiritual
                blessing in Christ."
              </p>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/20" />
            </motion.div>
            <p className="text-center text-xs text-slate-500 mt-2">
              — Ephesians 1:3
            </p>
          </div>
        </Container>
      </section>

      {/* ================= SCRIPTURE QUOTE ================= */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative max-w-4xl mx-auto text-center"
          >
            <Quote className="w-12 h-12 text-primary/20 mx-auto mb-6" />
            <p className="text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-800 leading-relaxed text-balance italic">
              "For God so loved the world that He gave His one and only Son,
              that whoever believes in Him shall not perish but have eternal
              life."
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-slate-300" />
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                John 3:16
              </span>
              <div className="w-12 h-px bg-slate-300" />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ================= PASTORS ================= */}
      <section
        className="py-24 bg-gradient-to-b from-white to-slate-50"
        aria-labelledby="pastors-title"
      >
        <Container>
          <SectionHeading
            eyebrow="Our Leadership"
            title="Meet Our"
            highlight="Pastors"
            subtitle="Dedicated leaders who serve our community with joy, faith, and a heart for the nations."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {leaders.map((leader, index) => (
              <motion.div
                key={leader._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <LeaderCard leader={leader} />
              </motion.div>
            ))}
            {!leaders.length && (
              <div className="col-span-full text-center text-slate-500 py-10">
                No leaders found.
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ================= CTA ================= */}
      <section className="pb-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-4xl overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 p-10 sm:p-16 text-center"
          >
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <Badge
                variant="accent"
                className="mb-5 bg-white/15 text-white border-white/25"
              >
                Join Us
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 text-balance">
                Be Part of Our Story
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                Whether you're seeking, believing, or growing — there's a place
                for you at Light To The Nations Emmanuel Church.
              </p>
              <Link
                href="/pages/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-primary font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}