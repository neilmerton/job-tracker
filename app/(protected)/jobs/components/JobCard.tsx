"use client";

import { useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import Link from "next/link";
import { Job } from "@/lib/repositories";

export default function JobCard({ job }: { job: Job }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        return draggable({
            element: el,
            getInitialData: () => ({ jobId: job.id, status: job.status }),
            onDragStart: () => setIsDragging(true),
            onDrop: () => setIsDragging(false),
        });
    }, [job.id, job.status]);

    return (
        <div
            ref={ref}
            className={`card job-card ${isDragging ? "job-card--dragging" : ""}`}
        >
            <div className="job-card__header">
                <h3 className="job-card__role">{job.role}</h3>
                <span className="job-card__date">{job.date_applied}</span>
            </div>
            <div className="job-card__company">{job.company}</div>
            <div className="job-card__footer">
                <Link href={`/jobs/${job.id}`} className="button button--secondary">
                    View
                </Link>
            </div>
        </div>
    );
}
