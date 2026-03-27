import { awards, profile, publications } from "./data";
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
  const sorted = [...props.items];

  return (
    <ul className="pub-list">
      {sorted.map((pub, idx) => (
        <li key={`${pub.title}-${idx}`} className="pub-item">
          <div className="pub-title">{pub.title}</div>
          <div className="pub-meta">
            {pub.authors} — <em>{pub.venue}</em>, {pub.date}
            {pub.award && (
              <>
                , (<strong>{pub.award}</strong>)
              </>
            )}
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

function AwardsList() {
  return (
    <ul className="pub-list">
      {awards.map((award, idx) => (
        <li key={`${award.title}-${idx}`} className="pub-item">
          <div className="pub-meta">
            {award.title}, {award.date}.
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const internationalFirst = publications.filter(
    (p) => p.category === "International" && p.authorRole === "First"
  );
  const internationalCoauthor = publications.filter(
    (p) => p.category === "International" && p.authorRole === "Co-author"
  );
  const domesticFirst = publications.filter(
    (p) => p.category === "Domestic" && p.authorRole === "First"
  );
  const domesticCoauthor = publications.filter(
    (p) => p.category === "Domestic" && p.authorRole === "Co-author"
  );

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
              I am a student working on music information retrieval and audio
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
          <h3 className="subhead">International Conference (First Author)</h3>
          {internationalFirst.length > 0 ? (
            <PublicationsList items={internationalFirst} />
          ) : (
            <p className="muted">Coming soon...</p>
          )}
        </div>

        {internationalCoauthor.length > 0 && (
          <div className="pub-group">
            <h3 className="subhead">International Conference (Co-author)</h3>
            <PublicationsList items={internationalCoauthor} />
          </div>
        )}

        <div className="pub-group">
          <h3 className="subhead">Domestic Conference (First Author)</h3>
          {domesticFirst.length > 0 ? (
            <PublicationsList items={domesticFirst} />
          ) : (
            <p className="muted">Coming soon...</p>
          )}
        </div>

        {domesticCoauthor.length > 0 && (
          <div className="pub-group">
            <h3 className="subhead">Domestic Conference (Co-author)</h3>
            <PublicationsList items={domesticCoauthor} />
          </div>
        )}
      </Section>

      {/* Awards */}
      <Section title="Awards">
        {awards.length > 0 ? <AwardsList /> : <p className="muted">Coming soon...</p>}
      </Section>

      {/* Contact */}
      <Section title="Contact">
        <p>
          Email:{" "}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
        <p>Address: {profile.address}</p>
        <p>Phone number: {profile.phone}</p>
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
