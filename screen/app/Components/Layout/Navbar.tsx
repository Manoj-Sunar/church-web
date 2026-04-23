'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { LinkButton } from '../UI/Button/LinkButton';
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

    const close = React.useCallback(() => setIsOpen(false), []);
    const toggle = React.useCallback(() => setIsOpen((v) => !v), []);

    // Close menu on route change
    React.useEffect(() => {
        close();
    }, [pathname, close]);

    // Escape to close
    React.useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isOpen, close]);

    // Prevent background scroll when mobile menu open
    React.useEffect(() => {
        if (!isOpen) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, [isOpen]);

    return (
        <header className="sticky top-0 z-50">
            <nav className="bg-white/80 backdrop-blur-md border-b-4 border-primary-soft">
                <Container>
                    <div className="flex h-16 sm:h-20 items-center justify-between gap-3">
                        {/* Brand */}
                        <Link
                            href="/"
                            className="flex items-center gap-2 group min-w-0"
                            aria-label="Go to Home"
                        >
                            <div className="bg-primary p-2 rounded-2xl group-hover:rotate-12 transition-transform shrink-0">
                                <Sun className="text-white h-6 w-6" />
                            </div>
                            <span className="font-display text-base sm:text-xl font-bold text-slate-800 truncate">
                                Light To The Nations
                            </span>
                        </Link>

                        {/* Desktop / Tablet Nav */}
                        <div className="hidden md:flex items-center gap-3 lg:gap-8">
                            <div className="flex items-center gap-3 lg:gap-6">
                                {NAV_ITEMS.map((item) => {
                                    const active = isActive(pathname, item.href);
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                'font-display font-bold transition-colors hover:text-primary px-2 py-1 rounded-xl',
                                                active ? 'text-primary' : 'text-slate-600'
                                            )}
                                            aria-current={active ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>

                            <LinkButton href="/pages/give" aria-label="Donate">
                                Donate
                            </LinkButton>
                        </div>

                        {/* Mobile toggle */}
                        <button
                            type="button"
                            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-primary-soft/60 transition-colors"
                            onClick={toggle}
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isOpen}
                            aria-controls="mobile-nav"
                        >
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </Container>
            </nav>

            {/* Mobile Menu Overlay + Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.button
                            type="button"
                            aria-label="Close menu overlay"
                            className="md:hidden fixed inset-0 z-40 bg-black/30"
                            onClick={close}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* Drawer */}
                        <motion.aside
                            id="mobile-nav"
                            className="md:hidden fixed top-0 right-0 z-50 h-dvh w-[88%] max-w-sm bg-white border-l-4 border-primary-soft disney-shadow"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Mobile navigation"
                        >
                            <div className="flex items-center justify-between p-4 border-b-2 border-primary-soft">
                                <div className="flex items-center gap-2 min-w-0">
                                    <div className="bg-primary p-2 rounded-2xl shrink-0">
                                        <Sun className="text-white h-5 w-5" />
                                    </div>
                                    <span className="font-display font-bold text-slate-800 truncate">
                                        Light To The Nations
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className="p-2 rounded-xl text-slate-700 hover:bg-primary-soft/60 transition-colors"
                                    onClick={close}
                                    aria-label="Close menu"
                                >
                                    <X />
                                </button>
                            </div>

                            <div className="p-4">
                                <div className="flex flex-col gap-2">
                                    {NAV_ITEMS.map((item) => {
                                        const active = isActive(pathname, item.href);
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={close}
                                                className={cn(
                                                    'font-display font-bold p-3 rounded-2xl transition-colors',
                                                    active
                                                        ? 'bg-primary-soft text-primary'
                                                        : 'text-slate-700 hover:bg-primary-soft/60'
                                                )}
                                                aria-current={active ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </div>

                                <div className="mt-4">
                                    <Link href="/donate" onClick={close}>
                                        Donate
                                    </Link>
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}