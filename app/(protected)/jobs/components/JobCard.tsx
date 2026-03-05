"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import Link from "next/link";
import { Job, Update } from "@/lib/repositories";
import { getJobUpdatesAction, addJobUpdateBoardAction } from "../actions";

export default function JobCard({ job }: { job: Job }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [isLoadingUpdates, setIsLoadingUpdates] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [hasFetchedUpdates, setHasFetchedUpdates] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || isExpanded) return;

    return draggable({
      element: el,
      getInitialData: () => ({ jobId: job.id, status: job.status }),
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
    });
  }, [job.id, job.status, isExpanded]);

  const handleExpandToggle = () => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);

    if (nextState && !hasFetchedUpdates) {
      setIsLoadingUpdates(true);
      startTransition(async () => {
        try {
          const fetchedUpdates = await getJobUpdatesAction(job.id);
          setUpdates(fetchedUpdates);
          setHasFetchedUpdates(true);
        } catch (error) {
          console.error("Failed to load updates:", error);
        } finally {
          setIsLoadingUpdates(false);
        }
      });
    }
  };

  const handleUpdateSubmit = async (formData: FormData) => {
    try {
      const newUpdate = await addJobUpdateBoardAction(job.id, formData);
      setUpdates((prev) => [newUpdate, ...prev]);

      // Clear form
      const form = document.getElementById(`update-form-${job.id}`) as HTMLFormElement;
      if (form) form.reset();

    } catch (error) {
      console.error("Failed to add update:", error);
    }
  };

  return (
    <div
      ref={ref}
      className={`card job-card ${isDragging ? "job-card--dragging" : ""} ${isExpanded ? "job-card--expanded" : ""
        }`}
    >
      <div className="job-card__header">
        <h3 className="job-card__role">{job.role}</h3>
        <span className="job-card__date">{job.date_applied}</span>
      </div>
      <div className="job-card__company">{job.company}</div>

      {isExpanded && (
        <div className="job-card__expanded-content" style={{ marginTop: "1rem" }}>
          <dl className="job-card__details">
            <div className="form-field">
              <dt className="form-label" style={{ fontSize: "0.85rem" }}>Job type</dt>
              <dd style={{ margin: 0, fontSize: "0.85rem", color: "var(--color-muted)" }}>{job.job_type}</dd>
            </div>
            <div className="form-field">
              <dt className="form-label" style={{ fontSize: "0.85rem" }}>Source</dt>
              <dd style={{ margin: 0, fontSize: "0.85rem", color: "var(--color-muted)" }}>{job.source}</dd>
            </div>
            {job.link && (
              <div className="form-field">
                <dt className="form-label" style={{ fontSize: "0.85rem" }}>Link</dt>
                <dd style={{ margin: 0, fontSize: "0.85rem" }}>
                  <a href={job.link} target="_blank" rel="noopener noreferrer">View Post</a>
                </dd>
              </div>
            )}
            <div className="form-field">
              <dt className="form-label" style={{ fontSize: "0.85rem" }}>Contact</dt>
              <dd style={{ margin: 0, fontSize: "0.85rem", color: "var(--color-muted)" }}>
                {job.contact_name || job.contact_email || job.contact_mobile ? (
                  <>
                    {job.contact_name && <span>{job.contact_name}</span>}
                    {job.contact_email && <><br /><span>{job.contact_email}</span></>}
                    {job.contact_mobile && <><br /><span>{job.contact_mobile}</span></>}
                  </>
                ) : "—"}
              </dd>
            </div>
          </dl>

          <hr style={{ borderColor: "var(--color-border)", margin: "1rem 0" }} />

          <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem" }}>Updates</h4>

          {isLoadingUpdates ? (
            <p className="form-help">Loading updates...</p>
          ) : updates.length === 0 ? (
            <p className="form-help">No updates recorded yet.</p>
          ) : (
            <ul className="updates-list" style={{ marginTop: 0, marginBottom: "1rem" }}>
              {updates.map((update) => (
                <li key={update.id} className="updates-list__item" style={{ padding: "0.5rem" }}>
                  <span className="form-help" style={{ display: "block", marginBottom: "0.25rem" }}>{update.date}</span>
                  <span style={{ fontSize: "0.9rem" }}>{update.description}</span>
                </li>
              ))}
            </ul>
          )}

          <form
            id={`update-form-${job.id}`}
            className="form"
            action={handleUpdateSubmit}
            style={{ marginTop: "1rem" }}
          >
            <fieldset className="form" style={{ padding: "0.5rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)" }}>
              <legend className="form-label" style={{ fontSize: "0.85rem", padding: "0 0.25rem" }}>Add update</legend>
              <div className="form-field">
                <label className="form-label" htmlFor={`update_date_${job.id}`} style={{ fontSize: "0.85rem" }}>
                  Date
                </label>
                <input
                  id={`update_date_${job.id}`}
                  name="date"
                  type="date"
                  className="form-input"
                  style={{ padding: "0.25rem", fontSize: "0.85rem" }}
                  defaultValue={new Date().toISOString().slice(0, 10)}
                />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor={`update_description_${job.id}`} style={{ fontSize: "0.85rem" }}>
                  Description
                </label>
                <textarea
                  id={`update_description_${job.id}`}
                  name="description"
                  className="form-textarea"
                  style={{ minHeight: "4rem", padding: "0.25rem", fontSize: "0.85rem" }}
                  required
                />
              </div>
              <button type="submit" className="button" style={{ padding: "0.25rem 0.5rem", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                Save update
              </button>
            </fieldset>

          </form>
        </div>
      )}

      <div className="job-card__footer" style={{ marginTop: "1rem", gap: "0.5rem" }}>
        <button onClick={handleExpandToggle} className="button button--secondary" style={{ flex: 1 }}>
          {isExpanded ? "Collapse" : "Expand"}
        </button>
        <Link href={`/jobs/${job.id}`} className="button button--secondary">
          ✏️
        </Link>
      </div>
    </div>
  );
}
