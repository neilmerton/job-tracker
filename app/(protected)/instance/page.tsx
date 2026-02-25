import { getInstance } from "@/lib/repositories";
import InstanceSettings from "./InstanceSettings";

export default async function InstancePage() {
  const instance = await getInstance();

  return (
    <section>
      <header className="page-header">
        <h1 className="page-header__title">Instance settings</h1>
        <p className="page-header__subtitle">
          View or update the details of this job tracker instance, or remove it
          completely.
        </p>
      </header>

      {instance ? (
        <InstanceSettings />
      ) : (
        <div className="card">
          <p className="form-help">
            No instance is currently registered. Visit the registration page to
            create one.
          </p>
        </div>
      )}
    </section>
  );
}

