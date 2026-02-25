import { listConnections, listJobs } from "@/lib/repositories";
import Link from "next/dist/client/link";

export default async function DashboardPage() {
  const [jobs, connections] = await Promise.all([
    listJobs(),
    listConnections(),
  ]);

  const jobCountByStatus = jobs.reduce<Record<string, number>>((acc, job) => {
    acc[job.status] = (acc[job.status] ?? 0) + 1;
    return acc;
  }, {});

  const connectionCountByStatus = connections.reduce<Record<string, number>>(
    (acc, connection) => {
      acc[connection.status] = (acc[connection.status] ?? 0) + 1;
      return acc;
    },
    {},
  );

  return (
    <main>
      <header className="page-header">
        <h1 className="page-header__title">Overview</h1>
        <p className="page-header__subtitle">
          High-level snapshot of your job applications and networking activity.
        </p>
      </header>

      <section
        aria-labelledby="applications-summary-title"
        className="card"
        style={{ marginBottom: "1rem" }}
      >
        <header className="card__header">
          <h2 id="applications-summary-title" className="page-header__title">
            Applications
          </h2>
          <Link href="/jobs/new" className="button">
            Add application
          </Link>
        </header>
        <p className="form-help">
          You have {jobs.length} tracked application
          {jobs.length === 1 ? "" : "s"}.
        </p>
        {jobs.length > 0 ? (
          <ul className="updates-list" aria-label="Applications by status">
            {Object.entries(jobCountByStatus).map(([status, count]) => (
              <li key={status} className="updates-list__item">
                <span className="badge">{status}</span>{" "}
                <span>
                  {count} application{count === 1 ? "" : "s"}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <section
        aria-labelledby="connections-summary-title"
        className="card"
      >
        <header className="card__header">
          <h2 id="connections-summary-title" className="page-header__title">
            Connection requests
          </h2>
          <Link href="/connections/new" className="button">
            Add connection
          </Link>
        </header>
        <p className="form-help">
          You have {connections.length} tracked connection request
          {connections.length === 1 ? "" : "s"}.
        </p>
        {connections.length > 0 ? (
          <ul className="updates-list" aria-label="Connection requests by status">
            {Object.entries(connectionCountByStatus).map(
              ([status, count]) => (
                <li key={status} className="updates-list__item">
                  <span className="badge">{status}</span>{" "}
                  <span>
                    {count} request{count === 1 ? "" : "s"}
                  </span>
                </li>
              ),
            )}
          </ul>
        ) : null}
      </section>
    </main>
  );
}

