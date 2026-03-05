"use client";

import { useEffect, useState, useTransition } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import Column from "./Column";
import JobCard from "./JobCard";
import { Job } from "@/lib/repositories";
import { updateJobStatusOnlyAction } from "../actions";

const COLUMNS = ["applied", "interviewing", "offer", "rejected"];

export default function Board({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setJobs(initialJobs);
  }, [initialJobs]);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) return;

        const jobId = source.data.jobId as string;
        const newStatus = destination.data.status as string;

        if (source.data.status === newStatus) return;

        // Optimistic update
        setJobs((prev) =>
          prev.map((job) =>
            job.id === jobId ? { ...job, status: newStatus } : job
          )
        );

        // Server action
        startTransition(() => {
          updateJobStatusOnlyAction(jobId, newStatus);
        });
      },
    });
  }, []);

  return (
    <div className="board">
      {COLUMNS.map((status) => (
        <Column key={status} status={status}>
          {jobs
            .filter((job) => job.status === status)
            .map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
        </Column>
      ))}
    </div>
  );
}
