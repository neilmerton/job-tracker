export type Instance = {
  id: string;
  name: string;
  email: string;
};

export type Job = {
  id: string;
  instance_id: string;
  date_applied: string;
  role: string;
  description: string | null;
  job_type: string;
  source: string;
  link: string | null;
  company: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_mobile: string | null;
  status: string;
  last_update_date: string | null;
};

export type Connection = {
  id: string;
  instance_id: string;
  date_requested: string;
  company: string;
  contact_name: string | null;
  contact_linkedin_url: string | null;
  contact_mobile: string | null;
  status: string;
  last_update_date: string | null;
};

export type Update = {
  id: string;
  type: "job" | "connection";
  parent_id: string;
  date: string;
  description: string;
};
