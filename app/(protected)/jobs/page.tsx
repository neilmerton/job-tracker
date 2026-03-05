import Link from "next/link";
import { listJobs } from "@/lib/repositories";
import Board from "./components/Board";

export default async function JobsPage() {
  const jobs = await listJobs();

  return (
    <section>
      <header className="page-header">
        <h1 className="page-header__title">Applications</h1>
        <p className="page-header__subtitle">
          View and manage job applications you have sent.
        </p>
        <Link href="/jobs/new" className="button">
          Add application
        </Link>
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
