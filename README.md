# Job Tracker App

A streamlined, Next.js-based web application for tracking job applications and networking connections. It is designed to be a personal, single-tenant tracker with a lightweight authentication mechanism, leveraging Supabase as its database.

## 🚀 Features

- **Dashboard Overview**: Get a high-level snapshot of your active job applications and connection requests, grouped by their current status.
- **Job Application Tracking**:
  - Keep track of roles, companies, job types, and links to the postings.
  - Store contact details for recruiters or hiring managers.
  - Log status changes and timeline updates to monitor your progress.
- **Networking/Connection Tracking**:
  - Log networking contacts, including their company and LinkedIn URL.
  - Track the status of communication and log detailed updates.
- **Streamlined Authentication**:
  - Uses a single-tenant "Instance" model.
  - Secure your tracker with a secret passphrase (hashed remotely).
  - Keeps you logged in on your device via `localStorage`.

## 🛠️ Technology Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Library**: [React](https://react.dev/)
- **Drag & Drop**: [pragmatic-drag-and-drop](https://atlassian.design/components/pragmatic-drag-and-drop/about)
- **Language**: TypeScript
- **Database & Backend**: [Supabase](https://supabase.com/) (PostgreSQL & Supabase JS client)
- **Styling**: Standard CSS with Next.js specific optimizations

## 🏁 Getting Started

### Prerequisites

- Node.js (v18+)
- `pnpm` package manager
- A [Supabase](https://supabase.com/) project to store your data

### Local Setup

1. **Clone the repository and install dependencies:**

   ```bash
   pnpm install
   ```

2. **Configure Environment Variables:**

   Rename `.env.example` to `.env.local` (or create it) and provide your Supabase URL and Anon Key:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Database Setup:**

   Ensure your Supabase PostgreSQL database has the required tables created: `instances`, `jobs`, `connections`, and `updates`. *(You may need to run project migrations if provided).*

4. **Run the Development Server:**

   ```bash
   pnpm dev
   ```

5. **Open the Application:**

   Navigate to [http://localhost:3010](http://localhost:3010) (or the port specified in your console). The app may automatically open your browser.

6. **Register your Instance:**

   On your first visit, you will be prompted to create an instance with your name, email, and a secure passphrase. This passphrase will be used to unlock the job tracker on this device going forward.

## 🗂️ Project Structure

- `app/`: Next.js App Router providing page layouts, UI, and API routes.
  - `(protected)/`: Contains the core authenticated views (Dashboard, Jobs, Connections).
  - `(public)/`: Contains public routes like the instance registration form.
  - `api/`: Backend API routes for instance validation and other logic.
- `components/`: Reusable React components, including `InstanceGuard` for authentication and shared layout components like `PageHeader` and `GlobalDrawer`.
- `contexts/`: React Context providers for global state management (e.g., `DrawerContext`).
- `lib/`: Core logic and configurations.
  - `repositories/`: Data access layer, with individual files per entity (e.g., `jobRepository.ts`) enforcing the Single Responsibility Principle.
  - `services/`: Business logic orchestration layer handling cross-repository interactions.
  - `types/`: Shared TypeScript type definitions mapping to database schemas.
  - `utils/`: Reusable standalone functions, such as data processing logic.
  - `supabaseClient.ts`: Initialization of the Supabase client.

## 📝 Data Handling

### 1. Server Actions (`actions.ts`)
Server Actions (e.g. `app/(protected)/jobs/actions.ts`) are the standard way to handle UI-driven mutations originating from within your Next.js application itself.

- **Purpose:** Handling form submissions, button clicks, and updating data directly from your React components.
- **Why use them here:** They integrate seamlessly with Next.js features. As seen in your `actions.ts` file, you can directly call database functions like `createJob` and immediately use Next.js navigation utilities like `redirect('/jobs/...')` or `revalidatePath(...)` without needing to manually author a fetch request on the client side, serialize the data, or manage API endpoints.
- **Security:** They act as hidden API endpoints that Next.js automatically secures and binds to your application's UI.

### 2. Route Handlers (`app/api/...`)
Route Handlers (e.g. `app/api/instance/register/route.ts`) are traditional RESTful API endpoints.

- **Purpose:** They are meant to be consumed by **external clients**, third-party services, webhooks, or mobile applications.
- **Why use them here:** Looking at your `instance/register`, `instance/delete`, and `instance/validate` routes, these are designed for external or programmatic access. For example, if another service needs to register an "instance" or validate a secret via a standard HTTP request, it will hit these REST endpoints. Server Actions cannot be easily consumed by an external script or third-party service, so Route Handlers fill that gap.

## 🧪 Unit Testing

This project uses [Vitest](https://vitest.dev/) alongside [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for its incredibly fast, Vite-powered test runner capabilities configured specifically for this Next.js app.

To run the unit tests locally:

```bash
pnpm test
```

Currently, tests focus on providing coverage for pure utility functions (like `lib/utils/dataProcessing.ts`) and abstract React UI components (like `PageHeader` and `SummarySection`).

## 🚢 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new). Make sure to add your Supabase connection strings to the Vercel Environment Variables.
