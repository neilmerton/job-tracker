"use client";

import { useActionState, useEffect } from "react";
import Message from "@/components/Message";
import { createConnectionAction } from "../actions";
import { useFormStatus } from "react-dom";

export default function ConnectionFormAdd() {
  const [state, formAction] = useActionState(createConnectionAction, null);

  return (
    <form className="form" action={formAction} id="add-connection-form">
      <Message message={state?.error} type="error" />
      <section>
        <fieldset className="form">
          <legend className="form-label">Request</legend>
          <div className="form-field">
            <label className="form-label" htmlFor="date_requested">
              Date requested
            </label>
            <input
              id="date_requested"
              name="date_requested"
              type="date"
              className="form-input"
              required
              defaultValue={new Date().toISOString().slice(0, 10)}
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="company">
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              className="form-input"
              required
            />
          </div>
        </fieldset>

        <fieldset className="form">
          <legend className="form-label">Contact</legend>
          <div className="form-field">
            <label className="form-label" htmlFor="contact_name">
              Contact name
            </label>
            <input
              id="contact_name"
              name="contact_name"
              type="text"
              className="form-input"
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="contact_linkedin_url">
              Contact LinkedIn URL
            </label>
            <input
              id="contact_linkedin_url"
              name="contact_linkedin_url"
              type="url"
              className="form-input"
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="contact_mobile">
              Contact mobile number
            </label>
            <input
              id="contact_mobile"
              name="contact_mobile"
              type="tel"
              className="form-input"
            />
          </div>
        </fieldset>

        <fieldset className="form">
          <legend className="form-label">Status</legend>
          <div className="form-field">
            <label className="form-label" htmlFor="status">
              Current status
            </label>
            <select
              id="status"
              name="status"
              className="form-select"
              required
            >
              <option value="">Select status</option>
              <option value="unanswered">Unanswered</option>
              <option value="accepted">Accepted</option>
            </select>
          </div>
        </fieldset>
      </section>

      <footer>
        <SubmitButton />
      </footer>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="button" disabled={pending}>
      {pending ? "Saving..." : "Save connection"}
    </button>
  );
}
