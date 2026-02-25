import { createConnectionAction } from "./../actions";

export default function NewConnectionPage() {
  return (
    <section>
      <header className="page-header">
        <h1 className="page-header__title">Add connection request</h1>
        <p className="page-header__subtitle">
          Record a connection request you have sent, for example on LinkedIn.
        </p>
      </header>

      <section className="card" aria-labelledby="new-connection-title">
        <h2 id="new-connection-title" className="page-header__title">
          Connection details
        </h2>
        <form className="form" action={createConnectionAction}>
          <fieldset className="form">
            <legend className="form-label">Request</legend>
            <div className="form-field">
              <label className="form-label" htmlFor="date_requested">
                Date requested
              </label>
              <input
                id="date_requested"
                name="date_requested"
                type="date"
                className="form-input"
                required
              />
            </div>
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
          </fieldset>

          <fieldset className="form">
            <legend className="form-label">Contact</legend>
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
              <label className="form-label" htmlFor="contact_linkedin_url">
                Contact LinkedIn URL
              </label>
              <input
                id="contact_linkedin_url"
                name="contact_linkedin_url"
                type="url"
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
                <option value="unanswered">Unanswered</option>
                <option value="accepted">Accepted</option>
              </select>
            </div>
          </fieldset>

          <div>
            <button type="submit" className="button">
              Save connection
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}

