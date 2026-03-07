import Link from "next/link";
import ConnectionFormAdd from "../components/ConnectionFormAdd";

export default function NewConnectionPage() {
  return (
    <section>
      <header className="page-header">
        <h1 className="page-header__title">Add connection</h1>
        <p className="page-header__subtitle">
          Record a connection request you have sent, for example on LinkedIn.
        </p>
        <Link href="/connections" className="button">
          Cancel
        </Link>
      </header>

      <section className="card" aria-labelledby="new-connection-title">
        <h2 id="new-connection-title" className="page-header__title">
          Connection details
        </h2>
        <ConnectionFormAdd />
      </section>
    </section>
  );
}
