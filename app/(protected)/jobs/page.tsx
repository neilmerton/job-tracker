import PageHeader from "@/components/PageHeader";
import { listJobs } from "@/lib/services/JobService";
import Board from "./components/Board";
import AddJobButton from "./components/AddJobButton";

export default async function JobsPage() {
  const jobs = await listJobs();

  return (
    <section>
      <PageHeader
        title="Applications"
        subtitle="View and manage job applications you have sent."
      >
        <AddJobButton />
      </PageHeader>

      {jobs.length === 0 ? (
        <p className="form-help">
          You have not added any applications yet. Start by adding your first
          job.
        </p>
      ) : (
        <Board initialJobs={jobs} />
      )}
    </section>
  );
}
