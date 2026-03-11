import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  PORTFOLIO_BIO,
  PORTFOLIO_NAME,
  PORTFOLIO_TITLE,
  PROJECTS,
  RESUME_URL,
  SKILL_CLUSTERS,
  SOCIAL_LINKS,
  WORMHOLE_WORDS,
} from "../data/portfolio";
import { useActor } from "../hooks/useActor";
import { useSceneStore } from "../store/sceneStore";
import { HolographicPanel } from "./HolographicPanel";

// ── Scene 0: Black Hole ──────────────────────────────────────
function BlackHoleOverlay() {
  const [phase, setPhase] = useState(0);
  const goToScene = useSceneStore((s) => s.goToScene);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2200);
    const t2 = setTimeout(() => setPhase(2), 4400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ pointerEvents: "none" }}
    >
      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.p
            key="text1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2 }}
            className="text-2xl md:text-4xl font-light tracking-[0.25em] text-white/80 text-center px-4"
          >
            Every system has gravity.
          </motion.p>
        )}
        {phase === 1 && (
          <motion.div
            key="text2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2 }}
            className="text-center px-4"
          >
            <p className="text-sm tracking-[0.4em] uppercase text-white/50 mb-3">
              Welcome to the universe of
            </p>
            <h1
              className="text-4xl md:text-6xl font-bold tracking-tight"
              style={{
                color: "#FF7A18",
                textShadow: "0 0 40px rgba(255,122,24,0.5)",
              }}
            >
              {PORTFOLIO_NAME}
            </h1>
            <p className="mt-3 text-base md:text-lg tracking-widest text-white/50 uppercase">
              {PORTFOLIO_TITLE}
            </p>
          </motion.div>
        )}
        {phase === 2 && (
          <motion.div
            key="cta"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center flex flex-col items-center gap-8 px-4"
            style={{ pointerEvents: "all" }}
          >
            <div>
              <p className="text-sm tracking-[0.4em] uppercase text-white/50 mb-3">
                Welcome to the universe of
              </p>
              <h1
                className="text-4xl md:text-6xl font-bold tracking-tight"
                style={{
                  color: "#FF7A18",
                  textShadow: "0 0 40px rgba(255,122,24,0.5)",
                }}
              >
                {PORTFOLIO_NAME}
              </h1>
              <p className="mt-3 text-base tracking-widest text-white/50 uppercase">
                {PORTFOLIO_TITLE}
              </p>
            </div>
            <button
              type="button"
              data-ocid="hero.primary_button"
              onClick={() => goToScene(1)}
              className="group relative px-8 py-3.5 text-sm font-bold tracking-[0.2em] uppercase border border-orange-500/60 text-orange-400 rounded transition-all duration-300 hover:bg-orange-500/10 hover:border-orange-400 hover:text-orange-300"
              style={{
                boxShadow:
                  "0 0 20px rgba(255,122,24,0.3), inset 0 0 20px rgba(255,122,24,0.05)",
              }}
            >
              <span>Cross the Event Horizon</span>
              <div className="absolute inset-0 rounded animate-pulse opacity-20 bg-orange-500" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Scene 1: Wormhole ────────────────────────────────────────
function WormholeOverlay() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((i) => (i + 1) % WORMHOLE_WORDS.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ pointerEvents: "none" }}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={wordIdx}
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.2, y: -15 }}
          transition={{ duration: 0.35 }}
          className="text-5xl md:text-7xl font-bold tracking-widest text-center px-4"
          style={{
            color: "#E5E7EB",
            textShadow:
              "0 0 30px rgba(109,40,217,0.7), 0 0 60px rgba(30,58,138,0.5)",
          }}
        >
          {WORMHOLE_WORDS[wordIdx]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

// ── Scene 2: Galaxy ──────────────────────────────────────────
function GalaxyOverlay() {
  const goToScene = useSceneStore((s) => s.goToScene);

  return (
    <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg tracking-[0.3em] uppercase text-white/40 font-light"
        >
          Galaxy of Skills
        </motion.h2>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-3"
        style={{ pointerEvents: "all" }}
      >
        <div className="flex flex-wrap justify-center gap-3">
          {SKILL_CLUSTERS.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-1.5 text-[11px] tracking-wider uppercase"
              style={{ color: c.color }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: c.color, boxShadow: `0 0 5px ${c.color}` }}
              />
              {c.label}
            </div>
          ))}
        </div>
        <div className="w-px h-4 bg-white/20 hidden md:block" />
        <button
          type="button"
          onClick={() => goToScene(3)}
          className="text-sm tracking-[0.15em] uppercase text-white/50 hover:text-white/90 transition-colors duration-300 font-medium"
        >
          Continue Journey →
        </button>
      </div>
    </div>
  );
}

// ── Scene 3: Planets ─────────────────────────────────────────
function PlanetsOverlay() {
  const goToScene = useSceneStore((s) => s.goToScene);
  const selectedPlanet = useSceneStore((s) => s.selectedPlanet);
  const setSelectedPlanet = useSceneStore((s) => s.setSelectedPlanet);
  const project = selectedPlanet !== null ? PROJECTS[selectedPlanet] : null;

  return (
    <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg tracking-[0.3em] uppercase text-white/40 font-light"
        >
          {selectedPlanet === null ? "Click a planet to explore" : ""}
        </motion.h2>
      </div>

      <AnimatePresence>
        {project && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.4 }}
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2"
            style={{ pointerEvents: "all", zIndex: 40 }}
          >
            <HolographicPanel className="p-6 w-72" glowColor="purple">
              <button
                type="button"
                data-ocid="planet.close_button"
                onClick={() => setSelectedPlanet(null)}
                className="absolute top-3 right-3 text-white/40 hover:text-white/80 text-xs"
              >
                ✕
              </button>
              <div
                className="w-3 h-3 rounded-full mb-4"
                style={{
                  background: project.color,
                  boxShadow: `0 0 12px ${project.color}`,
                }}
              />
              <h3 className="text-base font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-xs text-white/60 leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] font-medium tracking-wider"
                    style={{
                      background: `${project.color}20`,
                      color: project.color,
                      border: `1px solid ${project.color}40`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 text-center text-[11px] font-bold tracking-wider uppercase border border-white/20 text-white/60 rounded hover:border-white/40 hover:text-white/90 transition-all duration-200"
                >
                  GitHub
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 text-center text-[11px] font-bold tracking-wider uppercase rounded transition-all duration-200 hover:opacity-90"
                  style={{ background: project.color, color: "#000" }}
                >
                  Live Demo
                </a>
              </div>
            </HolographicPanel>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ pointerEvents: "all" }}
      >
        {selectedPlanet === null && (
          <button
            type="button"
            onClick={() => goToScene(4)}
            className="text-sm tracking-[0.15em] uppercase text-white/50 hover:text-white/90 transition-colors duration-300"
          >
            Continue Journey →
          </button>
        )}
      </div>
    </div>
  );
}

// ── Scene 4: Timeline ────────────────────────────────────────
function TimelineOverlay() {
  const goToScene = useSceneStore((s) => s.goToScene);
  const LEGEND = [
    { label: "Education", color: "#FF7A18" },
    { label: "Work", color: "#1E88E5" },
    { label: "Achievements", color: "#6D28D9" },
  ];

  return (
    <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg tracking-[0.3em] uppercase text-white/40 font-light"
        >
          Timeline Orbit — Hover nodes to explore
        </motion.h2>
      </div>

      <div className="absolute bottom-10 right-4 md:right-10 flex flex-col gap-2">
        {LEGEND.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 text-xs tracking-wider uppercase"
            style={{ color: item.color }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: item.color }}
            />
            {item.label}
          </div>
        ))}
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ pointerEvents: "all" }}
      >
        <button
          type="button"
          onClick={() => goToScene(5)}
          className="text-sm tracking-[0.15em] uppercase text-white/50 hover:text-white/90 transition-colors duration-300"
        >
          Continue Journey →
        </button>
      </div>
    </div>
  );
}

// ── Scene 5: Tesseract ───────────────────────────────────────
function TesseractOverlay() {
  const goToScene = useSceneStore((s) => s.goToScene);
  const COMPETENCIES = [
    "System Architecture",
    "Full-Stack Dev",
    "ML Pipelines",
    "Cloud Infrastructure",
    "API Design",
    "Team Leadership",
  ];

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ pointerEvents: "none" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ pointerEvents: "all" }}
      >
        <HolographicPanel className="p-8 w-80 md:w-96" glowColor="purple">
          <div className="text-center mb-6">
            <p className="text-[10px] tracking-[0.4em] uppercase text-purple-400 mb-2">
              Archive Node
            </p>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Résumé
            </h2>
          </div>

          <p className="text-sm text-white/60 leading-relaxed mb-6">
            {PORTFOLIO_BIO}
          </p>

          <div className="mb-6">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-3">
              Core Competencies
            </p>
            <div className="flex flex-wrap gap-1.5">
              {COMPETENCIES.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded text-[10px] text-purple-300 border border-purple-500/30 bg-purple-500/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <a
            href={RESUME_URL}
            download
            data-ocid="resume.primary_button"
            className="block w-full py-2.5 text-center text-xs font-bold tracking-[0.2em] uppercase rounded border border-orange-500/60 text-orange-400 hover:bg-orange-500/10 transition-all duration-300 mb-3"
            style={{ boxShadow: "0 0 15px rgba(255,122,24,0.2)" }}
          >
            Download Resume
          </a>

          <button
            type="button"
            onClick={() => goToScene(6)}
            className="block w-full py-2.5 text-center text-xs font-bold tracking-[0.2em] uppercase rounded border border-white/20 text-white/50 hover:border-white/40 hover:text-white/80 transition-all duration-300"
          >
            Continue to Contact →
          </button>
        </HolographicPanel>
      </motion.div>
    </div>
  );
}

// ── Scene 6: Contact ─────────────────────────────────────────
function ContactOverlay() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const { actor } = useActor();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !name || !email || !message) return;
    setStatus("sending");
    try {
      await actor.submitContactMessage(name, email, message);
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  const LINKS = [
    { label: "GitHub", url: SOCIAL_LINKS.github, ocid: "contact.github_link" },
    {
      label: "LinkedIn",
      url: SOCIAL_LINKS.linkedin,
      ocid: "contact.linkedin_link",
    },
    {
      label: "Twitter",
      url: SOCIAL_LINKS.twitter,
      ocid: "contact.twitter_link",
    },
  ];

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ pointerEvents: "none" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ pointerEvents: "all" }}
      >
        <HolographicPanel className="p-8 w-80 md:w-96" glowColor="orange">
          <div className="text-center mb-6">
            <p className="text-[10px] tracking-[0.4em] uppercase text-orange-400 mb-2">
              Contact Portal
            </p>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Transmit a Signal
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                data-ocid="contact.success_state"
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="text-4xl mb-3">✦</div>
                <p className="text-green-400 font-semibold mb-1">
                  Signal Transmitted
                </p>
                <p className="text-white/50 text-sm">
                  Message received. I'll respond soon.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
              >
                <input
                  data-ocid="contact.input"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500/60 transition-colors"
                />
                <input
                  data-ocid="contact.input"
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500/60 transition-colors"
                />
                <textarea
                  data-ocid="contact.textarea"
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500/60 transition-colors resize-none"
                />
                {status === "error" && (
                  <p
                    data-ocid="contact.error_state"
                    className="text-red-400 text-xs"
                  >
                    Transmission failed. Please try again.
                  </p>
                )}
                <button
                  data-ocid="contact.submit_button"
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3 text-xs font-bold tracking-[0.2em] uppercase rounded transition-all duration-300 disabled:opacity-50"
                  style={{
                    background:
                      status === "sending" ? "rgba(255,122,24,0.3)" : "#FF7A18",
                    color: "#000",
                    boxShadow: "0 0 20px rgba(255,122,24,0.3)",
                  }}
                >
                  {status === "sending" ? "Transmitting..." : "Transmit Signal"}
                </button>

                <div className="flex justify-center gap-4 pt-2">
                  {LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ocid={link.ocid}
                      className="text-[10px] tracking-widest uppercase text-white/30 hover:text-white/70 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </HolographicPanel>
      </motion.div>
    </div>
  );
}

// ── Main SceneOverlay ────────────────────────────────────────
export function SceneOverlay() {
  const currentScene = useSceneStore((s) => s.currentScene);

  const overlays: Record<number, React.ReactNode> = {
    0: <BlackHoleOverlay />,
    1: <WormholeOverlay />,
    2: <GalaxyOverlay />,
    3: <PlanetsOverlay />,
    4: <TimelineOverlay />,
    5: <TesseractOverlay />,
    6: <ContactOverlay />,
  };

  return (
    <div
      className="absolute inset-0"
      style={{ pointerEvents: "none", zIndex: 10 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {overlays[currentScene]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
