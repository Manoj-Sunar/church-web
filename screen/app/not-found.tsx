"use client";

import Link from "next/link";
import { Heading, Paragraph, Span } from "./Components/Typography/TypoGraphy";

export default function NotFound() {
    return (
        <div className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white text-center">
            {/* Soft glow background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-200 blur-3xl" />
                <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-indigo-200 blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 px-6">
                {/* Subtle cross icon */}
                <div className="mb-6 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
                        <Span className="text-2xl">✝️</Span>
                    </div>
                </div>

                <Heading as="h1" className="text-7xl font-extrabold text-slate-800 tracking-tight">
                    404
                </Heading>

                <Paragraph className="mt-4 text-xl font-medium text-slate-600">
                    Page not found
                </Paragraph>

                <Paragraph className="mt-2 max-w-md text-sm text-slate-500 mx-auto">
                    “The Lord is near to all who call on Him.” — Psalm 145:18
                    <br />
                    The page you are looking for seems to have wandered away.
                </Paragraph>

                {/* Buttons */}
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href="/"
                        className="rounded-2xl bg-primary px-6 py-3 text-white font-semibold shadow-md transition hover:scale-105 hover:opacity-90"
                    >
                        🏠 Go to Home
                    </Link>

                    <Link
                        href="/pages/contact"
                        className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-100"
                    >
                        🙏 Pray / Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}