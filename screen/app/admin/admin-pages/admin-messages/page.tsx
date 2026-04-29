"use client"

import { adminAPI } from "@/app/API/admin.api"
import { Heading } from "@/app/Components/Typography/TypoGraphy"
import { IMessages } from "@/app/Types/APIResponse"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Action, AdminTable, Column } from "../../_components/AdminTable"
import { ContactForm } from "@/app/Types/DataTypes"
import { Trash2 } from "lucide-react"


const Messages = () => {

    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery<IMessages>({
        queryKey: ["messages"],
        queryFn: adminAPI.getAllMessages,
        
    });


    const deleteMutation = useMutation({
        mutationFn: (id: string) => adminAPI.removeMessages(id),
        // Optimistic update
        onMutate: async (id: string) => {
            await queryClient.cancelQueries({ queryKey: ["messages"] });

            const previousData = queryClient.getQueryData<IMessages>(["messages"]);

            // Remove the message immediately from cache
            if (previousData) {
                queryClient.setQueryData<IMessages>(["messages"], {
                    ...previousData,
                    data: previousData.data.filter((msg) => msg._id !== id),
                });
            }

            return { previousData };
        },
        onError: (_err, _id, context: any) => {
            // Rollback if mutation fails
            if (context?.previousData) {
                queryClient.setQueryData(["messages"], context.previousData);
            }
        },
        onSettled: () => {
            // Optional: refetch to sync with server
            queryClient.invalidateQueries({ queryKey: ["messages"] });
        },
    });




    const columns: Column<ContactForm>[] = [

        {
            key: "name",
            header: "Name",
            render: (contact) => (
                <div className="space-y-1 text-sm font-bold  rounded-sm text-center px-2 py-1">
                    {contact.name}
                </div>
            ),
        },
        {
            key: "email",
            header: "Email",
            render: (contact) => <div className="space-y-1 text-sm ">
                {contact.email}
            </div>,
        },

        {
            key: "subject",
            header: "Subject",
            render: (contact) => <div className="space-y-1 text-sm  text-center px-2 py-1 font-bold rounded-sm">
                {contact.subject}
            </div>,
        },

        {
            key: "message",
            header: "Messages",
            render: (contact) => <div className="space-y-1 text-sm ">
                {contact.messages}
            </div>,
        },

    ];


    const actions: Action<ContactForm>[] = [

        {
            label: "Delete",
            icon: <Trash2 size={18} />,
            onClick: (contact) => {
                deleteMutation.mutate(contact?._id || "");
            },
        },

    ];

    return (
        <div className="space-y-8">
            <Heading>Messages</Heading>


            <AdminTable data={data?.data || []} columns={columns} actions={actions} isLoading={isLoading} />


        </div>
    )
}

export default Messages
