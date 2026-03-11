"use client";

import { useRouter } from "next/navigation";
import { FormEvent, JSX, useState } from "react";
import Link from "next/link";

const SECRET_STORAGE_KEY = "job-tracker-secret";

export default function LoginForm(): JSX.Element {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const secret = String(formData.get("secret") ?? "").trim();

    if (!secret) {
      setError("Secret is required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/instance/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secret }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        setError(data?.error ?? "Invalid secret.");
        setIsSubmitting(false);
        return;
      }

      window.localStorage.setItem(SECRET_STORAGE_KEY, secret);
      router.replace("/");
    } catch {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const pageHeaderStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  } as const;

  return (
    <section aria-labelledby="login-title" className="card">
      <header className="page-header" style={pageHeaderStyle}>
        <h1 id="login-title" className="page-header__title">
          Log into your job tracker
        </h1>
        <p className="page-header__subtitle">
          Enter your instance secret to retrieve your data.
        </p>
      </header>
      <form
        onSubmit={handleSubmit}
        className="form"
        aria-describedby={error ? "login-error" : undefined}
      >
        <fieldset className="form">
          <legend className="form-label">Instance secret</legend>
          <div className="form-field">
            <label className="form-label" htmlFor="secret">
              Secret
            </label>
            <input
              id="secret"
              name="secret"
              type="password"
              className="form-input"
              autoComplete="current-password"
              required
            />
          </div>
        </fieldset>

        {error ? (
          <p id="login-error" className="form-error" aria-live="polite">
            {error}
          </p>
        ) : null}

        <div style={{ marginTop: "1rem" }}>
          <button
            type="submit"
            className="button"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in…" : "Log in"}
          </button>
        </div>
      </form>
      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <p className="form-help">
          Don&apos;t have an instance yet?{" "}
          <Link href="/register" style={{ color: "var(--color-primary-500)", textDecoration: "underline" }}>
            Register here
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
