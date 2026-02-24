import { createJobAction } from "./../actions";

export default function NewJobPage() {
  return (
    <main>
      <header className="page-header">
        <h1 className="page-header__title">Add application</h1>
        <p className="page-header__subtitle">
          Record the details of a job application you have sent.
        </p>
      </header>

      <section className="card" aria-labelledby="new-job-title">
        <h2 id="new-job-title" className="page-header__title">
          Application details
        </h2>
        <form className="form" action={createJobAction}>
          <fieldset className="form">
            <legend className="form-label">Job</legend>
            <div className="form-field">
              <label className="form-label" htmlFor="date_applied">
                Date applied
              </label>
              <input
                id="date_applied"
                name="date_applied"
                type="date"
                className="form-input"
                required
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="role">
                Role
              </label>
              <input
                id="role"
                name="role"
                type="text"
                className="form-input"
                required
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="description">
                Job description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="job_type">
                Job type
              </label>
              <select
                id="job_type"
                name="job_type"
                className="form-select"
                required
              >
                <option value="">Select type</option>
                <option value="permanent">Permanent</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="source">
                Job source
              </label>
              <select
                id="source"
                name="source"
                className="form-select"
                required
              >
                <option value="">Select source</option>
                <option value="email">Email</option>
                <option value="linkedin">LinkedIn</option>
                <option value="job_board">Job board</option>
                <option value="referral">Referral</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="link">
                Job link
              </label>
              <input
                id="link"
                name="link"
                type="url"
                className="form-input"
              />
            </div>
          </fieldset>

          <fieldset className="form">
            <legend className="form-label">Company & contact</legend>
            <div className="form-field">
              <label className="form-label" htmlFor="company">
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="form-input"
                required
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="contact_name">
                Contact name
              </label>
              <input
                id="contact_name"
                name="contact_name"
                type="text"
                className="form-input"
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="contact_email">
                Contact email
              </label>
              <input
                id="contact_email"
                name="contact_email"
                type="email"
                className="form-input"
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="contact_mobile">
                Contact mobile number
              </label>
              <input
                id="contact_mobile"
                name="contact_mobile"
                type="tel"
                className="form-input"
              />
            </div>
          </fieldset>

          <fieldset className="form">
            <legend className="form-label">Status</legend>
            <div className="form-field">
              <label className="form-label" htmlFor="status">
                Current status
              </label>
              <select
                id="status"
                name="status"
                className="form-select"
                required
              >
                <option value="">Select status</option>
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="on_hold">On hold</option>
                <option value="offered">Offered</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </fieldset>

          <div>
            <button type="submit" className="button">
              Save application
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

