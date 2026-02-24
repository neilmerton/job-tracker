"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useInstance } from "@/components/InstanceGuard";

const SECRET_STORAGE_KEY = "job-tracker-secret";

export default function InstanceSettings(): JSX.Element {
  const { instance, setInstance } = useInstance();
  const router = useRouter();
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  if (!instance) {
    return (
      <p className="form-help">
        No instance is currently registered. Please register a new instance
        first.
      </p>
    );
  }

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUpdateError(null);
    setIsUpdating(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    if (!name || !email) {
      setUpdateError("Name and email are required.");
      setIsUpdating(false);
      return;
    }

    try {
      const res = await fetch("/api/instance/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        setUpdateError(data?.error ?? "Unable to update instance.");
        setIsUpdating(false);
        return;
      }

      const data = (await res.json()) as { instance?: typeof instance };
      if (data.instance) {
        setInstance(data.instance);
      }
    } catch {
      setUpdateError("Something went wrong. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDeleteError(null);
    setIsDeleting(true);

    const formData = new FormData(event.currentTarget);
    const secret = String(formData.get("secret") ?? "").trim();

    if (!secret) {
      setDeleteError("Secret is required to delete the instance.");
      setIsDeleting(false);
      return;
    }

    try {
      const res = await fetch("/api/instance/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        setDeleteError(
          data?.error ?? "Unable to delete instance with that secret.",
        );
        setIsDeleting(false);
        return;
      }

      window.localStorage.removeItem(SECRET_STORAGE_KEY);
      router.replace("/register");
      router.refresh();
    } catch {
      setDeleteError("Something went wrong. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="card">
      <section aria-labelledby="instance-details-title">
        <h2 id="instance-details-title" className="page-header__title">
          Instance details
        </h2>
        <p className="form-help">
          These details describe the single-user instance of this job tracker.
        </p>

        <form
          className="form"
          onSubmit={handleUpdate}
          aria-describedby={updateError ? "instance-update-error" : undefined}
        >
          <div className="form-field">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-input"
              defaultValue={instance.name}
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
              defaultValue={instance.email}
              required
            />
          </div>
          {updateError ? (
            <p
              id="instance-update-error"
              className="form-error"
              aria-live="polite"
            >
              {updateError}
            </p>
          ) : null}
          <div>
            <button
              type="submit"
              className="button"
              disabled={isUpdating}
              aria-disabled={isUpdating}
            >
              {isUpdating ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </section>

      <section
        aria-labelledby="instance-delete-title"
        style={{ marginTop: "2rem" }}
      >
        <h2 id="instance-delete-title" className="page-header__title">
          Delete instance
        </h2>
        <p className="form-help">
          Deleting your instance will remove{" "}
          <strong>all data associated with this job tracker</strong>, including
          applications, connection requests, and their updates. This action
          cannot be undone.
        </p>

        <form
          className="form"
          onSubmit={handleDelete}
          aria-describedby={deleteError ? "instance-delete-error" : undefined}
        >
          <fieldset className="form">
            <legend className="form-label">Confirm deletion</legend>
            <div className="form-field">
              <label className="form-label" htmlFor="confirm_text">
                Type DELETE to confirm
              </label>
              <input
                id="confirm_text"
                name="confirm_text"
                type="text"
                className="form-input"
                value={confirmText}
                onChange={(event) => setConfirmText(event.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="secret">
                Instance secret
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

          {deleteError ? (
            <p
              id="instance-delete-error"
              className="form-error"
              aria-live="polite"
            >
              {deleteError}
            </p>
          ) : null}

          <div>
            <button
              type="submit"
              className="button button--danger"
              disabled={isDeleting || confirmText !== "DELETE"}
              aria-disabled={isDeleting || confirmText !== "DELETE"}
            >
              {isDeleting ? "Deleting…" : "Delete instance and all data"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

