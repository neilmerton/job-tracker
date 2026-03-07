import Link from "next/link";
import { Connection } from "@/lib/types";
import DetailRow from "@/components/DetailRow";

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
        <DetailRow label="Requested" value={connection.date_requested} />
        <DetailRow label="Last update" value={connection.last_update_date ?? "—"} />
      </dl>
      <div className="connection-card__actions">
        <Link href={`/connections/${connection.id}`} className="button button--secondary">
          View Details
        </Link>
      </div>
    </div>
  );
}
