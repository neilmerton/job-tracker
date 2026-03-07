import crypto from "node:crypto";
import {
  listJobs as repoListJobs,
  getJobById as repoGetJobById,
  insertJob,
  updateJob as repoUpdateJob,
  deleteJobRecord,
} from "../repositories/jobRepository";
import { deleteUpdatesForParent } from "../repositories/updateRepository";
import { Job } from "../types";

export async function listJobs(): Promise<Job[]> {
  return repoListJobs();
}

export async function getJobById(id: string): Promise<Job | null> {
  return repoGetJobById(id);
}

export async function createJob(
  jobData: Omit<Job, "id" | "instance_id" | "last_update_date">,
): Promise<Job> {
  const id = crypto.randomUUID();
  return insertJob({ ...jobData, id });
}

export async function updateJob(
  id: string,
  updates: Partial<Omit<Job, "id" | "instance_id" | "last_update_date" | "date_applied">>,
): Promise<Job | null> {
  return repoUpdateJob(id, updates);
}

export async function updateJobStatus(
  id: string,
  status: string,
): Promise<Job | null> {
  return repoUpdateJob(id, { status });
}

export async function deleteJob(id: string): Promise<void> {
  // Enforce SRP: delete updates first, then job
  await deleteUpdatesForParent(id);
  await deleteJobRecord(id);
}
