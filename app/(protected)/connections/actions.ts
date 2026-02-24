"use server";

import { redirect } from "next/navigation";
import { createConnection, createUpdate } from "@/lib/repositories";

export async function createConnectionAction(formData: FormData) {
  const dateRequested = String(formData.get("date_requested") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const contactName = String(formData.get("contact_name") ?? "").trim();
  const contactLinkedIn = String(
    formData.get("contact_linkedin_url") ?? "",
  ).trim();
  const contactMobile = String(formData.get("contact_mobile") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();

  if (!dateRequested || !company || !status) {
    throw new Error("Missing required fields for connection request.");
  }

  const connection = await createConnection({
    date_requested: dateRequested,
    company,
    contact_name: contactName || null,
    contact_linkedin_url: contactLinkedIn || null,
    contact_mobile: contactMobile || null,
    status,
  });

  redirect(`/connections/${connection.id}`);
}

export async function createConnectionUpdateAction(
  connectionId: string,
  formData: FormData,
) {
  const description = String(formData.get("description") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();

  if (!description) {
    throw new Error("Update description is required.");
  }

  const effectiveDate = date || new Date().toISOString().slice(0, 10);

  await createUpdate({
    type: "connection",
    parentId: connectionId,
    date: effectiveDate,
    description,
  });

  redirect(`/connections/${connectionId}`);
}

