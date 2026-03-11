import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { SKILL_CLUSTERS, type SkillCluster } from "../data/portfolio";

interface StarProps {
  position: [number, number, number];
  color: string;
  name: string;
  level: number;
}

function SkillStar({ position, color, name, level }: StarProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const pulse = Math.sin(clock.elapsedTime * 2.5 + position[0]) * 0.05;
      meshRef.current.scale.setScalar(1 + pulse + (hovered ? 0.5 : 0));
    }
  });

  const size = 0.12 + level * 0.18;

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 4 : 1.2}
        roughness={0.2}
        metalness={0.8}
      />
      {hovered && (
        <Html center distanceFactor={18} style={{ pointerEvents: "none" }}>
          <div
            style={{
              background: "rgba(0,0,0,0.85)",
              border: `1px solid ${color}80`,
              boxShadow: `0 0 12px ${color}50`,
              padding: "5px 12px",
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: 600,
              color: "#E5E7EB",
              whiteSpace: "nowrap",
              letterSpacing: "0.05em",
            }}
          >
            {name}
          </div>
        </Html>
      )}
    </mesh>
  );
}

function Cluster({ cluster }: { cluster: SkillCluster }) {
  const groupRef = useRef<THREE.Group>(null!);

  const starPositions = useMemo(
    () =>
      cluster.skills.map((_, i) => {
        const angle = (i / cluster.skills.length) * Math.PI * 2;
        const r = 2.5 + (i % 3) * 1.2;
        return [
          Math.cos(angle) * r,
          Math.sin(angle) * r * 0.4 + (Math.random() - 0.5) * 1.5,
          Math.sin(angle) * r * 0.6,
        ] as [number, number, number];
      }),
    [cluster.skills],
  );

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.18;
    }
  });

  return (
    <group position={cluster.position}>
      {/* Cluster label */}
      <Html
        center
        distanceFactor={25}
        position={[0, 5.5, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            color: cluster.color,
            fontSize: "13px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            textShadow: `0 0 12px ${cluster.color}`,
            whiteSpace: "nowrap",
          }}
        >
          {cluster.label}
        </div>
      </Html>

      {/* Cluster center glow */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial
          color={cluster.color}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Orbit ring indicator */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.02, 6, 60]} />
        <meshBasicMaterial
          color={cluster.color}
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>

      {/* Stars */}
      <group ref={groupRef}>
        {cluster.skills.map((skill, i) => (
          <SkillStar
            key={skill.name}
            position={starPositions[i]}
            color={cluster.color}
            name={skill.name}
            level={skill.level}
          />
        ))}
      </group>
    </group>
  );
}

export function GalaxyScene() {
  return (
    <group>
      {SKILL_CLUSTERS.map((cluster) => (
        <Cluster key={cluster.id} cluster={cluster} />
      ))}
      <ambientLight intensity={0.15} />
      <pointLight
        position={[0, 20, 0]}
        intensity={2}
        color="#E5E7EB"
        distance={60}
        decay={2}
      />
    </group>
  );
}
