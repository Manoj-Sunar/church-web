"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Play,
  Users,
  HandHelping,
  Heart,
  Sun,
  Globe,
  Sparkles,
  ArrowRight,
  BookOpen,
  Calendar,
  MapPin,
  Clock,
  Quote,
  Star,
  Cross,
  Flame,
  Shield,
  Crown,
  Church,
  Music,
  Mic2,
  Baby,
  HandHeart,
  User,
} from "lucide-react";

import { Container } from "../../UI/Container";
import { Badge } from "../../UI/Badge";
import { Heading } from "../../UI/Heading";
import { Button } from "../../UI/Button/Button";
import { Card } from "../../UI/Card";
import { Paragraph, Span } from "../../Typography/TypoGraphy";
import { Ministry, Sermon } from "@/app/Types/DataTypes";
import { PageContentResponse } from "@/app/Types/PageContent.types";
import { MinistriesGrid } from "../Ministry/MinistryClient";
import { GiveReasonAndMissionCard } from "../../Common/GiveReasonAndMissionCard";
import {
  getYouTubeId,
  getYouTubeThumbnail,
} from "@/app/utils/utilityFunction";

type Analytics = {
  totalMembers: number;
  totalSermons: number;
  totalMinistries: number;
};

type Mission = {
  missionTitle?: string;
  missionDescription?: string;
};

interface IHomeViewProps {
  content: PageContentResponse;
  ministry: Ministry[];
  analytics: Analytics;
  mission: Mission[];
  sermons: Sermon[];
}

const VALUE_ICONS = [Heart, Sun, Users, Globe];

/* ---------- Core Beliefs Preview ---------- */
const CORE_BELIEFS_PREVIEW = [
  {
    icon: Cross,
    title: "Salvation",
    desc: "By grace through faith in Jesus Christ",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Sun,
    title: "The Trinity",
    desc: "One God — Father, Son & Holy Spirit",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Heart,
    title: "Divine Healing",
    desc: "By His wounds, we are healed",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Shield,
    title: "Righteousness",
    desc: "Right with God through Christ",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: Crown,
    title: "Victory & Provision",
    desc: "God supplies all your needs",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Flame,
    title: "Believers' Authority",
    desc: "Power in the name of Jesus",
    color: "from-indigo-500 to-blue-700",
  },
];

/* ---------- Service Times ---------- */
const SERVICE_TIMES = [
  {
    day: "Sunday Worship",
    time: "10:00 AM & 12:00 AM",
    desc: "Join us for praise, word, and fellowship",
    icon: Church,
  },
  {
    day: "Friday Prayer",
    time: "4:30 PM",
    desc: "Mid-week prayer and intercession",
    icon: Flame,
  },
  {
    day: "Friday Youth",
    time: "4:30 PM",
    desc: "Youth gathering, worship & word",
    icon: Music,
  },
];

/* ---------- Testimonies ---------- */
const TESTIMONIES = [
  {
    name: "Sarah K.",
    role: "Member since 2018",
    quote:
      "This church became my family. Through every season, God's love has been real through this community.",
  },
  {
    name: "Ramesh T.",
    role: "Youth Leader",
    quote:
      "The teaching here transformed my life. I found purpose, peace, and a calling I never knew I had.",
  },
  {
    name: "Priya M.",
    role: "Worship Team",
    quote:
      "Every service feels like coming home. The presence of God is truly here among us.",
  },
];

/* ---------- Section Heading Helper ---------- */
function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={
        align === "center"
          ? "text-center max-w-3xl mx-auto mb-14"
          : "max-w-3xl mb-14"
      }
    >
      {eyebrow && (
        <Badge variant="accent" className="mb-4">
          {eyebrow}
        </Badge>
      )}
      <Heading level={2} className="mb-5 text-balance">
        {title}{" "}
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

export default function HomeView({
  content,
  ministry,
  analytics,
  mission,
  sermons,
}: IHomeViewProps) {
  // Safe defaults
  const heroTitle =
    content?.data.hero?.title ||
    "Welcome to Light To The Nations Emanuel Church";
  const heroSubtitle =
    content?.data.hero?.subtitle ||
    "Join us in our mission to share the love of Christ and build a community where everyone belongs.";
  const heroImage =
    content?.data.hero?.image?.url ||
    "https://picsum.photos/seed/church-hero/800/600";
  const heroAlt =
    content?.data.hero?.image?.alt ||
    "A joyful church community gathered together";
  const mainText =
    content?.data.main?.text ||
    "Join us in our mission to share the love of Christ and build a community where everyone belongs.";

  const activeAnalytics = React.useMemo(() => {
    return [
      { icon: Users, label: "Active Members", value: analytics.totalMembers },
      { icon: Play, label: "Sermons Shared", value: analytics.totalSermons },
      {
        icon: HandHelping,
        label: "Active Ministries",
        value: analytics.totalMinistries,
      },
    ];
  }, [analytics]);

  const mergedValues = mission?.map((item, index) => {
    return {
      icon: VALUE_ICONS[index % VALUE_ICONS.length],
      title: item?.missionTitle,
      description: item?.missionDescription,
    };
  });

  // ---------- Sermon playback state ----------
  const [playingSermonId, setPlayingSermonId] = React.useState<string | null>(
    null
  );

  // Safe array guard — prevents .map crash if API returns undefined
  const safeSermons = React.useMemo(
    () => (Array.isArray(sermons) ? sermons : []),
    [sermons]
  );

  // Reset playing sermon when component unmounts
  React.useEffect(() => {
    return () => setPlayingSermonId(null);
  }, []);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <main className="overflow-x-hidden">
      {/* ============================================================ */}
      {/* HERO                                                          */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden bg-gradient-to-b from-primary-soft via-white to-white pt-20 pb-28"
        aria-labelledby="home-hero-title"
      >
        {/* Decorative */}
        <div className="absolute top-20 -left-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.03)_1px,transparent_0)] [background-size:32px_32px]" />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Badge variant="accent" className="mb-6">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Welcome to our family
              </Badge>

              <Heading
                level={1}
                className="mb-6 text-balance"
                id="home-hero-title"
              >
                {heroTitle}
              </Heading>

              <Paragraph className="text-xl text-slate-600 mb-8 leading-relaxed">
                {heroSubtitle}
              </Paragraph>

              <div className="flex flex-wrap gap-4 mb-10">
                <Button variant="primary" size="lg">
                  <Link href="/pages/sermons">
                    Watch Latest Sermon
                    <Play className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/pages/about">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-primary to-accent"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    {analytics.totalMembers}+ members
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    Loved by our community
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, type: "spring" }}
              className="relative"
              style={{ y: heroY }}
            >
              <div className="relative z-10 rounded-4xl overflow-hidden border-8 border-white shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={heroImage}
                    alt={heroAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  {/* Overlay play button */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <Link
                    href="/pages/sermons"
                    className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full pr-5 pl-2 py-2 shadow-lg hover:scale-105 transition-transform"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">
                      Watch Now
                    </span>
                  </Link>
                </div>
              </div>

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-6 -left-4 sm:-left-8 bg-white rounded-2xl shadow-2xl p-4 border border-slate-100 hidden sm:flex items-center gap-3 z-20"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    Spirit-Filled
                  </div>
                  <div className="text-xs text-slate-500">Worship & Word</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* STATS                                                         */}
      {/* ============================================================ */}
      <section
        aria-labelledby="home-stats-title"
        className="-mt-16 relative z-20"
      >
        <Container>
          <Heading id="home-stats-title" className="sr-only">
            Church highlights
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeAnalytics.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="group flex flex-col items-center text-center p-8 bg-white border border-slate-100 hover:border-primary/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div
                    className="bg-primary-soft p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    <stat.icon className="text-primary h-8 w-8" />
                  </div>
                  <Heading level={3} className="mb-2 text-4xl">
                    {stat.value}+
                  </Heading>
                  <p className="text-slate-500 font-semibold">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* CORE BELIEFS PREVIEW                                          */}
      {/* ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-white via-slate-50 to-white">
        <Container>
          <SectionHeading
            eyebrow="What We Believe"
            title="Rooted in"
            highlight="Scripture"
            subtitle="Our faith is built on timeless biblical truths that shape everything we do — from how we worship, to how we love, to how we serve."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {CORE_BELIEFS_PREVIEW.map((belief, index) => {
              const Icon = belief.icon;
              return (
                <motion.div
                  key={belief.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="group relative"
                >
                  <div className="relative h-full rounded-3xl bg-white border border-slate-100 p-7 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                    <div
                      className={`absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br ${belief.color} opacity-[0.07] blur-2xl group-hover:opacity-[0.15] transition-opacity`}
                    />
                    <div
                      className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${belief.color} flex items-center justify-center shadow-lg mb-5`}
                    >
                      <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="relative text-xl font-bold text-slate-900 mb-2">
                      {belief.title}
                    </h3>
                    <p className="relative text-sm text-slate-600 leading-relaxed">
                      {belief.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg">
              <Link href="/pages/about">
                Explore All Beliefs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* SERVICE TIMES                                                 */}
      {/* ============================================================ */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:32px_32px]" />

        <Container className="relative">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge
              variant="accent"
              className="mb-4 bg-white/10 text-white border-white/20"
            >
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              Join Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 text-balance">
              Gather With Us in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                Worship
              </span>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              There's a place for you here. Come as you are — leave
              transformed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SERVICE_TIMES.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.day}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-7 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {service.day}
                  </h3>
                  <div className="flex items-center gap-2 text-accent text-sm font-semibold mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    {service.time}
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {service.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span>Pokhara, Nepal</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-600" />
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              <span>All are welcome</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* MINISTRIES                                                    */}
      {/* ============================================================ */}
      {ministry.length > 0 && (
        <section className="py-24 bg-white">
          <Container>
            <SectionHeading
              eyebrow="Get Involved"
              title="Our"
              highlight="Ministries"
              subtitle="Discover the many ways you can grow, serve, and connect at Light To The Nations Emmanuel Church."
            />

            <MinistriesGrid ministries={ministry} />

            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                <Link href="/pages/ministries">
                  View All Ministries
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* ============================================================ */}
      {/* FEATURED SERMONS — INLINE PLAY                                */}
      {/* ============================================================ */}
      {safeSermons.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
          <Container>
            <SectionHeading
              eyebrow="Listen & Grow"
              title="Latest"
              highlight="Sermons"
              subtitle="Be encouraged by powerful, Bible-based messages that speak to everyday life."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {safeSermons.map((sermon, index) => {
                const videoId = getYouTubeId(sermon?.videoUrl || "");
                const thumbnail = getYouTubeThumbnail(sermon?.videoUrl || "");
                const sermonKey = sermon._id ?? sermon.slug ?? String(index);
                const isPlaying = playingSermonId === sermonKey;

                return (
                  <motion.div
                    key={sermonKey}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                      {/* ---- Video / Thumbnail Area ---- */}
                      <div className="relative aspect-video bg-slate-900 overflow-hidden">
                        {isPlaying && videoId ? (
                          <iframe
                            className="absolute inset-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                            title={sermon.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              videoId ? setPlayingSermonId(sermonKey) : null
                            }
                            aria-label={`Play sermon: ${sermon.title}`}
                            className="absolute inset-0 w-full h-full cursor-pointer"
                          >
                            {thumbnail ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={thumbnail}
                                alt={sermon.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                <Play className="w-10 h-10 text-white/60" />
                              </div>
                            )}

                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                            {/* Play button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-6 h-6 text-primary fill-primary ml-1" />
                              </div>
                            </div>

                            {/* Slug badge */}
                            {sermon.slug && (
                              <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary">
                                  {sermon.slug}
                                </span>
                              </div>
                            )}
                          </button>
                        )}
                      </div>

                      {/* ---- Info ---- */}
                      <div className="p-6">
                        <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {sermon.title}
                        </h3>
                        <p className="text-sm text-slate-500 mb-3 flex items-center gap-2">
                          <User className="w-3.5 h-3.5" />
                          {sermon.speaker}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {sermon.date
                              ? new Date(sermon.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )
                              : "Recent"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Button variant="primary" size="lg">
                <Link href="/pages/sermons">
                  Browse All Sermons
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* ============================================================ */}
      {/* MISSION — WHY WE EXIST                                        */}
      {/* ============================================================ */}
      <section className="py-24 bg-white">
        <Container>
          <SectionHeading
            eyebrow="Our Mission"
            title="Why We"
            highlight="Exist"
            subtitle={mainText}
          />

          <div className="relative rounded-4xl bg-gradient-to-br from-primary-soft via-white to-accent-soft/30 p-10 sm:p-14 border border-primary/10 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {mergedValues?.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <GiveReasonAndMissionCard
                      title={item.title || ""}
                      desc={item.description || ""}
                      Icon={Icon}
                      className="bg-white/80 backdrop-blur-sm h-full"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* TESTIMONIES                                                   */}
      {/* ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <SectionHeading
            eyebrow="Lives Changed"
            title="Stories of"
            highlight="Faith"
            subtitle="Real people, real encounters with God's love and grace in our church family."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIES.map((testimony, index) => (
              <motion.div
                key={testimony.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-3xl bg-white border border-slate-100 p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-slate-700 leading-relaxed mb-6 italic">
                  "{testimony.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                    {testimony.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">
                      {testimony.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {testimony.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* SCRIPTURE QUOTE                                               */}
      {/* ============================================================ */}
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

      {/* ============================================================ */}
      {/* FINAL CTA                                                     */}
      {/* ============================================================ */}
      <section className="pb-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-4xl overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 p-10 sm:p-16 text-center"
          >
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:24px_24px]" />

            <div className="relative">
              <Badge
                variant="accent"
                className="mb-5 bg-white/15 text-white border-white/25"
              >
                <HandHeart className="w-3.5 h-3.5 mr-1.5" />
                Come As You Are
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 text-balance">
                Your Story Isn't Over
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                Whether you're seeking, believing, or growing — there's a place
                for you at Light To The Nations Emmanuel Church. Come and be
                part of what God is doing.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 shadow-lg"
                >
                  <Link href="/pages/contact">
                    Plan Your Visit
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white hover:bg-white/10"
                >
                  <Link href="/pages/sermons">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Sermons
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}