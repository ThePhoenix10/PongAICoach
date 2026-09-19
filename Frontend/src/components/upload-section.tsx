"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError, listJobs } from "@/lib/api";
import type { Job } from "@/lib/api-types";
import { AnalysedVideos } from "./analysed-videos";
import { UploadPanel } from "./upload-panel";
import { UploadedVideos } from "./uploaded-videos";
import { VideoOverlay } from "./video-overlay";
import { useSession } from "./session-provider";

const POLL_MS = 4000;

export function UploadSection({ heading = false }: { heading?: boolean }) {
  const { user } = useSession();
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [justUploaded, setJustUploaded] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const message = (e: unknown) =>
    e instanceof ApiError ? e.message : "Could not load your videos.";

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setJobs(await listJobs(50));
      setError(null);
    } catch (e: unknown) {
      setError(message(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    let timer: number | undefined;

    const poll = () => {
      listJobs(50).then(
        (j) => {
          if (cancelled) return;
          setJobs(j);
          setError(null);
          const active = j.some(
            (x) => !x.is_terminal && x.status !== "awaiting_upload",
          );
          if (active) timer = window.setTimeout(poll, POLL_MS);
        },
        (e: unknown) => {
          if (cancelled) return;
          setError(message(e));
          timer = window.setTimeout(poll, POLL_MS * 3);
        },
      );
    };

    poll();
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [refreshKey, user]);

  const mine = user ? jobs : null;
  const pending = mine?.filter((j) => j.status !== "done") ?? null;
  const openJob = mine?.find((j) => j.job_id === justUploaded) ?? null;

  return (
    <>
      {heading && (
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Your videos</h1>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10">
        <section aria-labelledby="upload-heading">
          <h2 id="upload-heading" className="text-lg font-semibold text-slate-900">
            Upload a video
          </h2>
          <p className="text-slate-500 mt-1 text-sm">
            Your video is checked in the browser before uploading, so any issues
            are caught immediately rather than after a long wait.
          </p>
          <div className="mt-4">
            <UploadPanel
              onUploaded={(jobId) => {
                setJustUploaded(jobId);
                setRefreshKey((k) => k + 1);
              }}
            />
          </div>
        </section>

        <section
          aria-labelledby="uploaded-heading"
          className="border-border lg:border-l lg:pl-10"
        >
          <h2 id="uploaded-heading" className="text-lg font-semibold text-slate-900">
            Videos uploaded
          </h2>
          <p className="text-slate-500 mt-1 text-sm">
            Click a video to preview it, or submit it for analysis when you are ready.
          </p>
          <div className="mt-4">
            <UploadedVideos
              jobs={pending}
              error={error}
              loading={loading}
              onReload={() => void reload()}
              onDropped={(id) =>
                setJobs((prev) => prev?.filter((j) => j.job_id !== id) ?? null)
              }
            />
          </div>
        </section>
      </div>

      {mine && <AnalysedVideos jobs={mine} />}

      {openJob && (
        <VideoOverlay
          key={openJob.job_id}
          job={openJob}
          onClose={() => setJustUploaded(null)}
          onSubmitted={() => {
            setJustUploaded(null);
            void reload();
          }}
          onDeleted={(id) => {
            setJobs((prev) => prev?.filter((j) => j.job_id !== id) ?? null);
            setJustUploaded(null);
          }}
        />
      )}
    </>
  );
}