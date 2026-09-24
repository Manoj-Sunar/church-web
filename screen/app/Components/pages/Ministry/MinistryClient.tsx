"use client";

import { memo, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Users,
  BookOpen,
  Globe,
  HandHeart,
  Sparkles,
  Quote,
  ChevronRight,
  Target,
  Star,
  Clock,
  MapPin,
} from "lucide-react";
import { Card } from "../../UI/Card";
import { Heading } from "../../UI/Heading";
import { Container } from "../../UI/Container";
import { Button } from "../../UI/Button/Button";
import { LinkButton } from "../../UI/Button/LinkButton";
import CommonHeroSection from "../../Common/CommonHeroSection";
import { Paragraph } from "../../Typography/TypoGraphy";
import { Ministry } from "@/app/Types/DataTypes";
import { PageContentResponse } from "@/app/Types/PageContent.types";
import { Pagination } from "@/app/Types/APIResponse";

interface IministryProps {
  content: PageContentResponse;
  ministry: Ministry[];
  pagination: Pagination;
}

const MOTION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------------------------------- STATIC CONTENT ---------------------------------- */

const ministryPillars = [
  {
    icon: BookOpen,
    title: "Biblical Foundation",
    description:
      "Every ministry is rooted in Scripture, ensuring our service aligns with God's Word and honors His purpose for the church.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Heart,
    title: "Compassionate Service",
    description:
      "We serve with the love of Christ, meeting both spiritual and practical needs with humility, grace, and genuine care.",
    color: "from-rose-500 to-rose-600",
  },
  {
    icon: Users,
    title: "Community Building",
    description:
      "We foster meaningful connections where believers grow together, support one another, and build lasting relationships.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Globe,
    title: "Global Vision",
    description:
      "From our local community to the nations, we carry the Great Commission to make disciples of all people groups.",
    color: "from-amber-500 to-amber-600",
  },
];

const ministryStats = [
  { value: "15+", label: "Active Ministries", icon: Sparkles },
  { value: "500+", label: "Volunteers Serving", icon: Users },
  { value: "50+", label: "Villages Reached", icon: MapPin },
  { value: "25K+", label: "Lives Impacted", icon: Heart },
];

const getInvolvedSteps = [
  {
    step: "01",
    title: "Pray",
    description:
      "Seek God's guidance about where He is calling you to serve. Every ministry begins with prayer.",
    icon: Heart,
  },
  {
    step: "02",
    title: "Connect",
    description:
      "Reach out to our ministry leaders to learn more about opportunities that match your gifts and calling.",
    icon: Users,
  },
  {
    step: "03",
    title: "Serve",
    description:
      "Commit your time and talents to a ministry. Faithful service transforms both you and those you serve.",
    icon: HandHeart,
  },
  {
    step: "04",
    title: "Grow",
    description:
      "Mature in Christ as you serve alongside fellow believers, discovering the joy of Kingdom work.",
    icon: Sparkles,
  },
];

const testimonials = [
  {
    quote:
      "Serving in the children's ministry has been one of the greatest joys of my life. Seeing young hearts turn to Jesus is priceless.",
    name: "Anita R.",
    role: "Children's Ministry Volunteer",
  },
  {
    quote:
      "The village outreach transformed our community. Pastor Daniel's team brought hope and the Gospel to families who had never heard.",
    name: "Ramesh T.",
    role: "Village Ministry Partner",
  },
  {
    quote:
      "I found my purpose through the youth ministry. The mentorship and discipleship I received changed my entire life trajectory.",
    name: "Bikash S.",
    role: "Youth Ministry Member",
  },
];

const frequentlyAsked = [
  {
    question: "Who can join a ministry?",
    answer:
      "Every believer is welcome! Whether you're new to faith or have walked with Christ for decades, there is a place for you to serve according to your gifts and calling.",
  },
  {
    question: "Do I need prior experience?",
    answer:
      "No prior experience is required. We provide training, mentorship, and ongoing support to help you thrive in your ministry role.",
  },
  {
    question: "How much time is expected?",
    answer:
      "Commitment levels vary by ministry. Some serve weekly, others monthly or during special events. We work with your availability.",
  },
  {
    question: "Can I serve in multiple ministries?",
    answer:
      "Absolutely. Many of our volunteers serve in multiple areas. We encourage you to explore and find where God is leading you.",
  },
];

const scriptureBanner = {
  verse:
    "Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace in its various forms.",
  reference: "1 Peter 4:10",
};

/* ---------------------------------- SUB-COMPONENTS ---------------------------------- */

function MinistriesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl border border-slate-200 overflow-hidden bg-white"
        >
          <div className="h-64 bg-slate-100 animate-pulse" />
          <div className="p-8 space-y-4">
            <div className="h-6 w-2/3 bg-slate-100 animate-pulse rounded" />
            <div className="h-4 w-full bg-slate-100 animate-pulse rounded" />
            <div className="h-4 w-5/6 bg-slate-100 animate-pulse rounded" />
            <div className="h-10 w-full bg-slate-100 animate-pulse rounded-xl mt-6" />
          </div>
        </div>
      ))}
    </div>
  );
}

export const MinistryCard = memo(function MinistryCard({
  ministry,
  priority,
  index,
}: {
  ministry: Ministry;
  priority?: boolean;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: MOTION_EASE }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      className="h-full"
    >
      <Card className="group p-0 overflow-hidden h-full flex flex-col border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl">
        <div className="relative h-64 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={reduceMotion ? undefined : { scale: 1.08 }}
            transition={{ duration: 0.6, ease: MOTION_EASE }}
          >
            <Image
              src={ministry.image.url}
              alt={ministry.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={priority}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/0 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-bold text-primary">Active Ministry</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <Heading
              level={3}
              className="text-white text-xl md:text-2xl drop-shadow-lg group-hover:text-primary-200 transition-colors"
            >
              {ministry.name}
            </Heading>
          </div>
        </div>

        <div className="p-6 flex-grow flex flex-col">
          <p className="text-slate-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
            {ministry.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <LinkButton
              href={`/pages/ministries/${ministry._id}`}
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2 group/btn rounded-xl border-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              Learn More
              <ArrowRight
                size={16}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </LinkButton>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

export function MinistriesGrid({ ministries }: { ministries: Ministry[] }) {
  const items = useMemo(() => ministries ?? [], [ministries]);

  if (!items.length) return <MinistriesSkeleton />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((m, idx) => (
        <MinistryCard key={m._id} ministry={m} priority={idx < 2} index={idx} />
      ))}
    </div>
  );
}

/* ---------------------------------- MAIN COMPONENT ---------------------------------- */

export default function MinistriesClient({
  content,
  ministry,
  pagination,
}: IministryProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <CommonHeroSection
        heading={content?.data.hero?.title || "Our Ministries"}
        paragraph={
          content?.data.hero?.subtitle ||
          "Discover the many ways God is working through our church to reach, teach, and transform lives for His glory."
        }
      />

      {/* STATS BAR */}
      <section className="relative -mt-10 z-10">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ministryStats.map((stat, index) => (
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
              "{scriptureBanner.verse}"
            </blockquote>
            <cite className="text-primary font-semibold text-lg not-italic">
              — {scriptureBanner.reference}
            </cite>
          </motion.div>
        </Container>
      </section>

      {/* WHY MINISTRY MATTERS - PILLARS */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
                Our Foundation
              </span>
              <Heading level={2} className="mb-4">
                Why Ministry Matters
              </Heading>
              <Paragraph className="text-slate-500 max-w-2xl mx-auto">
                Ministry is the heartbeat of the church. It's how we live out our
                faith, serve one another, and bring the love of Christ to a
                hurting world.
              </Paragraph>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ministryPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group"
              >
                <Card className="p-7 h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl bg-white">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <pillar.icon className="w-7 h-7 text-white" />
                  </div>
                  <Heading
                    level={4}
                    className="mb-3 group-hover:text-primary transition-colors"
                  >
                    {pillar.title}
                  </Heading>
                  <Paragraph className="text-slate-500 text-sm leading-relaxed">
                    {pillar.description}
                  </Paragraph>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* MINISTRIES LISTING */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
                Explore
              </span>
              <Heading level={2} className="mb-4">
                Our Ministries
              </Heading>
              <Paragraph className="text-slate-500 max-w-2xl mx-auto">
                Each ministry is a unique expression of God's love. Find where you
                belong and discover how you can make an eternal difference.
              </Paragraph>
            </motion.div>
          </div>

          <MinistriesGrid ministries={ministry} />
        </Container>
      </section>

      {/* GET INVOLVED STEPS */}
      <section className="py-20 bg-slate-900 text-white">
        <Container>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3 bg-primary/20 px-4 py-1.5 rounded-full">
                Take Action
              </span>
              <Heading level={2} className="mb-4 text-white">
                How to Get Involved
              </Heading>
              <Paragraph className="text-slate-400 max-w-2xl mx-auto">
                Every believer is called to serve. Here's how you can take the
                next step in your ministry journey.
              </Paragraph>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {getInvolvedSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="text-7xl font-bold text-white/5 absolute -top-6 -left-2 group-hover:text-primary/10 transition-colors">
                  {step.step}
                </div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/30 transition-colors">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <Heading level={4} className="mb-3 text-white">
                    {step.title}
                  </Heading>
                  <Paragraph className="text-slate-400 text-sm leading-relaxed">
                    {step.description}
                  </Paragraph>
                </div>
              </motion.div>
            ))}
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
                Stories
              </span>
              <Heading level={2} className="mb-4">
                Lives Being Transformed
              </Heading>
              <Paragraph className="text-slate-500 max-w-2xl mx-auto">
                Hear from those whose lives have been changed through faithful
                ministry service.
              </Paragraph>
            </motion.div>
          </div>


              {/*testimonials  */}
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
                Have questions about getting involved? We have answers.
              </Paragraph>
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {frequentlyAsked.map((faq, index) => (
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
            <HandHeart className="w-14 h-14 mx-auto mb-6 text-white/90" />
            <Heading level={2} className="mb-4 text-white">
              Ready to Serve?
            </Heading>
            <Paragraph className="text-white/85 mb-8 text-lg leading-relaxed">
              God has given you unique gifts and a purpose. Take the next step
              and join a ministry where your service will bring glory to God
              and blessing to others.
            </Paragraph>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-slate-100 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg">
                Join a Ministry
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