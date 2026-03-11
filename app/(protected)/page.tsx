import { listJobs } from "@/lib/services/JobService";
import { listConnections } from "@/lib/services/ConnectionService";
import PageHeader from "@/components/PageHeader";
import SummarySection from "@/components/SummarySection";
import DashboardAddMenu from "./components/DashboardAddMenu";
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
        <DashboardAddMenu />
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
