"use server";

import { redirect } from "next/navigation";
import { createJob, createUpdate } from "@/lib/repositories";

export async function createJobAction(formData: FormData) {
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

  if (!dateApplied || !role || !jobType || !source || !company || !status) {
    throw new Error("Missing required fields for job application.");
  }

  const job = await createJob({
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
    status,
  });

  redirect(`/jobs/${job.id}`);
}

export async function createJobUpdateAction(jobId: string, formData: FormData) {
  const description = String(formData.get("description") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();

  if (!description) {
    throw new Error("Update description is required.");
  }

  const effectiveDate = date || new Date().toISOString().slice(0, 10);

  await createUpdate({
    type: "job",
    parentId: jobId,
    date: effectiveDate,
    description,
  });

  redirect(`/jobs/${jobId}`);
}

