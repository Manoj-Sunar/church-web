"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import { Spinner } from "@/app/Components/UI/Spinner";
import { Heading } from "@/app/Components/UI/Heading";
import AdminContentForm from "./AdminContentForm";
import { PageContentResponse, PageKey } from "@/app/Types/PageContent.types";
import { publicAPI } from "@/app/API/public.api";


const PAGES: PageKey[] = [
  "home",
  "about",
  "sermons",
  "ministries",
  "events",
  "contact",
  "donate",
];

export default function AdminContentPage() {
  const [activePage, setActivePage] = React.useState<PageKey>("home");

  const {
    data: content,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery<PageContentResponse>({
    queryKey: ["content", activePage],
    queryFn: () => publicAPI.getPageContentByPageName(activePage),
    placeholderData: (previousData) => previousData,
    staleTime: 60_000,
  });

  if (isLoading && !content) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        {error instanceof Error ? error.message : "Failed to load page content"}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Heading level={1}>Page Content</Heading>
          <p className="text-slate-500">
            Edit text and images across your website
          </p>
          {isFetching ? (
            <p className="mt-1 text-xs text-slate-400">
              Loading {activePage}…
            </p>
          ) : null}
        </div>
      </div>

      <div className="mb-8 flex gap-4 overflow-x-auto pb-2">
        {PAGES.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => setActivePage(page)}
            className={`whitespace-nowrap rounded-2xl px-6 py-3 font-display font-bold capitalize transition-all ${
              activePage === page
                ? "bg-primary text-white disney-shadow"
                : "bg-white text-slate-500 hover:bg-primary-soft hover:text-primary"
            }`}
            aria-current={activePage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <AdminContentForm activePage={activePage} content={content} />
    </div>
  );
}