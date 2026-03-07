import Link from "next/link";
import { Connection } from "@/lib/repositories";

export default function ConnectionCard({ connection }: { connection: Connection }) {
    return (
        <div className="card connection-card">
            <div className="connection-card__header">
                <div>
                    <h2 className="connection-card__contact">{connection.contact_name ?? "Unknown Contact"}</h2>
                    <div className="connection-card__company">{connection.company}</div>
                </div>
                <span className="badge">{connection.status}</span>
            </div>
            <dl className="connection-card__details">
                <div className="form-field">
                    <dt className="form-label">Requested</dt>
                    <dd>{connection.date_requested}</dd>
                </div>
                <div className="form-field">
                    <dt className="form-label">Last update</dt>
                    <dd>{connection.last_update_date ?? "—"}</dd>
                </div>
            </dl>
            <div className="connection-card__actions">
                <Link href={`/connections/${connection.id}`} className="button button--secondary">
                    View Details
                </Link>
            </div>
        </div>
    );
}
