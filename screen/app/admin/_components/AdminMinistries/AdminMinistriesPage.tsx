"use client";

import React from "react";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react";

import type { Ministry } from "@/app/Types/DataTypes";
import { Heading } from "@/app/Components/UI/Heading";
import { Button } from "@/app/Components/UI/Button/Button";
import { Modal } from "@/app/Components/UI/Modal";
import { Badge } from "@/app/Components/UI/Badge";
import { SuccessMessage } from "@/app/Components/Common/SuccessMSG";

import type { Action, Column } from "../AdminTable";
import { AdminTable } from "../AdminTable";
import AdminTableImgPreview from "../AdminTableImgPreview";
import { MinistryForm } from "./MinistryForm";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { publicAPI } from "@/app/API/public.api";
import { adminAPI } from "@/app/API/admin.api";
import { IMinistry } from "@/app/Types/APIResponse";
import toast from "react-hot-toast";

export default function AdminMinistriesPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Ministry | null>(null);

  const queryClient = useQueryClient();

  // ✅ FETCH DATA
  const {
    data: ministries,
    isLoading,
    error,
  } = useQuery<IMinistry>({
    queryKey: ["ministries"],
    queryFn: publicAPI.getAllMinistry,
  });



  // ✅ CREATE
  const createMutation = useMutation({

    mutationFn: adminAPI.createMinistry,

    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["ministries"] });
      toast.success(data.message);
      closeModal();
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create sermon";

      toast.error(message);
    }

  });



  // ✅ UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Ministry> }) =>
      adminAPI.updateMinistry(id, data),

    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["ministries"] });
      toast.success(data.message);
      closeModal();
    },

    onError: (err: any) => {
      const message =
        err?.response?.data?.message ||
        error?.message ||
        "Failed to create sermon";

      toast.error(message);
    }

  });



  // ✅ DELETE
  const deleteMutation = useMutation({
    mutationFn: adminAPI.ministryRemove,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["ministries"] });
      toast.success(data.message);
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.message ||
        error?.message ||
        "Failed to create sermon";

      toast.error(message);
    }
  });



  // ✅ TABLE COLUMNS
  const columns: Column<Ministry>[] = [
    {
      key: "name",
      header: "Ministry",
      render: (m) => (
        <AdminTableImgPreview image={m.image.url||"./placeholder.png"} title={m.image.alt} />
      ),
    },
    {
      key: "leader",
      header: "Leader",
      render: (m) => (
        <div className="flex items-center gap-2 text-sm text-slate-600">

          {m.leader}
        </div>
      ),
    },
    {
      key: "description",
      header: "Details",
      render: (m) => (
        <div className="flex gap-2 text-sm text-slate-600">

          <p className="line-clamp-2">{m.description}</p>
        </div>
      ),
    },
    {
      key: "slug",
      header: "Slug",
      render: (m) => <Badge className="w-40 flex items-center justify-center" >{m.slug}</Badge>,
    },
  ];



  // ✅ ACTIONS
  const actions: Action<Ministry>[] = [
    {
      label: "Edit",
      icon: <Edit size={18} />,
      onClick: (m) => {
        setEditing(m);
        setIsModalOpen(true);
      },
    },
    {
      label: "Delete",
      icon: <Trash2 size={18} />,
      onClick: (m) => {
        if (confirm("Delete this ministry?")) {
          deleteMutation.mutate(m._id!);
        }
      },
    },
    {
      label: "View",
      icon: <ExternalLink size={18} />,
      onClick: (m) => {
        window.open(`/pages/ministries/${m._id}`, "_blank");
      },
    },
  ];


  const openAdd = () => {
    setEditing(null);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
  };


  // ✅ ERROR
  if (error) return <div>Failed to load ministries</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <div>
          <Heading level={1}>Ministries</Heading>
          <p className="text-slate-500">
            Manage church departments and groups
          </p>
        </div>

        <Button onClick={openAdd} className=" h-15 w-40">
          <Plus size={18} /> Add Ministry
        </Button>
      </div>


      <AdminTable
        data={ministries?.data || []}
        columns={columns}
        actions={actions}
        emptyMessage="No ministries found"
        isLoading={isLoading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editing ? "Edit Ministry" : "Add Ministry"}
      >
        <MinistryForm
          initialData={editing || undefined}
          isSubmitting={
            createMutation.isPending || updateMutation.isPending
          }
          onSubmit={(data) => {
            if (editing) {
              updateMutation.mutate({
                id: editing._id!,
                data,
              });
            } else {
              createMutation.mutate(data as Ministry);
            }
          }}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}