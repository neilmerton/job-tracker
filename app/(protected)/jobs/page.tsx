import Link from "next/link";
import { listJobs } from "@/lib/repositories";

export default async function JobsPage() {
  const jobs = await listJobs();

  return (
    <main>
      <header className="page-header">
        <h1 className="page-header__title">Applications</h1>
        <p className="page-header__subtitle">
          View and manage job applications you have sent.
        </p>
      </header>

      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.75rem",
          }}
        >
          <h2 className="page-header__title" style={{ fontSize: "1.1rem" }}>
            Applications
          </h2>
          <Link href="/jobs/new" className="button">
            Add application
          </Link>
        </div>

        {jobs.length === 0 ? (
          <p className="form-help">
            You have not added any applications yet. Start by adding your first
            job.
          </p>
        ) : (
          <table className="table">
            <caption className="sr-only">Job applications</caption>
            <thead>
              <tr>
                <th scope="col">Date applied</th>
                <th scope="col">Role</th>
                <th scope="col">Company</th>
                <th scope="col">Status</th>
                <th scope="col">Last update</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.date_applied}</td>
                  <td>{job.role}</td>
                  <td>{job.company}</td>
                  <td>
                    <span className="badge">{job.status}</span>
                  </td>
                  <td>{job.last_update_date ?? "—"}</td>
                  <td>
                    <Link href={`/jobs/${job.id}`} className="button button--secondary">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}

