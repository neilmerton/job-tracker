"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { InstanceGuard, useInstance } from "@/components/InstanceGuard";

function Navigation() {
  const pathname = usePathname();
  const { instance } = useInstance();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="app-shell__nav" aria-label="Primary">
      <div className="app-shell__nav-inner">
        <header className="app-shell__nav-inner__header">
          <div>
            <div className="app-shell__brand">Job Tracker</div>
            {instance ? (
              <p className="form-help" style={{ marginTop: "0.25rem" }}>
                Signed in as <strong>{instance.name}</strong>
              </p>
            ) : null}
          </div>
          <Link
            href="/instance"
            className={`icon-link ${
              isActive("/instance") ? "active" : ""
            }`}
            aria-label="Instance settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6"/><path d="m19.622 10.395l-1.097-2.65L20 6l-2-2l-1.735 1.483l-2.707-1.113L12.935 2h-1.954l-.632 2.401l-2.645 1.115L6 4L4 6l1.453 1.789l-1.08 2.657L2 11v2l2.401.656L5.516 16.3L4 18l2 2l1.791-1.46l2.606 1.072L11 22h2l.604-2.387l2.651-1.098C16.697 18.832 18 20 18 20l2-2l-1.484-1.75l1.098-2.652l2.386-.62V11z"/></g></svg>
          </Link>
        </header>
        <ul className="nav-list">
          <li>
            <Link
              href="/"
              className={`nav-link ${isActive("/") ? "nav-link--active" : ""}`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/jobs"
              className={`nav-link ${
                isActive("/jobs") ? "nav-link--active" : ""
              }`}
            >
              Applications
            </Link>
          </li>
          <li>
            <Link
              href="/connections"
              className={`nav-link ${
                isActive("/connections") ? "nav-link--active" : ""
              }`}
            >
              Connections
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <InstanceGuard>
      <div className="app-shell">
        <Navigation />
        <main className="app-shell__main">
          <div className="app-shell__content">{children}</div>
        </main>
      </div>
    </InstanceGuard>
  );
}

