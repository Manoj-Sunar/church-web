"use client";

import React from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Plus, Trash2, Edit, ExternalLink, OctagonX } from "lucide-react";
import type { Sermon as ChurchSermon } from "@/app/Types/DataTypes";

import { Button } from "@/app/Components/UI/Button/Button";
import { Modal } from "@/app/Components/UI/Modal";
import CommonHeroSection from "@/app/Components/Common/CommonHeroSection";
import { Action, AdminTable, Column } from "../AdminTable";
import { Paragraph, Span } from "@/app/Components/Typography/TypoGraphy";
import { SuccessMessage } from "@/app/Components/Common/SuccessMSG";
import SermonForm from "./SermonForm";
import { publicAPI } from "@/app/API/public.api";
import { adminAPI } from "@/app/API/admin.api";
import AdminTableImgPreview from "../AdminTableImgPreview";
import { getYouTubeThumbnail } from "@/app/utils/utilityFunction";
import toast from "react-hot-toast";






export default function AdminSermonsPage() {


  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editing, setEditing] =
    React.useState<ChurchSermon | null>(null);
  const [showSuccess, setShowSuccess] = React.useState(false);





  // =========================
  // 📥 FETCH
  // =========================
  const { data, isLoading, isError } = useQuery({
    queryKey: ["sermons", 1, 10],
    queryFn: () => publicAPI.getAllSermons(1, 10),
  });

  const sermons = data?.data ?? [];





  // =========================
  // 🚀 CREATE
  // =========================
  const createMutation = useMutation({
    mutationFn: adminAPI.createSermon,

    onSuccess: (response: any) => {
      const message =
        response?.message || "Sermon created successfully";

      toast.success(message);
      setIsModalOpen(false);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create sermon";

      toast.error(message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["sermons"] });
    },
  });






  // =========================
  // ✏️ UPDATE
  // =========================
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) =>
      adminAPI.updateSermon(id, data),

    onSuccess: (response: any) => {
      toast.success(
        response?.message || "Sermon updated successfully"
      );
      setIsModalOpen(false);
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
        "Update failed"
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["sermons"] });
    },
  });






  // =========================
  // 🗑 DELETE
  // =========================
  const deleteMutation = useMutation({
    mutationFn: adminAPI.DeleteSermon,

    onSuccess: (response: any) => {
      toast.success(
        response?.message || "Deleted successfully"
      );
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
        "Delete failed"
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["sermons"] });
    },
  });





  // =========================
  // UI HANDLERS
  // =========================
  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
  };



  const openAdd = () => {
    setEditing(null);
    setIsModalOpen(true);
  };



  const openEdit = (sermon: ChurchSermon) => {
    setEditing(sermon);
    setIsModalOpen(true);
  };



  // =========================
  // TABLE CONFIG
  // =========================
  const columns: Column<ChurchSermon>[] = React.useMemo(
    () => [
      {
        key: "name",
        header: "Sermon",
        render: (data) => (
          <AdminTableImgPreview image={`${getYouTubeThumbnail(data?.videoUrl || "")}`} title={data?.title} />
        ),
      },
      { key: "title", header: "Sermon" },
      {
        key: "speaker",
        header: "Speaker",
        render: (data) => (
          <Paragraph>{data.speaker}</Paragraph>
        ),
      },
      {
        key: "date",
        header: "Date",
        render: (data) => (
          <Paragraph>
            {new Date(data.date).toLocaleDateString()}
          </Paragraph>
        ),
      },
    ],
    []
  );



  const actions: Action<ChurchSermon>[] = React.useMemo(
    () => [
      {
        label: "Edit",
        icon: <Edit size={18} />,
        onClick: openEdit,
      },
      {
        label: "Delete",
        icon: <Trash2 size={18} />,
        onClick: (sermon) => {
          if (window.confirm("Delete this sermon?")) {
            deleteMutation.mutate(sermon?._id || "");
          }
        },
        className: "text-red-500",
      },
      {
        label: "View",
        icon: <ExternalLink size={18} />,
        onClick: (data) =>
          window.open(`/pages/sermons/${data._id}`),
      },
    ],
    []
  );




  if (isError) return <p>Error loading sermons</p>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center py-0 px-2">
        <CommonHeroSection
          heading="Sermons"
          paragraph="Manage sermons"
          className="w-full bg-transparent p-10"
        />
        <Button onClick={openAdd} className="w-50 p-0 h-15">
          <Plus /> <span>Add Sermons</span>
        </Button>
      </div>

      {showSuccess && (
        <SuccessMessage
          icon={OctagonX}
          title="Success"
          description="Operation successful"
          className="border"
        />
      )}

      <AdminTable
        columns={columns}
        data={sermons}
        actions={actions}
        isLoading={isLoading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editing ? "Edit" : "Create"}
      >
        <SermonForm
          initialData={editing ?? undefined}
          onSubmit={(data) => {
            if (editing) {
              updateMutation.mutate({
                id: editing._id,
                data,
              });
            } else {
              createMutation.mutate(data);
            }
          }}
          onCancel={closeModal}
          isSubmitting={
            createMutation.isPending ||
            updateMutation.isPending
          }
        />
      </Modal>
    </div>
  );
}