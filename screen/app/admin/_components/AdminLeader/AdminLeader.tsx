"use client";

import React from "react";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Leader } from "@/app/Types/DataTypes";
import { Spinner } from "@/app/Components/UI/Spinner";

import { Button } from "@/app/Components/UI/Button/Button";

import { Modal } from "@/app/Components/UI/Modal";
import { SuccessMessage } from "@/app/Components/Common/SuccessMSG";
import { LeaderForm } from "./LeaderForm";

import CommonHeroSection from "@/app/Components/Common/CommonHeroSection";
import { ILeaders } from "@/app/Types/APIResponse";
import { publicAPI } from "@/app/API/public.api";
import { adminAPI } from "@/app/API/admin.api";
import { LeaderCard } from "@/app/Components/UI/LeaderCard";
import toast from "react-hot-toast";




export default function AdminLeadersPage() {

  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Leader | null>(null);


  const { data: leaders, isLoading, error } = useQuery<ILeaders>({
    queryKey: ["leaders"],
    queryFn: publicAPI.getAllLeaders,
  });


  const createLeader = useMutation({

    mutationFn: adminAPI.addNewLeader,

    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["leaders"] });
      toast.success(data.message)
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



  
  const openAdd = () => {
    setEditing(null);
    setIsModalOpen(true);
  };




  // ========= update leader ==============
  const updateLeader = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Leader> }) => adminAPI.updateLeader(id, data),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['leaders'] });
      toast.success(data.message)
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



  // =================== leader delete =====================
  const deleteLeader = useMutation({
    mutationFn: adminAPI.removeLeader,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['leaders'] });
      toast.success(data.message)
    },


    onError: (err: any) => {
      const message =
        err?.response?.data?.message ||
        error?.message ||
        "Failed to create sermon";

      toast.error(message);
    }

  })

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
  };

  const handleEdit = (leader: Leader) => {
    setEditing(leader);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this leader?')) {
      deleteLeader.mutate(id);
    }
  };


  if (isLoading) return <Spinner />;
  // if (error) return <ErrorMessage message={error.message} onRetry={refetch} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">

        <CommonHeroSection heading="Manage Leaders" paragraph="Add and manage church leadership team." className="mt-0 bg-transparent py-3" />

        <Button onClick={openAdd} className="flex items-center gap-2">
          <Plus size={20} /> Add Leader
        </Button>
      </div>


      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {leaders?.data?.map((leader) => (
          <LeaderCard
            key={leader._id}
            leader={leader}
            isAdmin
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editing ? "Edit Leader" : "Add New Leader"}
      >
        <LeaderForm
          initialData={editing || undefined}
          onSubmit={(data) => {
            if (editing) {
              updateLeader.mutate({
                id: editing?._id! || "", data
              });
            } else {
              createLeader.mutate(data as Leader);
            }
          }}
          onCancel={closeModal}

        />
      </Modal>
    </div>
  );
}