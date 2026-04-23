"use client";

import React from "react";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Edit } from "lucide-react";

import { Spinner } from "@/app/Components/UI/Spinner";
import { Heading } from "@/app/Components/UI/Heading";
import { Button } from "@/app/Components/UI/Button/Button";
import { Modal } from "@/app/Components/UI/Modal";
import { Action, AdminTable, Column } from "../AdminTable";
import { SuccessMessage } from "@/app/Components/Common/SuccessMSG";
import MemberForm from "./MemberForm";
import { Member } from "@/app/Types/DataTypes";

import { adminAPI } from "@/app/API/admin.api";
import { IMembers } from "@/app/Types/APIResponse";
import AdminTableImgPreview from "../AdminTableImgPreview";
import { formatToDateInput, getErrorMessage } from "@/app/utils/utilityFunction";
import toast from "react-hot-toast";


export default function AdminMembersPage() {

  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Member | null>(null);


  const { data: members, isLoading, error } = useQuery<IMembers>({
    queryKey: ["members"],
    queryFn: adminAPI.getAllMembers,
    staleTime: 1000 * 60, // 1 min cache

  });



  const createMember = useMutation({
    mutationFn: adminAPI.addNewMember,

    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      toast.success(data.message);
      closeModal();
    },

    onError: (err: any) => {
      const message =
        err?.response?.data?.message ||
        error?.message ||
        "Failed to create sermon";

      toast.error(message);

    },
  })

  const updateMember = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Member> }) => adminAPI.updateMember(id, data),
    onSuccess: (data: any) => {

      queryClient.invalidateQueries({ queryKey: ['members'] });
      toast.success(data.message)
      closeModal()
    },

    onError: (err: any) => {

      const message =
        err?.response?.data?.message ||
        error?.message ||
        "Failed to create sermon";

      toast.error(message);
    },
  });




  const deleteMember = useMutation({
    mutationFn: adminAPI.deleteMember,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      toast.success(data.message);
    },

    onError: (err: any) => {
      const message =
        err?.response?.data?.message ||
        error?.message ||
        "Failed to create sermon";

      toast.error(message);
    }
  })



  const closeModal = React.useCallback(() => {
    setIsModalOpen(false);
    setEditing(null);
  }, []);



  const openAdd = React.useCallback(() => {
    setEditing(null);
    setIsModalOpen(true);
  }, []);




  const openEdit = React.useCallback((member: Member) => {
    setEditing(member);
    setIsModalOpen(true);
  }, []);



  const columns: Column<Member>[] = [
    {
      key: "member",
      header: "Member",
      render: (member) => (
        <div className="flex items-center gap-4">
          {member.image ? (
            <AdminTableImgPreview title={member.name} image={member.image.url} />
          ) : <div className="flex items-center gap-4">

            <p className="font-bold text-slate-800">{member.name}</p>
          </div>}

        </div>
      ),
    },

    {
      key: "phone",
      header: "Phone",
      render: (member) => (
        <div className="flex items-center gap-4">

          <p className="font-bold text-slate-800">{member.phone}</p>
        </div>
      ),
    },


    {
      key: "join_date",
      header: "Join Date",
      render: (member) => (
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            {
              formatToDateInput(member.join_date)
            }
          </div>
        </div>
      ),
    },
  ];

  const actions: Action<Member>[] = [
    {
      label: "Edit",
      icon: <Edit size={20} />,
      onClick: openEdit,
      className: "text-slate-400 hover:text-primary",
      disabled: updateMember.isPending,
    },
    {
      label: "Delete",
      icon: <Trash2 size={20} />,
      onClick: (member) => {
        if (window.confirm("Are you sure you want to delete this member?")) {
          deleteMember.mutate(member._id || "");
        }
      },
      className: "text-slate-400 hover:text-accent",
      disabled: deleteMember.isPending,
    },
  ];

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <Heading level={1}>Manage Members</Heading>
          <p className="text-slate-500 text-lg">
            View and manage church membership records.
          </p>
        </div>

        <Button onClick={openAdd} className="flex items-center gap-2">
          <Plus size={20} /> Add Member
        </Button>
      </div>



      <AdminTable<Member>
        data={members?.data ?? []}
        columns={columns}
        actions={actions}
        emptyMessage="No members found."

      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editing ? "Edit Member" : "Add New Member"}
      >
        <MemberForm
          initialData={editing ?? undefined}
          onSubmit={(data) => {
            if (editing) {
              updateMember.mutate({
                id: editing._id || "",
                data,
              });
            } else {
              createMember.mutate(data as Member);
            }
          }}
          onCancel={closeModal}
          isSubmitting={createMember.isPending || updateMember.isPending}

        />
      </Modal>
    </div>
  );
}