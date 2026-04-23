"use client";

import { memo, useMemo } from "react";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card } from "../../UI/Card";
import { Heading } from "../../UI/Heading";
import { Container } from "../../UI/Container";
import { LinkButton } from "../../UI/Button/LinkButton";
import CommonHeroSection from "../../Common/CommonHeroSection";
import { Ministry } from "@/app/Types/DataTypes";
import { PageContentResponse } from "@/app/Types/PageContent.types";
import { Pagination } from "@/app/Types/APIResponse";


interface IministryProps {
  content: PageContentResponse;
  ministry: Ministry[];
  pagination: Pagination;
}


const MOTION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];



function MinistriesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-200 overflow-hidden bg-white"
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
}: {
  ministry: Ministry;
  priority?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (

    <motion.div
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: MOTION_EASE }}
      className="h-full"
    >
      <Card className="group p-0 overflow-hidden h-full flex flex-col">
        <div className="relative h-64 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={reduceMotion ? undefined : { scale: 1.06 }}
            transition={{ duration: 0.55, ease: MOTION_EASE }}
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
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <Heading
            level={3}
            className="mb-4 group-hover:text-primary transition-colors"
          >
            {ministry.name}
          </Heading>

          <p className="text-slate-600 mb-6 flex-grow line-clamp-3">
            {ministry.description}
          </p>

          <LinkButton
            href={`/pages/ministries/${ministry._id}`}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            Learn More <ArrowRight size={18} />
          </LinkButton>
        </div>
      </Card>
    </motion.div>

  );
});




export function MinistriesGrid({ ministries }: { ministries: Ministry[] }) {
  const items = useMemo(() => ministries ?? [], [ministries]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((m, idx) => (
        <MinistryCard key={m._id} ministry={m} priority={idx < 2} />
      ))}
    </div>
  );
}




export default function MinistriesClient({ content, ministry, pagination }: IministryProps) {


  return (
    <div className="py-12 space-y-12">
      {/* Hero */}
      <CommonHeroSection heading={content?.data.hero?.title || ""} paragraph={content?.data.hero?.subtitle || ""} />
      <Container>
        <MinistriesGrid ministries={ministry} />
      </Container>
    </div>
  );
}