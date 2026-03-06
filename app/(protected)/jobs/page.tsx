import Drawer from "@/components/Drawer";
import { listJobs } from "@/lib/repositories";
import Board from "./components/Board";
import JobFormAdd from "./components/JobFormAdd";

export default async function JobsPage() {
  const jobs = await listJobs();

  return (
    <section>
      <header className="page-header">
        <h1 className="page-header__title">Applications</h1>
        <p className="page-header__subtitle">
          View and manage job applications you have sent.
        </p>
        <Drawer
          id="add-job"
          buttonLabel="Add application"
          drawerTitle="New application"
        >
          <JobFormAdd />
        </Drawer>
      </header>

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
