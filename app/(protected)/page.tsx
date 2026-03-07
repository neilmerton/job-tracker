import { listJobs } from "@/lib/services/JobService";
import { listConnections } from "@/lib/services/ConnectionService";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SummarySection from "@/components/SummarySection";
import { countByStatus } from "@/lib/utils/dataProcessing";

export default async function DashboardPage() {
  const [jobs, connections] = await Promise.all([
    listJobs(),
    listConnections(),
  ]);

  const jobCountByStatus = countByStatus(jobs, "status");
  const connectionCountByStatus = countByStatus(connections, "status");

  return (
    <section>
      <PageHeader
        title="Overview"
        subtitle="High-level snapshot of your job applications and networking activity."
      >
        <button className="button" id="addButton" popoverTarget="add-menu" style={{ anchorName: "--add-menu-btn" } as React.CSSProperties}>
          <span className="label">Add</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-6-6h12z" /></svg>
        </button>
        <nav id="add-menu" className="dropdown" popover="" style={{ positionAnchor: "--add-menu-btn" } as React.CSSProperties} role="menu" aria-labelledby="addButton">
          <ul className="menu" role="menu" aria-labelledby="addButton">
            <li role="menuitem">
              <Link href="/jobs/new">
                Application
              </Link>
            </li>
            <li role="menuitem">
              <Link href="/connections/new">
                Connection
              </Link>
            </li>
          </ul>
        </nav>
      </PageHeader>

      <SummarySection
        id="applications-summary"
        title="Applications"
        totalCount={jobs.length}
        itemNameSingular="application"
        itemNamePlural="applications"
        countsByStatus={jobCountByStatus}
        style={{ marginBlockEnd: "2rem" }}
      />

      <SummarySection
        id="connections-summary"
        title="Connections"
        totalCount={connections.length}
        itemNameSingular="connection request"
        itemNamePlural="connection requests"
        countsByStatus={connectionCountByStatus}
      />
    </section>
  );
}
