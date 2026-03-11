import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { PROJECTS } from "../data/portfolio";
import { useSceneStore } from "../store/sceneStore";

function Planet({
  project,
  index,
  isSelected,
}: { project: (typeof PROJECTS)[0]; index: number; isSelected: boolean }) {
  const orbitRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const setSelectedPlanet = useSceneStore((s) => s.setSelectedPlanet);

  const startAngle = (index / PROJECTS.length) * Math.PI * 2;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * project.orbitSpeed + startAngle;
    if (orbitRef.current) {
      orbitRef.current.position.x = Math.cos(t) * project.orbitRadius;
      orbitRef.current.position.z = Math.sin(t) * project.orbitRadius;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.5;
      if (isSelected) {
        meshRef.current.scale.setScalar(
          1.3 + Math.sin(clock.elapsedTime * 3) * 0.05,
        );
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(
        1.3 + Math.sin(clock.elapsedTime * 1.5 + index) * 0.08,
      );
    }
  });

  return (
    <>
      {/* Orbit path */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[project.orbitRadius, 0.025, 6, 120]} />
        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>

      {/* Planet group */}
      <group ref={orbitRef}>
        {/* Atmosphere glow */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[project.size * 1.35, 32, 32]} />
          <meshBasicMaterial
            color={project.atmosphereColor}
            transparent
            opacity={0.18}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Main planet mesh — clickable (Three.js mesh, not a DOM element) */}
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: Three.js mesh does not support keyboard events */}
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedPlanet(index);
          }}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "default";
          }}
        >
          <sphereGeometry args={[project.size, 32, 32]} />
          <meshStandardMaterial
            color={project.color}
            emissive={project.color}
            emissiveIntensity={isSelected ? 0.6 : 0.2}
            roughness={0.6}
            metalness={0.3}
          />
        </mesh>

        {isSelected && (
          <pointLight
            color={project.color}
            intensity={5}
            distance={15}
            decay={2}
          />
        )}
      </group>
    </>
  );
}

export function PlanetsScene() {
  const selectedPlanet = useSceneStore((s) => s.selectedPlanet);

  return (
    <group>
      {/* Central star */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial color="#FFF0CC" />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.6, 32, 32]} />
        <meshBasicMaterial
          color="#FFD080"
          transparent
          opacity={0.25}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <pointLight
        position={[0, 0, 0]}
        intensity={12}
        color="#FFF0CC"
        distance={60}
        decay={2}
      />
      <ambientLight intensity={0.1} />

      {PROJECTS.map((project, i) => (
        <Planet
          key={project.id}
          project={project}
          index={i}
          isSelected={selectedPlanet === i}
        />
      ))}
    </group>
  );
}
