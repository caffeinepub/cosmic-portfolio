import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { SOCIAL_LINKS } from "../data/portfolio";

const SATELLITES = [
  {
    label: "GitHub",
    ocid: "github",
    color: "#E5E7EB",
    url: SOCIAL_LINKS.github,
    speed: 0.6,
    radius: 5.5,
    angle: 0,
  },
  {
    label: "LinkedIn",
    ocid: "linkedin",
    color: "#0A66C2",
    url: SOCIAL_LINKS.linkedin,
    speed: 0.4,
    radius: 7,
    angle: 2.1,
  },
  {
    label: "Twitter",
    ocid: "twitter",
    color: "#1DA1F2",
    url: SOCIAL_LINKS.twitter,
    speed: 0.5,
    radius: 6.2,
    angle: 4.2,
  },
];

function Satellite({ sat }: { sat: (typeof SATELLITES)[0] }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * sat.speed + sat.angle;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(t) * sat.radius;
      groupRef.current.position.y = Math.sin(t * 0.5) * 1.5;
      groupRef.current.position.z = Math.sin(t) * sat.radius;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial
          color={sat.color}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <Html center distanceFactor={20} style={{ pointerEvents: "all" }}>
        <a
          href={sat.url}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid={`contact.${sat.ocid}_link`}
          style={{
            color: sat.color,
            fontSize: "10px",
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textShadow: `0 0 8px ${sat.color}`,
            whiteSpace: "nowrap",
            display: "block",
            marginTop: "6px",
          }}
        >
          {sat.label}
        </a>
      </Html>
    </group>
  );
}

export function ContactScene() {
  return (
    <group>
      {/* Orbit rings */}
      {SATELLITES.map((sat, i) => (
        <mesh
          key={`orbit-${sat.label}`}
          rotation={[Math.PI / 2 + 0.3 * i, 0, 0.2 * i]}
        >
          <torusGeometry args={[sat.radius, 0.02, 6, 100]} />
          <meshBasicMaterial
            color={sat.color}
            transparent
            opacity={0.1}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Satellites */}
      {SATELLITES.map((sat) => (
        <Satellite key={sat.label} sat={sat} />
      ))}

      {/* Central portal glow */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial
          color="#FF7A18"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#FF7A18"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <ambientLight intensity={0.2} color="#1E3A8A" />
      <pointLight
        position={[0, 0, 0]}
        intensity={3}
        color="#FF7A18"
        distance={20}
        decay={2}
      />
    </group>
  );
}
