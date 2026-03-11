import { SCENE_NAMES } from "../data/portfolio";
import { useSceneStore } from "../store/sceneStore";

export function Navigation() {
  const currentScene = useSceneStore((s) => s.currentScene);
  const goToScene = useSceneStore((s) => s.goToScene);

  return (
    <nav
      className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3"
      style={{ pointerEvents: "all" }}
    >
      {SCENE_NAMES.map((name, i) => (
        <button
          key={name}
          type="button"
          data-ocid="nav.tab"
          onClick={() => goToScene(i)}
          title={name}
          className="group relative flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-300"
        >
          <div
            className={`
              w-2.5 h-2.5 rounded-full transition-all duration-300 border
              ${
                currentScene === i
                  ? "bg-orange-500 border-orange-400 shadow-[0_0_8px_rgba(255,122,24,0.8)] scale-125"
                  : "bg-transparent border-white/30 hover:border-white/60 hover:scale-110"
              }
            `}
          />
          <span
            className={`
              absolute top-5 text-[10px] font-medium tracking-widest uppercase whitespace-nowrap opacity-0 group-hover:opacity-100
              transition-opacity duration-200 pointer-events-none
              ${currentScene === i ? "text-orange-400" : "text-white/60"}
            `}
          >
            {name}
          </span>
        </button>
      ))}
    </nav>
  );
}
