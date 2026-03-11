"use client";

import { useActionState } from "react";
import { createJobAction } from "../actions";
import Message from "@/components/Message";

export default function NewJobForm() {
  const [state, formAction] = useActionState(createJobAction, null);

  return (
    <form className="form" action={formAction}>
      <Message message={state?.error} type="error" />
      <section>
        <fieldset className="form">
          <legend className="form-label">Job</legend>
          <div className="form-field">
            <label className="form-label" htmlFor="date_applied">
              Date applied
            </label>
            <input
              id="date_applied"
              name="date_applied"
              type="date"
              className="form-input"
              required
              defaultValue={new Date().toISOString().slice(0, 10)}
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="role">
              Role
            </label>
            <input
              id="role"
              name="role"
              type="text"
              className="form-input"
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="description">
              Job description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-textarea"
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="job_type">
              Job type
            </label>
            <select
              id="job_type"
              name="job_type"
              className="form-select"
              required
            >
              <option value="">Select type</option>
              <option value="permanent">Permanent</option>
              <option value="contract">Contract</option>
            </select>
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="source">
              Job source
            </label>
            <select
              id="source"
              name="source"
              className="form-select"
              required
            >
              <option value="">Select source</option>
              <option value="email">Email</option>
              <option value="linkedin">LinkedIn</option>
              <option value="job_board">Job board</option>
              <option value="referral">Referral</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="link">
              Job link
            </label>
            <input
              id="link"
              name="link"
              type="url"
              className="form-input"
            />
          </div>
        </fieldset>
        <fieldset className="form">
          <legend className="form-label">Company & contact</legend>
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
            <label className="form-label" htmlFor="contact_email">
              Contact email
            </label>
            <input
              id="contact_email"
              name="contact_email"
              type="email"
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
      </section>
      <footer>
        <button type="submit" className="button">
          Save application
        </button>
      </footer>
    </form>
  );
}
