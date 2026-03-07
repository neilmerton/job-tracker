import Link from "next/link";
import JobFormAdd from "../components/JobFormAdd";

export default function NewJobPage() {
  return (
    <section>
      <header className="page-header">
        <h1 className="page-header__title">Add application</h1>
        <p className="page-header__subtitle">
          Record the details of a job application you have sent.
        </p>
        <Link href="/jobs" className="button">
          Cancel
        </Link>
      </header>

      <section className="card" aria-labelledby="new-job-title">
        <h2 id="new-job-title" className="page-header__title">
          Application details
        </h2>
        <JobFormAdd />
      </section>
    </section>
  );
}

