'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Container } from '../UI/Container';

type NavItem = { name: string; href: string };

const NAV_ITEMS: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/pages/about' },
    { name: 'Sermons', href: '/pages/sermons' },
    { name: 'Ministries', href: '/pages/ministries' },
    { name: 'Events', href: '/pages/events' },
    { name: 'Contact', href: '/pages/contact' },
];

function isActive(pathname: string, href: string) {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
    const pathname = usePathname() ?? '/';

    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen((v) => !v);

    // Close on route change
    React.useEffect(() => {
        close();
    }, [pathname]);

    // Escape key
    React.useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen]);

    // Prevent scroll
    React.useEffect(() => {
        if (!isOpen) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, [isOpen]);

    // Scroll effect
    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="sticky top-0 z-50">
            <nav
                className={cn(
                    'transition-all duration-300',
                    scrolled
                        ? 'bg-white/70 backdrop-blur-xl shadow-lg  border-white/20'
                        : 'bg-transparent'
                )}
            >
                <Container>
                    <div className="flex h-16 sm:h-20 items-center justify-between">

                        {/* Brand */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary blur-xl opacity-40 group-hover:opacity-70 transition" />
                                <div className="relative bg-primary p-2 rounded-2xl group-hover:rotate-12 group-hover:scale-110 transition">
                                    <Sun className="text-white h-6 w-6" />
                                </div>
                            </div>

                            <span className="font-bold text-lg text-slate-800">
                                Light To The Nations
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-6">

                            {/* Nav Links */}
                            <div className="flex items-center gap-2">
                                {NAV_ITEMS.map((item) => {
                                    const active = isActive(pathname, item.href);

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="relative px-3 py-2 text-sm font-semibold"
                                        >
                                            {active && (
                                                <motion.div
                                                    layoutId="nav-pill"
                                                    className="absolute inset-0 bg-primary/10 rounded-xl"
                                                    transition={{
                                                        type: 'spring',
                                                        stiffness: 300,
                                                        damping: 30,
                                                    }}
                                                />
                                            )}

                                            <span
                                                className={cn(
                                                    'relative z-10 transition',
                                                    active
                                                        ? 'text-primary'
                                                        : 'text-slate-600 hover:text-primary'
                                                )}
                                            >
                                                {item.name}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* CTA Button */}
                            <Link
                                href="/pages/give"
                                className="relative inline-flex items-center px-5 py-2 rounded-xl font-semibold text-white bg-primary overflow-hidden group"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-primary to-orange-400 opacity-0 group-hover:opacity-100 transition" />
                                <span className="relative z-10">Donate</span>
                            </Link>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={toggle}
                            className="md:hidden p-2 rounded-xl hover:bg-primary/10"
                        >
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </Container>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/30 z-40"
                            onClick={close}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* Drawer */}
                        <motion.aside
                            className="fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm bg-white/80 backdrop-blur-xl border-l border-white/20 shadow-2xl"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center p-4 border-b">
                                <span className="font-bold text-lg">
                                    Menu
                                </span>
                                <button onClick={close}>
                                    <X />
                                </button>
                            </div>

                            {/* Links */}
                            <div className="p-4 flex flex-col gap-2">
                                {NAV_ITEMS.map((item, i) => {
                                    const active = isActive(pathname, item.href);

                                    return (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={close}
                                                className={cn(
                                                    'block p-3 rounded-xl font-semibold',
                                                    active
                                                        ? 'bg-primary/10 text-primary'
                                                        : 'hover:bg-primary/5'
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    );
                                })}

                                {/* CTA */}
                                <Link
                                    href="/pages/give"
                                    onClick={close}
                                    className="mt-4 text-center bg-primary text-white py-3 rounded-xl font-semibold"
                                >
                                    Donate
                                </Link>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}