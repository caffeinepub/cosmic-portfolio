import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const diskVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const diskFrag = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    float t = vUv.x;
    float angle = vUv.y;
    float flow = fract(angle * 3.0 + uTime * 0.25);
    float clump = sin(angle * 25.0 * 3.14159 + uTime * 4.0) * 0.4 + 0.6;
    clump *= sin(angle * 8.0 * 3.14159 - uTime * 2.5) * 0.2 + 0.8;
    vec3 orange = vec3(1.0, 0.478, 0.094);
    vec3 purple = vec3(0.427, 0.157, 0.851);
    vec3 blue   = vec3(0.118, 0.227, 0.541);
    vec3 color = mix(orange, purple, smoothstep(0.0, 0.5, t));
    color = mix(color, blue, smoothstep(0.5, 1.0, t));
    float brightness = 2.2 + clump * 1.8;
    float innerFade = smoothstep(0.0, 0.06, t);
    float outerFade = 1.0 - smoothstep(0.82, 1.0, t);
    float alpha = innerFade * outerFade * (0.75 + clump * 0.25);
    gl_FragColor = vec4(color * brightness, alpha);
  }
`;

const lensVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const lensFrag = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vec2 center = vUv - 0.5;
    float dist = length(center);
    float angle = atan(center.y, center.x);
    float ring1 = smoothstep(0.30, 0.33, dist) * (1.0 - smoothstep(0.33, 0.40, dist));
    float ring2 = smoothstep(0.44, 0.46, dist) * (1.0 - smoothstep(0.46, 0.52, dist)) * 0.3;
    float sparkle = sin(angle * 12.0 + uTime * 2.5) * 0.35 + 0.65;
    vec3 glow = vec3(0.9, 0.95, 1.0) * (ring1 + ring2) * sparkle;
    gl_FragColor = vec4(glow, (ring1 + ring2) * sparkle * 0.55);
  }
`;

export function BlackHoleScene() {
  const diskRef = useRef<THREE.Mesh>(null!);
  const outerRingRef = useRef<THREE.Mesh>(null!);

  const diskMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: diskVert,
        fragmentShader: diskFrag,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  const lensMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: lensVert,
        fragmentShader: lensFrag,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    diskMat.uniforms.uTime.value = t;
    lensMat.uniforms.uTime.value = t;
    if (diskRef.current) diskRef.current.rotation.z = t * 0.04;
    if (outerRingRef.current) outerRingRef.current.rotation.z = -t * 0.02;
  });

  return (
    <group>
      {/* Gravitational lensing halo — large plane behind */}
      <mesh position={[0, 0, -0.5]} material={lensMat}>
        <planeGeometry args={[22, 22]} />
      </mesh>

      {/* Event horizon */}
      <mesh>
        <sphereGeometry args={[2.6, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Black hole depth sphere — very subtle dark sphere */}
      <mesh>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>

      {/* Accretion disk */}
      <mesh ref={diskRef} rotation={[Math.PI / 7, 0, 0]} material={diskMat}>
        <ringGeometry args={[2.9, 7.5, 128, 4]} />
      </mesh>

      {/* Outer diffuse ring */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 7, 0, 0]}>
        <ringGeometry args={[7.2, 9.0, 64]} />
        <meshBasicMaterial
          color="#6D28D9"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner glow ring */}
      <mesh rotation={[Math.PI / 7, 0, 0]}>
        <ringGeometry args={[2.7, 3.1, 128]} />
        <meshBasicMaterial
          color="#FF7A18"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <ambientLight intensity={0.05} />
      <pointLight
        position={[0, 0, 0]}
        intensity={8}
        color="#FF7A18"
        distance={40}
        decay={2}
      />
      <pointLight
        position={[5, 3, 8]}
        intensity={2}
        color="#1E3A8A"
        distance={30}
        decay={2}
      />
    </group>
  );
}
