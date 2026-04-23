"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Users, HandHelping, Heart, Sun, Globe } from "lucide-react";
import { Container } from "../../UI/Container";
import { Badge } from "../../UI/Badge";
import { Heading } from "../../UI/Heading";
import { Button } from "../../UI/Button/Button";
import { Card } from "../../UI/Card";
import { Paragraph } from "../../Typography/TypoGraphy";
import { Ministry } from "@/app/Types/DataTypes";
import { PageContentResponse } from "@/app/Types/PageContent.types";
import { MinistriesGrid } from "../Ministry/MinistryClient";

import Link from "next/link";
import { GiveReasonAndMissionCard } from "../../Common/GiveReasonAndMissionCard";
import { publicAPI } from "@/app/API/public.api";


type Analytics = {
  totalMembers: number,
  totalSermons: number,
  totalMinistries: number,
}

type Mission = {
  missionTitle?: string,
  missionDescription?: string,
}

interface IHomeViewProps {
  content: PageContentResponse;
  ministry: Ministry[]
  analytics: Analytics
  mission: Mission[],

};

const VALUE_ICONS = [Heart, Sun, Users, Globe];

export default function HomeView({
  content,
  ministry,
  analytics,
  mission,
  

}: IHomeViewProps) {






  // Safe defaults
  const heroTitle = content?.data.hero?.title || "Welcome to Light To The Nations Emanuel Church";
  const heroSubtitle =
    content?.data.hero?.subtitle ||
    "Join us in our mission to share the love of Christ and build a community where everyone belongs.";
  const heroImage =
    content?.data.hero?.image?.url || "https://picsum.photos/seed/church-hero/800/600";
  const heroAlt = content?.data.hero?.image?.alt || "A joyful church community gathered together";
  const mainText =
    content?.data.main?.text ||
    "Join us in our mission to share the love of Christ and build a community where everyone belongs.";



  const activeAnalytics = React.useMemo(() => {
    return [
      { icon: Users, label: "Active Members", value: analytics.totalMembers },
      { icon: Play, label: "Sermons Shared", value: analytics.totalSermons },
      { icon: HandHelping, label: "Active Ministries", value: analytics.totalMinistries },

    ]
  }, [analytics])


  const mergedValues = mission?.map((item, index) => {
    return {
      icon: VALUE_ICONS[index],
      title: item?.missionTitle,
      description: item?.missionDescription,
    }
  })



 



  return (
    <main className="space-y-24 pb-20">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-primary-soft pt-20 pb-32"
        aria-labelledby="home-hero-title"
      >
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="accent" className="mb-4">
                Welcome to our family
              </Badge>
              <Heading level={1} className="mb-6" id="home-hero-title">
                {heroTitle}
              </Heading>
              <Paragraph className="text-xl text-slate-600 mb-8 leading-relaxed">
                {heroSubtitle}
              </Paragraph>
              <div className="flex flex-wrap gap-4">

                <Button variant="outline" size="lg">
                  <Link href={"/pages/sermons"}>Watch Latest Sermon</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative"
            >
              <div className="relative z-10 rounded-4xl overflow-hidden border-8 border-white disney-shadow rotate-3">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={heroImage}
                    alt={heroAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section aria-labelledby="home-stats-title">
        <Container>
          <Heading id="home-stats-title" className="sr-only">
            Church highlights
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeAnalytics.map((stat, i) => (
              <Card key={i} className="flex flex-col items-center text-center p-8">
                <div className="bg-primary-soft p-4 rounded-2xl mb-4" aria-hidden="true">
                  <stat.icon className="text-primary h-8 w-8" />
                </div>
                <Heading level={3} className="mb-2">
                  {stat.value}
                </Heading>
                <p className="text-slate-500 font-bold">{stat.label}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <Container className="space-y-20">

        {
          ministry.length > 0 && <div className="flex flex-col gap-y-5">
            <Heading>Our Ministries</Heading>
            <MinistriesGrid ministries={ministry} />
           
          </div>
        }

        <div className="bg-white rounded-4xl p-12 border-4 border-primary-soft disney-shadow text-center max-w-4xl mx-auto">
          <Badge variant="primary-soft" className="mb-6">
            Our Mission
          </Badge>
          <Heading level={2} className="mb-6">
            Why We Exist
          </Heading>
          <div className="grid grid-cols-2 gap-8 mt-10">
            {
              mergedValues.map((item, index) => {
                const Icon = item.icon
                return <GiveReasonAndMissionCard title={item.title || ""} desc={item.description || ""} key={index} Icon={Icon} className="items-center justify-center" />
              })
            }
          </div>
        </div>


      </Container>
    </main>
  );
}