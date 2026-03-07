"use client";

import { useActionState } from "react";
import { createJobUpdateAction } from "../actions";
import ErrorMessage from "@/components/ErrorMessage";

export default function JobUpdateForm({ jobId }: { jobId: string }) {
  const updateActionWithId = createJobUpdateAction.bind(null, jobId);
  const [state, formAction] = useActionState(updateActionWithId, null);

  return (
    <form className="form" action={formAction} style={{ marginTop: "1rem" }}>
      <ErrorMessage error={state?.error} />
      <fieldset className="form">
        <legend className="form-label">Add update</legend>
        <div className="form-field">
          <label className="form-label" htmlFor="update_date">
            Date
          </label>
          <input
            id="update_date"
            name="date"
            type="date"
            className="form-input"
            defaultValue={new Date().toISOString().slice(0, 10)}
          />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="update_description">
            Description
          </label>
          <textarea
            id="update_description"
            name="description"
            className="form-textarea"
            required
          />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="update_status">
            Status
          </label>
          <select id="update_status" name="status" className="form-select" required>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </fieldset>
      <div>
        <button type="submit" className="button">
          Add update
        </button>
      </div>
    </form>
  );
}
