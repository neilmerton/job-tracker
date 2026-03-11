"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createJob, updateJobStatus } from "@/lib/services/JobService";
import { createUpdate, listUpdatesForParent } from "@/lib/services/UpdateService";

export async function createJobAction(prevState: any, formData: FormData) {
  const dateApplied = String(formData.get("date_applied") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const jobType = String(formData.get("job_type") ?? "").trim();
  const source = String(formData.get("source") ?? "").trim();
  const link = String(formData.get("link") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const contactName = String(formData.get("contact_name") ?? "").trim();
  const contactEmail = String(formData.get("contact_email") ?? "").trim();
  const contactMobile = String(formData.get("contact_mobile") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();

  if (!dateApplied || !role || !jobType || !source || !company) {
    return { error: "Missing required fields for job application." };
  }

  const job = await createJob({
    date: dateApplied,
    date_applied: dateApplied,
    role,
    description: description || null,
    job_type: jobType,
    source,
    link: link || null,
    company,
    contact_name: contactName || null,
    contact_email: contactEmail || null,
    contact_mobile: contactMobile || null,
    status: status || "applied",
  });

  redirect(`/jobs`);
}

export async function createJobUpdateAction(jobId: string, prevState: any, formData: FormData) {
  const description = String(formData.get("description") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();

  if (!description) {
    return { error: "Update description is required." };
  }

  const effectiveDate = date || new Date().toISOString().slice(0, 10);

  await createUpdate({
    type: "job",
    parentId: jobId,
    date: effectiveDate,
    description,
  });

  const status = String(formData.get("status") ?? "").trim();

  if (status) {
    await updateJobStatus(jobId, status);
  }

  redirect(`/jobs/${jobId}`);
}

export async function updateJobStatusOnlyAction(jobId: string, status: string) {
  await updateJobStatus(jobId, status);
  revalidatePath("/jobs");
}

export async function getJobUpdatesAction(jobId: string) {
  const updates = await listUpdatesForParent(jobId);
  return updates;
}

export async function addJobUpdateBoardAction(jobId: string, prevState: any, formData: FormData) {
  const description = String(formData.get("description") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();

  if (!description) {
    return { error: "Update description is required." };
  }

  const effectiveDate = date || new Date().toISOString().slice(0, 10);

  const update = await createUpdate({
    type: "job",
    parentId: jobId,
    date: effectiveDate,
    description,
  });

  if (status) {
    await updateJobStatus(jobId, status);
  }

  revalidatePath("/jobs");
  return update;
}

