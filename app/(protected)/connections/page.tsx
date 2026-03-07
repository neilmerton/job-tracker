import Link from "next/link";
import { listConnections } from "@/lib/services/ConnectionService";
import Drawer from "@/components/Drawer";
import PageHeader from "@/components/PageHeader";
import ConnectionCard from "./components/ConnectionCard";
import ConnectionFormAdd from "./components/ConnectionFormAdd";

export default async function ConnectionsPage() {
  const connections = await listConnections();

  return (
    <section>
      <PageHeader
        title="Connections"
        subtitle="Track outreach to recruiters and other contacts."
      >
        <Drawer
          id="add-connection-drawer"
          buttonLabel="Add connection"
          drawerTitle="New connection"
        >
          <ConnectionFormAdd />
        </Drawer>
      </PageHeader>

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

