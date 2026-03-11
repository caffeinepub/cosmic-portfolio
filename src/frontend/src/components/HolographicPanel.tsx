import type { ReactNode } from "react";

interface HolographicPanelProps {
  children: ReactNode;
  className?: string;
  glowColor?: "orange" | "blue" | "purple" | "green";
}

const glowStyles = {
  orange:
    "border-orange-500/40 shadow-[0_0_30px_rgba(255,122,24,0.2),inset_0_0_30px_rgba(255,122,24,0.05)]",
  blue: "border-blue-500/40 shadow-[0_0_30px_rgba(30,58,138,0.3),inset_0_0_30px_rgba(30,58,138,0.1)]",
  purple:
    "border-purple-500/40 shadow-[0_0_30px_rgba(109,40,217,0.3),inset_0_0_30px_rgba(109,40,217,0.1)]",
  green:
    "border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.2),inset_0_0_30px_rgba(16,185,129,0.05)]",
};

export function HolographicPanel({
  children,
  className = "",
  glowColor = "purple",
}: HolographicPanelProps) {
  return (
    <div
      className={`
        relative rounded-lg border bg-black/70 backdrop-blur-xl
        ${glowStyles[glowColor]}
        ${className}
      `}
    >
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-current opacity-60 rounded-tl" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-current opacity-60 rounded-tr" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-current opacity-60 rounded-bl" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-current opacity-60 rounded-br" />
      {children}
    </div>
  );
}
