"use client";

import { useRouter } from "next/navigation";
import { FormEvent, JSX, useState } from "react";

const SECRET_STORAGE_KEY = "job-tracker-secret";

export default function RegisterForm(): JSX.Element {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const secret = String(formData.get("secret") ?? "").trim();
    const confirmSecret = String(formData.get("confirmSecret") ?? "").trim();

    if (!name || !email || !secret || !confirmSecret) {
      setError("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    if (secret !== confirmSecret) {
      setError("Secrets do not match.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/instance/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, secret }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        setError(data?.error ?? "Unable to create instance.");
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

  return (
    <section aria-labelledby="register-title" className="card">
      <header className="page-header">
        <h1 id="register-title" className="page-header__title">
          Register your job tracker
        </h1>
        <p className="page-header__subtitle">
          Create a local instance for a single user. Your secret will be used to
          unlock this instance on this device.
        </p>
      </header>
      <form
        onSubmit={handleSubmit}
        className="form"
        aria-describedby={error ? "register-error" : undefined}
      >
        <fieldset className="form">
          <legend className="form-label">Instance details</legend>
          <div className="form-field">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-input"
              autoComplete="name"
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              autoComplete="email"
              required
            />
          </div>
        </fieldset>

        <fieldset className="form">
          <legend className="form-label">Secret</legend>
          <p className="form-help">
            Choose a secret you can remember. It will be stored locally on this
            device and used to unlock your data.
          </p>
          <div className="form-field">
            <label className="form-label" htmlFor="secret">
              Secret
            </label>
            <input
              id="secret"
              name="secret"
              type="password"
              className="form-input"
              autoComplete="new-password"
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="confirmSecret">
              Confirm secret
            </label>
            <input
              id="confirmSecret"
              name="confirmSecret"
              type="password"
              className="form-input"
              autoComplete="new-password"
              required
            />
          </div>
        </fieldset>

        {error ? (
          <p id="register-error" className="form-error" aria-live="polite">
            {error}
          </p>
        ) : null}

        <div>
          <button
            type="submit"
            className="button"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
          >
            {isSubmitting ? "Creating instance…" : "Create instance"}
          </button>
        </div>
      </form>
    </section>
  );
}

