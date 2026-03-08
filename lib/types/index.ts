export interface Instance {
  id: string;
  name: string;
  email: string;
};

interface BaseEntity {
  id: string;
  instance_id: string;
  date: string;
  company: string;
  contact_name: string | null;
  status: string;
  last_update_date: string | null;
}

export interface Job extends BaseEntity {
  date_applied: string;
  role: string;
  description: string | null;
  job_type: string;
  source: string;
  link: string | null;
  contact_email: string | null;
  contact_mobile: string | null;
};

export interface Connection extends BaseEntity {
  date_requested: string;
  contact_linkedin_url: string | null;
  contact_mobile: string | null;
};

export type UpdateType = "job" | "connection";

export interface Update {
  id: string;
  type: UpdateType;
  parent_id: string;
  date: string;
  description: string;
};
