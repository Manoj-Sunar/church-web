'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;

    /** Optional: ids improve accessibility when you have multiple modals */
    id?: string;

    /** Close when clicking the backdrop */
    closeOnBackdropClick?: boolean;

    /** Close on Escape */
    closeOnEsc?: boolean;

    /** Optional: control max width */
    maxWidthClassName?: string;

    /** Optional: custom class names */
    className?: string;
};

export const Modal: React.FC<ModalProps> = React.memo(function Modal({
    isOpen,
    onClose,
    title,
    children,
    id = 'modal',
    closeOnBackdropClick = true,
    closeOnEsc = true,
    maxWidthClassName = 'max-w-lg',
    className = '',
}) {
    const titleId = `${id}-title`;
    const contentId = `${id}-content`;

    const dialogRef = React.useRef<HTMLDivElement | null>(null);
    const lastActiveElementRef = React.useRef<HTMLElement | null>(null);

    const handleClose = React.useCallback(() => {
        onClose();
    }, [onClose]);

    // ESC + basic focus trap
    React.useEffect(() => {
        if (!isOpen) return;
        if (typeof window === 'undefined') return;

        lastActiveElementRef.current = document.activeElement as HTMLElement | null;

        const onKeyDown = (e: KeyboardEvent) => {
            if (closeOnEsc && e.key === 'Escape') {
                e.preventDefault();
                handleClose();
                return;
            }

            // Simple focus trap on Tab
            if (e.key !== 'Tab') return;
            const root = dialogRef.current;
            if (!root) return;

            const focusable = root.querySelectorAll<HTMLElement>(
                [
                    'a[href]',
                    'button:not([disabled])',
                    'textarea:not([disabled])',
                    'input:not([disabled])',
                    'select:not([disabled])',
                    '[tabindex]:not([tabindex="-1"])',
                ].join(',')
            );

            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            const active = document.activeElement as HTMLElement | null;

            if (e.shiftKey) {
                if (!active || active === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (active === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isOpen, closeOnEsc, handleClose]);

    // Body scroll lock (keeps original overflow and restores it)
    React.useEffect(() => {
        if (!isOpen) return;
        if (typeof document === 'undefined') return;

        const { overflow } = document.body.style;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = overflow || '';
        };
    }, [isOpen]);

    // Autofocus first focusable element, fallback to dialog itself
    React.useEffect(() => {
        if (!isOpen) return;
        const t = window.setTimeout(() => {
            const root = dialogRef.current;
            if (!root) return;

            const firstFocusable = root.querySelector<HTMLElement>(
                'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            (firstFocusable ?? root).focus();
        }, 0);

        return () => window.clearTimeout(t);
    }, [isOpen]);

    // Restore focus to the element that opened the modal
    React.useEffect(() => {
        if (isOpen) return;
        lastActiveElementRef.current?.focus?.();
    }, [isOpen]);

    const onBackdropMouseDown = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!closeOnBackdropClick) return;
            // only close if the user clicked the backdrop itself
            if (e.currentTarget === e.target) handleClose();
        },
        [closeOnBackdropClick, handleClose]
    );

    const variants = {
        backdrop: {
            hidden: { opacity: 0 },
            show: { opacity: 1 },
            exit: { opacity: 0 },
        },
        dialog: {
            hidden: { opacity: 0, scale: 0.98, y: 18 },
            show: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.98, y: 18 },
        },
    } as const;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    aria-hidden={!isOpen}
                >
                    {/* Backdrop */}
                    <motion.div
                        variants={variants.backdrop}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onMouseDown={onBackdropMouseDown}
                    />

                    {/* Dialog */}
                    <motion.div
                        ref={dialogRef}
                        variants={variants.dialog}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={title ? titleId : undefined}
                        aria-describedby={contentId}
                        tabIndex={-1}
                        className={[
                            'relative w-full',
                            maxWidthClassName,
                            'rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200',
                            'focus:outline-none',
                            className,
                        ].join(' ')}
                    >
                        {(title ?? '') !== '' && (
                            <div className="flex items-center justify-between p-6 border-b border-slate-100">
                                <h3 id={titleId} className="text-xl font-bold text-slate-800">
                                    {title}
                                </h3>

                                <button
                                    type="button"
                                    onClick={handleClose}
                                    aria-label="Close modal"
                                    className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        )}

                        <div id={contentId} className="p-6 max-h-[80vh] overflow-y-auto">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});