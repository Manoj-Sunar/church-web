"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/app/Components/UI/Card";


export type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
};

export type Action<T> = {
  label: string;
  icon: React.ReactNode;
  onClick: (item: T) => void;
  className?: string;
  disabled?: boolean;
  show?: (item: T) => boolean;
};

export type TableImageConfig = {
  width?: number;
  height?: number;
  className?: string;
  fallback?: string;
};

interface AdminTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  imageConfig?: {
    src: keyof T;
    alt: keyof T;
    config?: TableImageConfig;
  };
  emptyMessage?: string;
  isLoading?: boolean;
  minWidth?: string;
  onRowClick?: (item: T) => void;
  rowClassName?: string;
}

export function AdminTable<T>({
  data,
  columns,
  actions,
  imageConfig,
  emptyMessage = "No items found.",
  isLoading = false,
  minWidth = "900px",
  onRowClick,
  rowClassName = "",
}: AdminTableProps<T>) {
  if (isLoading) {
    return (
      <Card className="p-8 border-4 border-white disney-shadow">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-0 border-4 border-white disney-shadow overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left" style={{ minWidth }}>
          <thead className="bg-primary-soft border-b-4 border-white">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key as string}
                  className={`p-6 font-display font-bold text-primary ${col.className || ""}`}
                >
                  {col.header}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className="p-6 font-display font-bold text-primary text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y-4 divide-slate-50">
            {data?.map((item) => (
              <tr
                key={(item as any)._id || (item as any).id}
                onClick={() => onRowClick?.(item)}
                className={`hover:bg-slate-50 transition-colors ${onRowClick ? "cursor-pointer" : ""
                  } ${rowClassName}`}
              >
                {columns.map((col) => (
                  <td key={col.key as string} className="p-6">
                    {col.render ? (
                      col.render(item)
                    ) : (
                      <RenderCell
                        item={item}
                        columnKey={col.key}
                        imageConfig={imageConfig}
                      />
                    )}
                  </td>
                ))}

                {actions && actions.length > 0 && (
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      {actions
                        .filter((action) => !action.show || action.show(item))
                        .map((action, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              action.onClick(item);
                            }}
                            disabled={action.disabled}
                            className={`p-2 transition-colors ${action.className || "text-slate-400 hover:text-primary"
                              }`}
                            aria-label={`${action.label} ${String(
                              item[imageConfig?.alt || ("title" as keyof T)] || ""
                            )}`}
                          >
                            {action.icon}
                          </button>
                        ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (actions?.length ? 1 : 0)}
                  className="p-10 text-center text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function RenderCell<T>({
  item,
  columnKey,
  imageConfig,
}: {
  item: T;
  columnKey: keyof T | string;
  imageConfig?: AdminTableProps<T>["imageConfig"];
}) {
  // Handle image column
  if (imageConfig && columnKey === imageConfig.src) {
    const src = item[imageConfig.src] as string;
    const alt = item[imageConfig.alt] as string;
    const { width = 48, height = 48, className = "", fallback } = imageConfig.config || {};

    if (!src) return null;

    return (
      <div
        className={`relative overflow-hidden rounded-xl border-2 border-white disney-shadow bg-slate-100 ${className}`}
        style={{ width, height }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${width}px`}
          className="object-cover"
        />
      </div>
    );
  }

  // Default render
  return <span>{String(item[columnKey as keyof T] || "")}</span>;
}