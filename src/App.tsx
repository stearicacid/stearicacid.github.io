import { profile, publications } from "./data";
import "./index.css";

function Section(props: { title: string; children: React.ReactNode }) {
  return (
    <section className="section section-card">
      <h2>{props.title}</h2>
      <div className="divider" />
      <div style={{ marginTop: 12 }}>{props.children}</div>
    </section>
  );
}

function PublicationsList(props: { items: typeof publications }) {
  const sorted = [...props.items].sort((a, b) => b.year - a.year);

  return (
    <ul className="pub-list">
      {sorted.map((pub, idx) => (
        <li key={`${pub.title}-${idx}`} className="pub-item">
          <div className="pub-title">{pub.title}</div>
          <div className="pub-meta">
            {pub.authors} — <em>{pub.venue}</em>, {pub.year}
          </div>
          {pub.links && pub.links.length > 0 && (
            <div className="pub-links">
              {pub.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const international = publications.filter((p) => p.type === "International");
  const domestic = publications.filter((p) => p.type === "Domestic");
  return (
    <div className="container">
      {/* Hero (Header + About + Avatar on the right) */}
      <div className="hero">
        <div className="hero-left">
          <header className="header">
            <h1>{profile.name}</h1>
            <p className="subtitle">
              {profile.title} · {profile.affiliation}
            </p>
          </header>

          <Section title="About">
            <p>
              I am a researcher working on music information retrieval and audio
              machine learning, with a focus on AMT and representation learning.
            </p>

            <ul>
              {profile.interests.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
        </div>

        <aside className="hero-right">
          <div className="avatar-frame">
            <img className="avatar-rect" src="/avatar.jpg" alt="..." />
          </div>
        </aside>
      </div>


      {/* Publications */}
      <Section title="Publications">
        <div className="pub-group">
          <h3 className="subhead">International Conferences (Peer-Reviewed)</h3>
          {international.length > 0 ? (
            <PublicationsList items={international} />
          ) : (
            <p className="muted">Coming soon...</p>
          )}
        </div>

        <div className="pub-group">
          <h3 className="subhead">Domestic Conferences (Non-Peer-Reviewed)</h3>
          {domestic.length > 0 ? (
            <PublicationsList items={domestic} />
          ) : (
            <p className="muted">Coming soon...</p>
          )}
        </div>
      </Section>

      {/* Contact */}
      <Section title="Contact">
        <p>
          Email:{" "}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
        <ul className="links">
          {profile.links.map((l) => (
            <li key={l.url}>
              <a href={l.url} target="_blank">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  );
}
