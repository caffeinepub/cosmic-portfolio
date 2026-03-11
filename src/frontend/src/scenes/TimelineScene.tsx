import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { TIMELINE_RINGS } from "../data/portfolio";

function TimelineNode({
  node,
  radius,
  color,
}: {
  node: (typeof TIMELINE_RINGS)[0]["nodes"][0];
  radius: number;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null!);
  const x = Math.cos(node.angle) * radius;
  const z = Math.sin(node.angle) * radius;

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const pulse = Math.sin(clock.elapsedTime * 2.2 + node.angle) * 0.1;
      meshRef.current.scale.setScalar(1 + pulse + (hovered ? 0.4 : 0));
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[x, 0, z]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.28, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 4 : 1.5}
        roughness={0.2}
        metalness={0.6}
      />
      {hovered && (
        <Html
          center
          distanceFactor={22}
          position={[0, 1.8, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              background: "rgba(0,0,0,0.9)",
              border: `1px solid ${color}60`,
              boxShadow: `0 0 15px ${color}40`,
              padding: "8px 14px",
              borderRadius: "6px",
              width: "180px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: color,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                marginBottom: "3px",
              }}
            >
              {node.label}
            </div>
            <div
              style={{
                color: "#9CA3AF",
                fontSize: "10px",
                marginBottom: "4px",
              }}
            >
              {node.period}
            </div>
            <div
              style={{ color: "#D1D5DB", fontSize: "10px", lineHeight: 1.4 }}
            >
              {node.description}
            </div>
          </div>
        </Html>
      )}
    </mesh>
  );
}

export function TimelineScene() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.07;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central star */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#FFF8E0" />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#FFCC55"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <pointLight
        position={[0, 0, 0]}
        intensity={8}
        color="#FFF0CC"
        distance={50}
        decay={2}
      />
      <ambientLight intensity={0.1} />

      {/* Timeline rings */}
      {TIMELINE_RINGS.map((ring) => (
        <group key={ring.id}>
          {/* Torus ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[ring.radius, 0.06, 8, 120]} />
            <meshBasicMaterial
              color={ring.color}
              transparent
              opacity={0.4}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>

          {/* Nodes */}
          {ring.nodes.map((node) => (
            <TimelineNode
              key={node.id}
              node={node}
              radius={ring.radius}
              color={ring.color}
            />
          ))}
        </group>
      ))}
    </group>
  );
}
