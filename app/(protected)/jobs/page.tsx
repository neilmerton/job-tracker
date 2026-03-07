import Drawer from "@/components/Drawer";
import PageHeader from "@/components/PageHeader";
import { listJobs } from "@/lib/services/JobService";
import Board from "./components/Board";
import JobFormAdd from "./components/JobFormAdd";

export default async function JobsPage() {
  const jobs = await listJobs();

  return (
    <section>
      <PageHeader
        title="Applications"
        subtitle="View and manage job applications you have sent."
      >
        <Drawer
          id="add-job"
          buttonLabel="Add application"
          drawerTitle="New application"
        >
          <JobFormAdd />
        </Drawer>
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
