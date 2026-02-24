import Link from "next/link";
import { notFound } from "next/navigation";
import { createJobUpdateAction } from "./../actions";
import { getJobById, listUpdatesForParent } from "@/lib/repositories";

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await getJobById(params.id);
  if (!job) {
    notFound();
  }

  const updates = await listUpdatesForParent(job.id);

  return (
    <main>
      <header className="page-header">
        <h1 className="page-header__title">Application details</h1>
        <p className="page-header__subtitle">
          View the details of this application and log updates as things move
          forward.
        </p>
      </header>

      <section className="card" aria-labelledby="job-summary-title">
        <h2 id="job-summary-title" className="page-header__title">
          Summary
        </h2>
        <dl>
          <div className="form-field">
            <dt className="form-label">Role</dt>
            <dd>{job.role}</dd>
          </div>
          <div className="form-field">
            <dt className="form-label">Company</dt>
            <dd>{job.company}</dd>
          </div>
          <div className="form-field">
            <dt className="form-label">Date applied</dt>
            <dd>{job.date_applied}</dd>
          </div>
          <div className="form-field">
            <dt className="form-label">Job type</dt>
            <dd>{job.job_type}</dd>
          </div>
          <div className="form-field">
            <dt className="form-label">Source</dt>
            <dd>{job.source}</dd>
          </div>
          {job.link ? (
            <div className="form-field">
              <dt className="form-label">Job link</dt>
              <dd>
                <a href={job.link}>{job.link}</a>
              </dd>
            </div>
          ) : null}
          <div className="form-field">
            <dt className="form-label">Status</dt>
            <dd>
              <span className="badge">{job.status}</span>
            </dd>
          </div>
          <div className="form-field">
            <dt className="form-label">Last update</dt>
            <dd>{job.last_update_date ?? "—"}</dd>
          </div>
        </dl>
      </section>

      <section
        className="card"
        aria-labelledby="job-contact-title"
        style={{ marginTop: "1rem" }}
      >
        <h2 id="job-contact-title" className="page-header__title">
          Contact
        </h2>
        <dl>
          <div className="form-field">
            <dt className="form-label">Contact name</dt>
            <dd>{job.contact_name ?? "—"}</dd>
          </div>
          <div className="form-field">
            <dt className="form-label">Contact email</dt>
            <dd>{job.contact_email ?? "—"}</dd>
          </div>
          <div className="form-field">
            <dt className="form-label">Contact mobile</dt>
            <dd>{job.contact_mobile ?? "—"}</dd>
          </div>
        </dl>
      </section>

      <section
        className="card"
        aria-labelledby="job-description-title"
        style={{ marginTop: "1rem" }}
      >
        <h2 id="job-description-title" className="page-header__title">
          Job description
        </h2>
        <p>{job.description || "No description recorded."}</p>
      </section>

      <section
        className="card"
        aria-labelledby="job-updates-title"
        style={{ marginTop: "1rem" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.75rem",
          }}
        >
          <h2 id="job-updates-title" className="page-header__title">
            Updates
          </h2>
          <Link href="/jobs" className="button button--secondary">
            Back to applications
          </Link>
        </div>

        {updates.length === 0 ? (
          <p className="form-help">
            No updates recorded yet. Use the form below to add your first
            update.
          </p>
        ) : (
          <ol className="updates-list">
            {updates.map((update) => (
              <li key={update.id} className="updates-list__item">
                <p className="form-help">{update.date}</p>
                <p>{update.description}</p>
              </li>
            ))}
          </ol>
        )}

        <form
          className="form"
          action={createJobUpdateAction.bind(null, job.id)}
          style={{ marginTop: "1rem" }}
        >
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
          </fieldset>
          <div>
            <button type="submit" className="button">
              Add update
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

