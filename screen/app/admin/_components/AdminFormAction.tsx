"use client";


import { Button } from "@/app/Components/UI/Button/Button";

interface FormActionsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  className?: string;
}

export function FormActions({
  onCancel,
  isSubmitting = false,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  className = "",
}: FormActionsProps) {
  return (
    <div className={`flex gap-4 pt-4 ${className}`}>
      <Button
        type="button"
        variant="outline"
        className="flex-grow py-4"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        {cancelLabel}
      </Button>

      <Button
        type="submit"
        className="flex-grow py-4"
        isLoading={isSubmitting}
      >
        {submitLabel}
      </Button>
    </div>
  );
}