import Link from "next/link";
import { listConnections } from "@/lib/repositories";

export default async function ConnectionsPage() {
  const connections = await listConnections();

  return (
    <section>
      <header className="page-header">
        <h1 className="page-header__title">Connection requests</h1>
        <p className="page-header__subtitle">
          Track outreach to recruiters and other contacts.
        </p>
      </header>

      <div className="card">
        <header className="card__header">
          <h2 className="page-header__title" style={{ fontSize: "1.1rem" }}>
            Connection requests
          </h2>
          <Link href="/connections/new" className="button">
            Add connection
          </Link>
        </header>

        {connections.length === 0 ? (
          <p className="form-help">
            You have not added any connection requests yet. Start by recording a
            recruiter or contact you have reached out to.
          </p>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <caption className="sr-only">Connection requests</caption>
              <thead>
                <tr>
                  <th scope="col">Details</th>
                  <th scope="col">Date requested</th>
                  <th scope="col">Company</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Status</th>
                  <th scope="col">Last update</th>
                </tr>
              </thead>
              <tbody>
                {connections.map((connection) => (
                  <tr key={connection.id}>
                    <td>
                      <Link
                        href={`/connections/${connection.id}`}
                        className="button button--secondary"
                      >
                        View
                      </Link>
                    </td>
                    <td>{connection.date_requested}</td>
                    <td>{connection.company}</td>
                    <td>{connection.contact_name ?? "—"}</td>
                    <td>
                      <span className="badge">{connection.status}</span>
                    </td>
                    <td>{connection.last_update_date ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

