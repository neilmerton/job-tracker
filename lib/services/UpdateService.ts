import crypto from "node:crypto";
import {
  listUpdatesForParent as repoListUpdatesForParent,
  insertUpdate,
} from "../repositories/updateRepository";
import { updateJobLastUpdateDate } from "../repositories/jobRepository";
import { updateConnectionLastUpdateDate } from "../repositories/connectionRepository";
import { Update } from "../types";

export async function listUpdatesForParent(parentId: string): Promise<Update[]> {
  return repoListUpdatesForParent(parentId);
}

export async function createUpdate(params: {
  type: "job" | "connection";
  parentId: string;
  date: string;
  description: string;
}): Promise<Update> {
  const id = crypto.randomUUID();
  const updateData: Update = {
    id,
    type: params.type,
    parent_id: params.parentId,
    date: params.date,
    description: params.description,
  };

  const update = await insertUpdate(updateData);

  if (params.type === "job") {
    await updateJobLastUpdateDate(params.parentId, params.date);
  } else {
    await updateConnectionLastUpdateDate(params.parentId, params.date);
  }

  return update;
}
