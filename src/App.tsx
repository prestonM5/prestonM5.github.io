import { useEffect, useRef, useState } from 'react';
import { projects, type Project } from './data';
import Figure from './Figure';

export default function App() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-ink-50 text-ink-800">
      <Nav />
      <main>
        <Intro />
        <Education />
        <Projects onOpen={setActive} />
      </main>
      <Footer />
      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </div>
  );
}

/* Nav */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-ink-50/85 backdrop-blur-md border-b hairline' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a href="#top" className="font-serif text-lg tracking-tightish text-ink-900">
          Preston Moore
        </a>
        <nav className="flex items-center gap-7 text-sm text-ink-500">
          <a href="#about" className="hover:text-ink-900 transition-colors">About</a>
          <a href="#education" className="hover:text-ink-900 transition-colors">Education</a>
          <a href="#work" className="hover:text-ink-900 transition-colors">Work</a>
        </nav>
      </div>
    </header>
  );
}

/* Intro (About + greeting) */
function Intro() {
  return (
    <section id="top" className="relative px-6 pt-40 pb-28">
      <div className="mx-auto max-w-5xl">
        <div
          id="about"
          className="grid gap-12 scroll-mt-20 md:grid-cols-[1.4fr_1fr] md:items-center animate-fade-up"
          style={{ animationDelay: '0.05s' }}
        >
          <div className="space-y-5 text-[15px] leading-relaxed text-ink-600">
            <p>
              I'm a junior pursuing a B.S. in Computer Science, with a minor in
              Mathematics, at UNC Charlotte. My interests sit at the intersection
              of deep learning, finance, and full-stack development.
            </p>
            <p>
              Before UNC Charlotte I completed an A.S. in Computer Science at
              Guilford Technical Community College, graduating with a 3.67 GPA
              and Dean's List honors across three semesters.
            </p>
          </div>
          <aside className="space-y-6">
            <div>
              <p className="label mb-2">Currently</p>
              <p className="text-sm text-ink-700">Junior, B.S. Computer Science — UNC Charlotte</p>
            </div>
            <div>
              <p className="label mb-2">Previously</p>
              <p className="text-sm text-ink-700">A.S. Computer Science — Guilford Technical Community College</p>
            </div>
            <div>
              <p className="label mb-2">Contact</p>
              <ul className="space-y-1 text-sm text-ink-700">
                <li>
                  <a
                    href="mailto:pmoore1637@gmail.com"
                    className="font-mono underline-offset-4 hover:text-accent-600 hover:underline"
                  >
                    pmoore1637@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:pmoore54@charlotte.edu"
                    className="font-mono underline-offset-4 hover:text-accent-600 hover:underline"
                  >
                    pmoore54@charlotte.edu
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+13365498832"
                    className="font-mono underline-offset-4 hover:text-accent-600 hover:underline"
                  >
                    (336) 549-8832
                  </a>
                </li>
                <li className="text-ink-500">Charlotte, NC</li>
              </ul>
            </div>
            <div>
              <p className="label mb-2">Elsewhere</p>
              <ul className="space-y-1 text-sm text-ink-700">
                <li>
                  <a
                    href="https://github.com/prestonM5"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent-600 transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/preston-moore-593870388/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent-600 transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <div
          className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-3 animate-fade-up"
          style={{ animationDelay: '0.15s' }}
        >
          <Stat k="5" label="projects built" />
          <Stat k="2027" label="expected graduation" />
        </div>
      </div>
    </section>
  );
}

function Stat({ k, label }: { k: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-serif text-2xl text-ink-900 tabular-nums">{k}</span>
      <span className="label">{label}</span>
    </div>
  );
}

/* Education */
function Education() {
  const skills = [
    'Python', 'Java', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS',
    'Node.js', 'Express', 'MongoDB', 'PyTorch', 'Jupyter Notebook', 'CUDA',
  ];

  return (
    <section id="education" className="border-t hairline px-6 py-24 scroll-mt-14">
      <div className="mx-auto max-w-5xl">
        <SectionHeader num="§ 01" title="Education" />
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div className="animate-fade-up">
            <p className="font-mono text-xs text-ink-400 tabular-nums">2025 – 2027</p>
            <h3 className="mt-2 font-serif text-xl leading-snug tracking-tightish text-ink-900">
              University of North Carolina at Charlotte
            </h3>
            <p className="mt-1 text-sm text-ink-500">B.S., Computer Science &amp; Minor in Mathematics</p>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.06s' }}>
            <p className="font-mono text-xs text-ink-400 tabular-nums">2023 – 2025</p>
            <h3 className="mt-2 font-serif text-xl leading-snug tracking-tightish text-ink-900">
              Guilford Technical Community College
            </h3>
            <p className="mt-1 text-sm text-ink-500">A.S., Computer Science — GPA 3.67</p>
            <p className="mt-1 text-xs text-ink-400">
              Dean's List: Spring 2024, Summer 2024, Spring 2025 · Honors List: Fall 2023
            </p>
          </div>
        </div>
        <div className="mt-14 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <p className="label mb-3">Skills</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {skills.map((s) => (
              <span key={s} className="font-mono text-[11px] text-ink-500">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Projects */
function Projects({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <section id="work" className="border-t hairline px-6 py-24 scroll-mt-14">
      <div className="mx-auto max-w-5xl">
        <SectionHeader num="§ 02" title="Projects" />
        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShown(true),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      onClick={() => onOpen(project)}
      className="group text-left animate-fade-up"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="flex items-baseline justify-between">
        <span className="section-num">{project.index}</span>
        <span className="font-mono text-xs text-ink-400 tabular-nums">{project.year}</span>
      </div>
      <div className="mt-4 aspect-[16/10] overflow-hidden rounded-sm border hairline bg-white">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={`${project.title} screenshot`}
            className={`h-full w-full ${project.thumbnailFit === 'contain' ? 'object-contain p-8' : 'object-cover object-top'} transition-transform duration-700 group-hover:scale-[1.03] ${
              shown ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <Figure
            variant={project.figure}
            className={`h-full w-full p-6 transition-transform duration-700 group-hover:scale-[1.03] ${
              shown ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>
      <h3 className="mt-5 font-serif text-xl leading-snug tracking-tightish text-ink-900 transition-colors group-hover:text-accent-600">
        {project.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{project.subtitle}</p>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-1.5 inline-block font-mono text-xs text-accent-600 underline-offset-4 hover:text-ink-900 hover:underline"
        >
          {project.link.replace(/^https?:\/\//, '')}
        </a>
      )}
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
        {project.stack.map((s) => (
          <span key={s} className="font-mono text-[11px] text-ink-400">
            {s}
          </span>
        ))}
      </div>
    </button>
  );
}

/* Shared */
function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="section-num">{num}</span>
      <h2 className="font-serif text-3xl tracking-tightish text-ink-900">{title}</h2>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t hairline px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-3 text-xs text-ink-400 sm:flex-row sm:items-center">
        <p className="font-mono">© {new Date().getFullYear()} Preston Moore — All rights reserved</p>
      </div>
    </footer>
  );
}

/* Modal */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink-900/40 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <div
        className="mt-8 w-full max-w-2xl animate-fade-up rounded-lg border hairline bg-ink-50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b hairline px-6 py-4">
          <span className="section-num">{project.index} / {project.year}</span>
          <button
            onClick={onClose}
            className="font-mono text-xs text-ink-400 transition-colors hover:text-ink-900"
          >
            [esc] close
          </button>
        </div>
        <div className="aspect-[16/9] border-b hairline bg-white">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={`${project.title} screenshot`}
              className={`h-full w-full ${project.thumbnailFit === 'contain' ? 'object-contain p-10' : 'object-cover object-top'}`}
            />
          ) : (
            <Figure variant={project.figure} className="h-full w-full p-8" />
          )}
        </div>
        <div className="px-6 py-7">
          <h3 className="font-serif text-2xl leading-tight tracking-tightish text-ink-900">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm text-ink-500">{project.subtitle}</p>
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
            {project.stack.map((s) => (
              <span key={s} className="font-mono text-[11px] text-ink-400">
                {s}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <p className="label mb-2">Abstract</p>
            <p className="text-[15px] leading-relaxed text-ink-600">{project.abstract}</p>
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 font-mono text-xs text-accent-600 hover:text-ink-900 transition-colors"
            >
              visit the live project →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
