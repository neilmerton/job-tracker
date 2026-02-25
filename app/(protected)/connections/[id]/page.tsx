import Link from "next/link";
import { notFound } from "next/navigation";
import { createConnectionUpdateAction } from "./../actions";
import { getConnectionById, listUpdatesForParent } from "@/lib/repositories";

export default async function ConnectionDetailPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const connection = await getConnectionById(id);
  
  if (!connection) {
    notFound();
  }

  const updates = await listUpdatesForParent(connection.id);

  return (
    <section>
      <header className="page-header">
        <h1 className="page-header__title">Connection details</h1>
        <p className="page-header__subtitle">
          View this connection request and record follow-up activity.
        </p>
      </header>

      <section className="card" aria-labelledby="connection-summary-title">
        <h2 id="connection-summary-title" className="page-header__title">
          Summary
        </h2>
        <dl>
          <div className="form-field">
            <dt className="form-label">Company</dt>
            <dd>{connection.company}</dd>
          </div>
          <div className="form-field">
            <dt className="form-label">Date requested</dt>
            <dd>{connection.date_requested}</dd>
          </div>
          <div className="form-field">
            <dt className="form-label">Status</dt>
            <dd>
              <span className="badge">{connection.status}</span>
            </dd>
          </div>
          <div className="form-field">
            <dt className="form-label">Last update</dt>
            <dd>{connection.last_update_date ?? "—"}</dd>
          </div>
        </dl>
      </section>

      <section
        className="card"
        aria-labelledby="connection-contact-title"
        style={{ marginTop: "1rem" }}
      >
        <h2 id="connection-contact-title" className="page-header__title">
          Contact
        </h2>
        <dl>
          <div className="form-field">
            <dt className="form-label">Contact name</dt>
            <dd>{connection.contact_name ?? "—"}</dd>
          </div>
          <div className="form-field">
            <dt className="form-label">Contact LinkedIn</dt>
            <dd>
              {connection.contact_linkedin_url ? (
                <a href={connection.contact_linkedin_url}>
                  {connection.contact_linkedin_url}
                </a>
              ) : (
                "—"
              )}
            </dd>
          </div>
          <div className="form-field">
            <dt className="form-label">Contact mobile</dt>
            <dd>{connection.contact_mobile ?? "—"}</dd>
          </div>
        </dl>
      </section>

      <section
        className="card"
        aria-labelledby="connection-updates-title"
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
          <h2 id="connection-updates-title" className="page-header__title">
            Updates
          </h2>
          <Link href="/connections" className="button button--secondary">
            Back to connections
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
          action={createConnectionUpdateAction.bind(null, connection.id)}
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
    </section>
  );
}

