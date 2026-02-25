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
        <header>
          <div className="app-shell__brand">Job Tracker</div>
          {instance ? (
            <p className="form-help" style={{ marginTop: "0.25rem" }}>
              Signed in as <strong>{instance.name}</strong>
            </p>
          ) : null}
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
      <div className="app-shell__nav-inner">
        <ul className="nav-list">
          <li>
            <Link
              href="/instance"
              className={`nav-link ${
                isActive("/instance") ? "nav-link--active" : ""
              }`}
            >
              Instance settings
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
        <section className="app-shell__main">
          <div className="app-shell__content">{children}</div>
        </section>
      </div>
    </InstanceGuard>
  );
}

