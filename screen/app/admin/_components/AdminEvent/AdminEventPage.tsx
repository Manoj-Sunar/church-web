"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
    Plus,
    Edit,
    Trash2,
    ExternalLink,
    Calendar as CalendarIcon,
    Clock,
    MapPin,
} from "lucide-react";

import type { Event } from "@/app/Types/DataTypes";

import { Spinner } from "@/app/Components/UI/Spinner";
import { Heading } from "@/app/Components/UI/Heading";
import { Button } from "@/app/Components/UI/Button/Button";
import { Modal } from "@/app/Components/UI/Modal";
import { Badge } from "@/app/Components/UI/Badge";

import { AdminTable } from "../AdminTable";
import type { Action, Column } from "../AdminTable";

import { SuccessMessage } from "@/app/Components/Common/SuccessMSG";
import { EventForm } from "./EventForm";
import AdminTableImgPreview from "../AdminTableImgPreview";
import { publicAPI } from "@/app/API/public.api";
import { adminAPI } from "@/app/API/admin.api";
import { IEvents } from "@/app/Types/APIResponse";
import toast from "react-hot-toast";

const formatDate = (iso: string) => {
    if (!iso) return "N/A";
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    }).format(new Date(iso));
};

export default function AdminEventsPage() {
    const queryClient = useQueryClient();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState<Event | null>(null);
    const [mode, setMode] = useState<"create" | "update">("create");




    const { data, isLoading, error } = useQuery<IEvents>({
        queryKey: ["events"],
        queryFn: publicAPI.getAllEvents,
    });



    const createMutation = useMutation({

        mutationFn: adminAPI.createEvents,

        onSuccess: (data: any) => {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["events"] });
            closeModal();

        },

        onError: (err: any) => {
            const message =
                err?.response?.data?.message ||
                error?.message ||
                "Failed to create sermon";

            toast.error(message);
        },
    });



    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Event> }) =>
            adminAPI.updateEvents(id, data),


        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            closeModal();
            toast.success(data.message);
        },


        onError: (err: any) => {
            const message =
                err?.response?.data?.message ||
                error?.message ||
                "Failed to create sermon";

            toast.error(message);
        },
    });



    const deleteMutation = useMutation({
        mutationFn: adminAPI.deleteEvents,
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            toast.success(data.message)
        },

        onError: (err: any) => {
            const message =
                err?.response?.data?.message ||
                error?.message ||
                "Failed to create sermon";

            toast.error(message);
        }


    });



    const columns: Column<Event>[] = [
        {
            key: "title",
            header: "Event",
            render: (event) => (
                <AdminTableImgPreview
                    image={event.image.url}
                    title={event.title}
                />
            ),
        },
        {
            key: "details",
            header: "Details",
            render: (event) => (
                <div className="space-y-1 text-sm">
                    <div className="flex gap-2">
                        <CalendarIcon size={14} /> {formatDate(event.date)}
                    </div>
                    <div className="flex gap-2">
                        <Clock size={14} /> {event.time}
                    </div>
                    <div className="flex gap-2">
                        <MapPin size={14} /> {event.location}
                    </div>
                </div>
            ),
        },
        {
            key: "category",
            header: "Category",
            render: (event) => <Badge>{event.category}</Badge>,
        },
    ];

    const actions: Action<Event>[] = [
        {
            label: "Edit",
            icon: <Edit size={18} />,
            onClick: (event) => {
                setMode("update");
                setEditing(event);
                setIsModalOpen(true);
            },
        },
        {
            label: "Delete",
            icon: <Trash2 size={18} />,
            onClick: (event) => {
                if (confirm("Delete this event?")) {
                    deleteMutation.mutate(event._id!);
                }
            },
        },
        {
            label: "View",
            icon: <ExternalLink size={18} />,
            onClick: (event) => {
                window.open(`/pages/events/${event._id}`, "_blank");
            },
        },
    ];

    const openAdd = () => {
        setMode("create");
        setEditing(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditing(null);
    };



    // ✅ ERROR
    if (error) return <div>Failed to load Events</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between">
                <Heading level={1}>Events</Heading>
                <Button onClick={openAdd}>
                    <Plus size={18} /> Add Event
                </Button>
            </div>



            <AdminTable<Event>
                data={data?.data || []}
                columns={columns}
                actions={actions}
                emptyMessage="No events found"
                isLoading={isLoading}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={mode === "update" ? "Edit Event" : "Add Event"}
            >
                <EventForm
                    initialData={editing || undefined}
                    onSubmit={(formData) => {
                        if (mode === "update" && editing?._id) {
                            updateMutation.mutate({
                                id: editing._id,
                                data: formData,
                            });
                        } else {
                            createMutation.mutate(formData as Event);
                        }
                    }}
                    onCancel={closeModal}
                    isSubmitting={
                        createMutation.isPending || updateMutation.isPending
                    }
                />
            </Modal>
        </div>
    );
}