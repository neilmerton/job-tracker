"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

type Instance = {
  id: string;
  name: string;
  email: string;
};

type InstanceContextValue = {
  instance: Instance | null;
  setInstance: Dispatch<SetStateAction<Instance | null>>;
};

const InstanceContext = createContext<InstanceContextValue | undefined>(
  undefined,
);

export function useInstance(): InstanceContextValue {
  const ctx = useContext(InstanceContext);
  if (!ctx) {
    throw new Error("useInstance must be used within InstanceGuard");
  }
  return ctx;
}

const SECRET_STORAGE_KEY = "job-tracker-secret";

type GuardStatus = "checking" | "ready";

export function InstanceGuard({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [instance, setInstance] = useState<Instance | null>(null);
  const [status, setStatus] = useState<GuardStatus>("checking");
  const [showSecretPrompt, setShowSecretPrompt] = useState(false);
  const hasValidatedOnceRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function validateFromStorage() {
      if (typeof window === "undefined") return;

      const storedSecret = window.localStorage.getItem(SECRET_STORAGE_KEY);
      if (!storedSecret) {
        router.replace("/register");
        return;
      }

      try {
        const res = await fetch("/api/instance/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ secret: storedSecret }),
        });

        if (!res.ok) {
          window.localStorage.removeItem(SECRET_STORAGE_KEY);
          router.replace("/register");
          return;
        }

        const data = (await res.json()) as { instance: Instance };
        if (!cancelled) {
          setInstance(data.instance);
          setStatus("ready");
          hasValidatedOnceRef.current = true;
        }
      } catch {
        if (!cancelled) {
          setStatus("ready");
        }
      }
    }

    validateFromStorage();

    if (typeof window === "undefined") {
      return;
    }

    const intervalId = window.setInterval(() => {
      const storedSecret = window.localStorage.getItem(SECRET_STORAGE_KEY);
      if (!storedSecret && hasValidatedOnceRef.current) {
        setShowSecretPrompt(true);
      }
    }, 60000);

    const handleStorage = (event: StorageEvent) => {
      if (
        event.key === SECRET_STORAGE_KEY &&
        !event.newValue &&
        hasValidatedOnceRef.current
      ) {
        setShowSecretPrompt(true);
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      window.removeEventListener("storage", handleStorage);
    };
  }, [router]);

  const handleSecretSubmit = async (secret: string) => {
    if (!secret) return;
    try {
      const res = await fetch("/api/instance/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secret }),
      });

      if (!res.ok) {
        return;
      }

      const data = (await res.json()) as { instance: Instance };
      window.localStorage.setItem(SECRET_STORAGE_KEY, secret);
      setInstance(data.instance);
      setShowSecretPrompt(false);
    } catch {
      // ignore and keep prompt open
    }
  };

  const value = useMemo<InstanceContextValue>(
    () => ({ instance, setInstance }),
    [instance, setInstance],
  );

  if (status === "checking") {
    return (
      <div
        aria-busy="true"
        aria-live="polite"
        className="app-shell__main app-shell__content"
      >
        <p>Loading your job tracker…</p>
      </div>
    );
  }

  return (
    <InstanceContext.Provider value={value}>
      {showSecretPrompt && (
        <SecretPrompt
          onSubmit={handleSecretSubmit}
          onCancel={() => {
            setShowSecretPrompt(false);
            router.replace("/register");
          }}
        />
      )}
      {children}
    </InstanceContext.Provider>
  );
}

function SecretPrompt({
  onSubmit,
  onCancel,
}: {
  onSubmit: (secret: string) => Promise<void>;
  onCancel: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const secret = String(formData.get("secret") ?? "");
    await onSubmit(secret.trim());
  };

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="reauth-title"
      className="card"
      style={{
        position: "fixed",
        inset: 0,
        margin: "auto",
        maxWidth: "420px",
        zIndex: 50,
      }}
    >
      <h2 id="reauth-title" className="page-header__title">
        Re-enter your secret
      </h2>
      <p className="page-header__subtitle">
        Your authentication details were cleared. Please enter your instance
        secret to continue using the job tracker.
      </p>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-field">
          <label className="form-label" htmlFor="secret">
            Secret
          </label>
          <input
            ref={inputRef}
            id="secret"
            name="secret"
            type="password"
            className="form-input"
            autoComplete="current-password"
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.5rem",
            marginTop: "0.75rem",
          }}
        >
          <button
            type="button"
            className="button button--secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="button">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

