import { memo } from "react";
import { Heading, Paragraph } from "../Typography/TypoGraphy";
import { cn } from "@/app/utils/cn";

export const GiveReasonAndMissionCard = memo(function GiveReasonCard({
    Icon,
    title,
    desc,
    className,
}: {
    Icon: React.ElementType;
    title: string;
    desc: string;
    className?:string;
}) {
    return (
        <div className={cn("flex flex-col gap-3 ",className)}>
            <div className="bg-primary-soft w-12 h-12 rounded-2xl flex items-center justify-center">
                <Icon className="text-primary h-6 w-6" />
            </div>
            <Heading as="h1" className="font-display font-bold text-slate-800">{title}</Heading>
            <Paragraph className="text-sm text-slate-500">{desc}</Paragraph>
        </div>
    );
});