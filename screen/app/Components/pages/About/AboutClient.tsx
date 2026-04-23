'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Sun, Users, Globe } from 'lucide-react';
import { Container } from '../../UI/Container';
import { Badge } from '../../UI/Badge';
import { Heading } from '../../UI/Heading';

import { Paragraph, Span } from '../../Typography/TypoGraphy';
import { GiveReasonAndMissionCard } from '../../Common/GiveReasonAndMissionCard';
import { PageContentResponse } from '@/app/Types/PageContent.types';
import { Leader } from '@/app/Types/DataTypes';
import { LeaderCard } from '../../UI/LeaderCard';






type AboutClientProps = {
  content?: PageContentResponse;
  leaders: Leader[]
};

const VALUE_ICONS = [Heart, Sun, Users, Globe];





export default function AboutClient({ content, leaders }: AboutClientProps) {


  const heroTitle =
    content?.data.hero?.title || 'A Community Built on Faith and Love';

  const heroSubtitle =
    content?.data.hero?.subtitle ||
    'Light To The Nations Emanuel Church began with a simple vision: to create a place where the light of Christ shines through every person, reaching out to all nations with compassion and hope.';

  const missionText =
    content?.data.about?.mission ||
    'This is the main content for the about page. You can edit this in the admin panel.';

  const missionImage = content?.data.about?.missionImage?.url || "";

  const mergedValues = content?.data.about?.missionContent?.map((item, index) => {
    return {
      icon: VALUE_ICONS[index],
      title: item?.missionTitle,
      description: item?.missionDescription,
    }
  })

  return (
    <main className="space-y-24 pb-20">
      {/* Hero */}
      <section className="bg-primary-soft py-20 -mt-12" aria-labelledby="about-hero-title">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-4">
              Our Story
            </Badge>

            <Heading level={1} className="mb-6" id="about-hero-title">
              {heroTitle.includes('Faith') || heroTitle.includes('Love') ? (
                <>
                  {heroTitle.replace('Faith', '').replace('Love', '').trim()}{' '}
                  {heroTitle.includes('Faith') && <span className="text-primary">Faith</span>}{' '}
                  {heroTitle.includes('Love') && <Span className="text-accent">Love</Span>}
                </>
              ) : (
                heroTitle
              )}
            </Heading>

            <Paragraph className="text-xl text-slate-600 leading-relaxed">
              {heroSubtitle}
            </Paragraph>
          </div>
        </Container>
      </section>

      {/* Mission + Images */}
      <section aria-labelledby="mission-title">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="rounded-4xl overflow-hidden border-8 border-white disney-shadow -rotate-2">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={missionImage}
                    alt="Our church community together"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>

              <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-4xl overflow-hidden border-8 border-white disney-shadow rotate-6 hidden md:block">
                <div className="relative w-full h-full">
                  <Image
                    src="https://picsum.photos/seed/about-2/400/400"
                    alt="Worship and praise"
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="space-y-8"
            >
              <Heading level={2} id="mission-title">
                Our Mission
              </Heading>

              <Paragraph className="text-lg text-slate-600 leading-relaxed">
                {missionText}
              </Paragraph>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {mergedValues?.map((item, key) => {
                  const Icon = item.icon;
                  return <GiveReasonAndMissionCard
                    title={item.title || ""}
                    Icon={Icon}
                    desc={item.description?.slice(0, 100) || ""}
                    key={key}
                  />
                }


                )}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Pastors */}
      <section className="bg-white py-20" aria-labelledby="pastors-title">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Heading level={2} className="mb-4" id="pastors-title">
              Meet Our Pastors
            </Heading>
            <Paragraph className="text-lg text-slate-600">
              Dedicated leaders who serve our community with joy.
            </Paragraph>
          </div>


          {/* leaders card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {leaders.map((leader) => (
              <LeaderCard key={leader._id} leader={leader} />
            ))}
            {!leaders.length && (
              <div className="col-span-full text-center text-slate-500 py-10">
                No leaders found.
              </div>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}