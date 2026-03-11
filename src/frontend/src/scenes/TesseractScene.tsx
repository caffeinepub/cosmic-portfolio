import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface FloatingFrameProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  id: string;
}

function FloatingFrame({
  position,
  rotation,
  scale,
  color,
  speed,
}: FloatingFrameProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const edgesRef = useRef<THREE.LineSegments>(null!);

  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed;
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + t * 0.3;
      meshRef.current.rotation.y = rotation[1] + t * 0.5;
      meshRef.current.rotation.z = rotation[2] + t * 0.2;
      meshRef.current.position.y =
        position[1] + Math.sin(clock.elapsedTime * 0.8 + position[0]) * 0.3;
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.x = rotation[0] + t * 0.3;
      edgesRef.current.rotation.y = rotation[1] + t * 0.5;
      edgesRef.current.rotation.z = rotation[2] + t * 0.2;
      edgesRef.current.position.y =
        position[1] + Math.sin(clock.elapsedTime * 0.8 + position[0]) * 0.3;
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial color="#000000" transparent opacity={0.02} />
      </mesh>
      <lineSegments ref={edgesRef} geometry={edgesGeo}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

const FRAMES: FloatingFrameProps[] = [
  {
    id: "f1",
    position: [-6, 3, -4],
    rotation: [0.5, 0.3, 0.1],
    scale: 3.5,
    color: "#6D28D9",
    speed: 0.4,
  },
  {
    id: "f2",
    position: [7, -2, -6],
    rotation: [0.2, 0.8, 0.4],
    scale: 2.8,
    color: "#1E3A8A",
    speed: 0.3,
  },
  {
    id: "f3",
    position: [-4, -4, -8],
    rotation: [0.9, 0.1, 0.6],
    scale: 2.2,
    color: "#FF7A18",
    speed: 0.5,
  },
  {
    id: "f4",
    position: [5, 5, -3],
    rotation: [0.3, 0.6, 0.8],
    scale: 4.0,
    color: "#6D28D9",
    speed: 0.25,
  },
  {
    id: "f5",
    position: [-8, -1, -2],
    rotation: [0.6, 0.4, 0.2],
    scale: 1.8,
    color: "#1E3A8A",
    speed: 0.6,
  },
  {
    id: "f6",
    position: [3, -5, -5],
    rotation: [0.1, 0.9, 0.5],
    scale: 3.0,
    color: "#FF7A18",
    speed: 0.35,
  },
  {
    id: "f7",
    position: [0, 7, -6],
    rotation: [0.7, 0.2, 0.9],
    scale: 2.5,
    color: "#6D28D9",
    speed: 0.45,
  },
  {
    id: "f8",
    position: [-5, 6, -2],
    rotation: [0.4, 0.7, 0.3],
    scale: 1.6,
    color: "#1E3A8A",
    speed: 0.55,
  },
  {
    id: "f9",
    position: [9, 1, -4],
    rotation: [0.8, 0.5, 0.7],
    scale: 2.0,
    color: "#FF7A18",
    speed: 0.3,
  },
];

export function TesseractScene() {
  const coreRef = useRef<THREE.Mesh>(null!);
  const coreEdgesRef = useRef<THREE.LineSegments>(null!);

  const coreGeo = useMemo(() => new THREE.OctahedronGeometry(2.2), []);
  const coreEdgesGeo = useMemo(
    () => new THREE.EdgesGeometry(coreGeo),
    [coreGeo],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.15;
      coreRef.current.rotation.y = t * 0.22;
      coreRef.current.rotation.z = t * 0.1;
    }
    if (coreEdgesRef.current) {
      coreEdgesRef.current.rotation.x = t * 0.15;
      coreEdgesRef.current.rotation.y = t * 0.22;
      coreEdgesRef.current.rotation.z = t * 0.1;
    }
  });

  return (
    <group>
      {FRAMES.map((frame) => (
        <FloatingFrame key={frame.id} {...frame} />
      ))}

      <mesh ref={coreRef} geometry={coreGeo}>
        <meshBasicMaterial color="#000000" transparent opacity={0.02} />
      </mesh>
      <lineSegments ref={coreEdgesRef} geometry={coreEdgesGeo}>
        <lineBasicMaterial
          color="#6D28D9"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      <mesh>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial
          color="#6D28D9"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <ambientLight intensity={0.15} color="#6D28D9" />
      <pointLight
        position={[0, 0, 0]}
        intensity={4}
        color="#6D28D9"
        distance={30}
        decay={2}
      />
      <pointLight
        position={[-5, 5, 5]}
        intensity={2}
        color="#1E3A8A"
        distance={25}
        decay={2}
      />
    </group>
  );
}
