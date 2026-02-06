// src/App.tsx
import { profile, publications } from "./data";
import "./index.css";

function Section(props: { title: string; children: React.ReactNode }) {
  return (
    <section className="section">
      <h2>{props.title}</h2>
      {props.children}
    </section>
  );
}

export default function App() {
  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>{profile.name}</h1>
        <p className="subtitle">
          {profile.title} · {profile.affiliation}
        </p>
      </header>

      {/* About */}
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

      {/* Publications */}
      <Section title="Publications">
        <ul className="pub-list">
          {publications.map((pub, idx) => (
            <li key={idx} className="pub-item">
              <div className="pub-title">{pub.title}</div>
              <div className="pub-meta">
                {pub.authors} — <em>{pub.venue}</em>, {pub.year}
              </div>
              {pub.links && (
                <div className="pub-links">
                  {pub.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank">
                      [{l.label}]
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
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
