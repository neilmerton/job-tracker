import crypto from "node:crypto";
import {
  listConnections as repoListConnections,
  getConnectionById as repoGetConnectionById,
  insertConnection,
  updateConnection as repoUpdateConnection,
  deleteConnectionRecord,
} from "../repositories/connectionRepository";
import { deleteUpdatesForParent } from "../repositories/updateRepository";
import { Connection } from "../types";

export async function listConnections(): Promise<Connection[]> {
  return repoListConnections();
}

export async function getConnectionById(id: string): Promise<Connection | null> {
  return repoGetConnectionById(id);
}

export async function createConnection(
  connectionData: Omit<Connection, "id" | "instance_id" | "last_update_date">,
): Promise<Connection> {
  const id = crypto.randomUUID();
  return insertConnection({ ...connectionData, id });
}

export async function updateConnection(
  id: string,
  updates: Partial<Omit<Connection, "id" | "instance_id" | "last_update_date" | "date_requested">>,
): Promise<Connection | null> {
  return repoUpdateConnection(id, updates);
}

export async function deleteConnection(id: string): Promise<void> {
  // Enforce SRP: delete updates first, then connection
  await deleteUpdatesForParent(id);
  await deleteConnectionRecord(id);
}
