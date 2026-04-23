"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Upload, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { Button } from "@/app/Components/UI/Button/Button";
import { ErrorMessage } from "@/app/Components/Common/ErrorMessage";
import { adminAPI } from "@/app/API/admin.api";

export interface ImageUploaderProps {
    value?: string | null;
    onChange: (value: string, publicId?: string) => void;
    onRemove?: () => void;
    label?: string;
    aspectRatio?: "square" | "video" | "custom";
    width?: number;
    height?: number;
    className?: string;
    maxSize?: number;
    showPreview?: boolean;
    disabled?: boolean;
}

export function ImageUploader({
    value,
    onChange,
    onRemove,
    label = "Image",
    aspectRatio = "square",
    width = 120,
    height = 120,
    className = "",
    maxSize = 5,
    showPreview = true,
    disabled = false,
}: ImageUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // ✅ Sync external value
    useEffect(() => {
        setPreviewUrl(value || null);
    }, [value]);

    // ✅ Cleanup memory (important)
    useEffect(() => {
        return () => {
            if (previewUrl?.startsWith("blob:")) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const aspectRatioClasses = {
        square: "aspect-square",
        video: "aspect-video",
        custom: "",
    };

    // ✅ HANDLE FILE
    const handleFileChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);

        // ✅ VALIDATION
        if (file.size > maxSize * 1024 * 1024) {
            setError(`File must be smaller than ${maxSize}MB`);
            return;
        }

        if (!file.type.startsWith("image/")) {
            setError("Only image files are allowed");
            return;
        }

        // ✅ LOCAL PREVIEW
        const localPreview = URL.createObjectURL(file);
        setPreviewUrl(localPreview);

        try {
            setIsUploading(true);

            const uploaded = await adminAPI.imageUpload(file);

            // ✅ SUCCESS
            setPreviewUrl(uploaded.url);
            onChange(uploaded.url, uploaded.publicId);
        } catch (err: any) {
            // ❌ ERROR
            setPreviewUrl(value || null);

            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Image upload failed";

            setError(message);
        } finally {
            setIsUploading(false);
        }
    };

    // ✅ REMOVE IMAGE
    const handleRemove = () => {
        setPreviewUrl(null);
        setError(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        if (onRemove) {
            onRemove();
        } else {
            onChange("", "");
        }
    };

    const handleClick = () => {
        if (!disabled && !isUploading) {
            fileInputRef.current?.click();
        }
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="ml-1 font-semibold text-slate-700">
                    {label}
                </label>
            )}

            <div className="flex md:flex-row flex-col gap-4">
                {/* IMAGE BOX */}
                <div
                    className={`
            relative rounded-xl border-2 border-dashed border-slate-300
            bg-slate-50 flex items-center justify-center overflow-hidden group
            ${aspectRatioClasses[aspectRatio]}
            ${disabled || isUploading
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"}
          `}
                    style={{ width, height }}
                    onClick={handleClick}
                >
                    {/* PREVIEW */}
                    {previewUrl && showPreview ? (
                        <>
                            <Image
                                src={previewUrl}
                                alt="Preview"
                                fill
                                sizes={`${width}px`}
                                className="object-cover"
                                unoptimized
                            />

                            {!disabled && !isUploading && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemove();
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </>
                    ) : (
                        <ImageIcon className="text-slate-300" size={32} />
                    )}

                    {/* HOVER OVERLAY */}
                    {!previewUrl && !isUploading && !disabled && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <Upload className="text-white" size={22} />
                        </div>
                    )}

                    {/* LOADING */}
                    {isUploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Loader2 className="animate-spin text-white" size={24} />
                        </div>
                    )}

                    {/* INPUT */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={disabled || isUploading}
                    />
                </div>

                {/* BUTTON */}
                <div className="flex-1">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleClick}
                        disabled={disabled || isUploading}
                    >
                        {isUploading
                            ? "Uploading..."
                            : previewUrl
                                ? "Change Image"
                                : "Upload Image"}
                    </Button>

                    <p className="mt-2 text-xs text-slate-500">
                        Max size: {maxSize}MB
                    </p>
                </div>
            </div>

            {/* ERROR */}
            {error && <ErrorMessage message={error} />}
        </div>
    );
}