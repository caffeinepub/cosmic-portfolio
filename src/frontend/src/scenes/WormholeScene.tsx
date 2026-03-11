import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useSceneStore } from "../store/sceneStore";

const tunnelVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const tunnelFrag = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    float speed = uTime;
    float ringPos = fract(vUv.y * 10.0 - speed * 2.5);
    float ring = pow(max(0.0, 1.0 - abs(ringPos - 0.5) * 5.5), 2.5);
    float streak1 = pow(max(0.0, sin(vUv.x * 3.14159 * 38.0 + speed * 4.0) * 0.5 + 0.5), 10.0);
    float streak2 = pow(max(0.0, sin(vUv.x * 3.14159 * 22.0 - speed * 6.0) * 0.5 + 0.5), 12.0);
    float streaks = streak1 + streak2 * 0.7;
    vec3 blue   = vec3(0.118, 0.227, 0.541);
    vec3 purple = vec3(0.427, 0.157, 0.851);
    vec3 white  = vec3(0.75, 0.88, 1.0);
    float hueShift = sin(vUv.x * 6.28318 + speed * 0.8) * 0.5 + 0.5;
    vec3 base = mix(blue, purple, hueShift);
    vec3 color = base + white * (ring * 0.55 + streaks * 0.9);
    float alpha = 0.65 + ring * 0.35 + streaks * 0.2;
    gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
  }
`;

const RING_Z_POSITIONS = [0, -5, -10, -15, -20, -25, -30, -35];
const RING_COLORS = [
  "#FF7A18",
  "#6D28D9",
  "#1E3A8A",
  "#FF7A18",
  "#6D28D9",
  "#1E3A8A",
  "#FF7A18",
  "#6D28D9",
];

export function WormholeScene() {
  const goToScene = useSceneStore((s) => s.goToScene);

  const tunnelMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: tunnelVert,
        fragmentShader: tunnelFrag,
        transparent: true,
        side: THREE.BackSide,
      }),
    [],
  );

  const ringsRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    const timer = setTimeout(() => goToScene(2), 4200);
    return () => clearTimeout(timer);
  }, [goToScene]);

  useFrame(({ clock }) => {
    tunnelMat.uniforms.uTime.value = clock.elapsedTime;
    if (ringsRef.current) {
      for (let i = 0; i < ringsRef.current.children.length; i++) {
        const mesh = ringsRef.current.children[i] as THREE.Mesh;
        mesh.rotation.z = clock.elapsedTime * (i % 2 === 0 ? 0.3 : -0.2);
      }
    }
  });

  return (
    <group>
      {/* Main tunnel */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={tunnelMat}>
        <cylinderGeometry args={[9, 9, 80, 64, 1, true]} />
      </mesh>

      {/* Decorative inner rings */}
      <group ref={ringsRef}>
        {RING_Z_POSITIONS.map((z, i) => (
          <mesh key={`ring-z${z}`} position={[0, 0, z]}>
            <torusGeometry args={[6, 0.04, 8, 80]} />
            <meshBasicMaterial
              color={RING_COLORS[i]}
              transparent
              opacity={0.6}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      <ambientLight intensity={0.3} color="#1E3A8A" />
      <pointLight
        position={[0, 0, -15]}
        intensity={5}
        color="#6D28D9"
        distance={50}
        decay={2}
      />
      <pointLight
        position={[0, 0, 5]}
        intensity={3}
        color="#FF7A18"
        distance={30}
        decay={2}
      />
    </group>
  );
}
