import Link from "next/link";
import { listConnections } from "@/lib/repositories";
import Drawer from "@/components/Drawer";
import ConnectionCard from "./components/ConnectionCard";
import ConnectionFormAdd from "./components/ConnectionFormAdd";

export default async function ConnectionsPage() {
  const connections = await listConnections();

  return (
    <section>
      <header className="page-header">
        <h1 className="page-header__title">Connections</h1>
        <p className="page-header__subtitle">
          Track outreach to recruiters and other contacts.
        </p>
        <Drawer
          id="add-connection-drawer"
          buttonLabel="Add connection"
          drawerTitle="New connection"
        >
          <ConnectionFormAdd />
        </Drawer>
      </header>

      {connections.length === 0 ? (
        <p className="form-help">
          You have not added any connection requests yet. Start by recording a
          recruiter or contact you have reached out to.
        </p>
      ) : (
        <div className="connections-grid">
          {connections.map((connection) => (
            <ConnectionCard key={connection.id} connection={connection} />
          ))}
        </div>
      )}
    </section>
  );
}

