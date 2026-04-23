'use client';

import React from 'react';
import Image from 'next/image';
import { Edit2, Trash2 } from 'lucide-react';
import { Card } from '@/app/Components/UI/Card';
import { Button } from '@/app/Components/UI/Button/Button';
import { Heading } from '@/app/Components/UI/Heading';
import { Paragraph } from '@/app/Components/Typography/TypoGraphy';
import { Leader } from '@/app/Types/DataTypes';

type LeaderCardProps = {
    leader: Leader;
    isAdmin?: boolean;
    onEdit?: (leader: Leader) => void;
    onDelete?: (id: string) => void;
    fallbackImage?: string;
};

export const LeaderCard: React.FC<LeaderCardProps> = ({
    leader,
    isAdmin = false,
    onEdit,
    onDelete,
    fallbackImage = "https://picsum.photos/seed/leader/400/400",
}) => {
    return (
        <Card className="overflow-hidden border-4 border-white disney-shadow group p-0">
            {/* Leader Image */}
            <div className="h-48 relative overflow-hidden bg-slate-100">
                <Image
                    src={leader.image?.url || fallbackImage}
                    alt={leader.image?.alt || leader.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Admin actions */}
                {isAdmin && (onEdit || onDelete) && (
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {onEdit && (
                            <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                className="p-2 h-auto rounded-xl"
                                onClick={() => onEdit(leader)}
                                aria-label={`Edit ${leader.name}`}
                            >
                                <Edit2 size={16} />
                            </Button>
                        )}
                        {onDelete && (
                            <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                className="p-2 h-auto rounded-xl text-red-500 hover:bg-red-50"
                                onClick={() => onDelete(leader._id!)}
                                aria-label={`Delete ${leader.name}`}
                            >
                                <Trash2 size={16} />
                            </Button>
                        )}
                    </div>
                )}
            </div>

            {/* Leader Info */}
            <div className="p-3">
                <Heading level={4} className="mb-1">
                    {leader.name}
                </Heading>
                <Paragraph className="text-primary font-bold text-sm mb-4">{leader.role}</Paragraph>
                <Paragraph className="text-slate-600 text-sm line-clamp-3">{leader.bio}</Paragraph>
            </div>
        </Card>
    );
};