import React, { FC } from 'react'
import { Container } from '../UI/Container'
import { Heading } from '../UI/Heading'
import { Paragraph } from '../Typography/TypoGraphy'
import { cn } from '@/app/utils/cn'

interface CommonHeroSectionProps {
    heading: string
    paragraph: string
    className?: string
    backgroundImage?: string // optional image
    overlay?: boolean // optional overlay
}

const CommonHeroSection: FC<CommonHeroSectionProps> = ({
    heading,
    paragraph,
    className,
    backgroundImage,
    overlay = true,
}) => {
    return (
        <section
            className={cn(
                "relative py-16 -mt-12",
                !backgroundImage && "bg-primary-soft",
                className
            )}
        >
            {/* Background Image */}
            {backgroundImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
            )}

            {/* Overlay */}
            {backgroundImage && overlay && (
                <div className="absolute inset-0 bg-black/50" />
            )}

            {/* Content */}
            <Container className="relative z-10">
                <div className="max-w-2xl">
                    <Heading
                        level={1}
                        className={cn(
                            "mb-4",
                            backgroundImage ? "text-white" : ""
                        )}
                    >
                        {heading}
                    </Heading>

                    <Paragraph
                        className={cn(
                            "text-xl",
                            backgroundImage
                                ? "text-gray-200"
                                : "text-slate-600"
                        )}
                    >
                        {paragraph}
                    </Paragraph>
                </div>
            </Container>
        </section>
    )
}

export default CommonHeroSection