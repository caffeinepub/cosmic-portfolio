import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "motion/react";
import { Suspense } from "react";
import { CameraController } from "./components/CameraController";
import { Navigation } from "./components/Navigation";
import { SceneOverlay } from "./components/SceneOverlay";
import { Starfield } from "./components/Starfield";
import { BlackHoleScene } from "./scenes/BlackHoleScene";
import { ContactScene } from "./scenes/ContactScene";
import { GalaxyScene } from "./scenes/GalaxyScene";
import { PlanetsScene } from "./scenes/PlanetsScene";
import { TesseractScene } from "./scenes/TesseractScene";
import { TimelineScene } from "./scenes/TimelineScene";
import { WormholeScene } from "./scenes/WormholeScene";
import { useSceneStore } from "./store/sceneStore";

function SceneRenderer() {
  const currentScene = useSceneStore((s) => s.currentScene);

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <CameraController />
      <Starfield count={2800} />
      {currentScene === 0 && <BlackHoleScene />}
      {currentScene === 1 && <WormholeScene />}
      {currentScene === 2 && <GalaxyScene />}
      {currentScene === 3 && <PlanetsScene />}
      {currentScene === 4 && <TimelineScene />}
      {currentScene === 5 && <TesseractScene />}
      {currentScene === 6 && <ContactScene />}
    </>
  );
}

function TransitionOverlay() {
  const isTransitioning = useSceneStore((s) => s.isTransitioning);
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black"
          style={{ zIndex: 99 }}
        />
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 16], fov: 60, near: 0.1, far: 500 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Suspense fallback={null}>
          <SceneRenderer />
        </Suspense>
      </Canvas>

      {/* HTML overlays */}
      <div
        className="absolute inset-0"
        style={{ pointerEvents: "none", zIndex: 10 }}
      >
        <Navigation />
        <SceneOverlay />
      </div>

      {/* Scene transition fade */}
      <TransitionOverlay />

      {/* Footer */}
      <div
        className="absolute bottom-4 right-4 text-[10px] tracking-widest uppercase text-white/20"
        style={{ zIndex: 20, pointerEvents: "none" }}
      >
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-white/60 transition-colors"
          style={{ pointerEvents: "all" }}
        >
          caffeine.ai
        </a>
      </div>
    </div>
  );
}
