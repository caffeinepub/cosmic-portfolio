import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useSceneStore } from "../store/sceneStore";

const CAMERA_CONFIGS = [
  { pos: [0, 0, 16] as const, target: [0, 0, 0] as const }, // 0 BlackHole
  { pos: [0, 0, 2] as const, target: [0, 0, -30] as const }, // 1 Wormhole
  { pos: [0, 22, 30] as const, target: [0, 0, 0] as const }, // 2 Galaxy
  { pos: [0, 14, 28] as const, target: [0, 0, 0] as const }, // 3 Planets
  { pos: [18, 18, 18] as const, target: [0, 0, 0] as const }, // 4 Timeline
  { pos: [0, 4, 20] as const, target: [0, 0, 0] as const }, // 5 Tesseract
  { pos: [0, 0, 13] as const, target: [0, 0, 0] as const }, // 6 Contact
];

export function CameraController() {
  const { camera } = useThree();
  const currentScene = useSceneStore((s) => s.currentScene);
  const lookTarget = useRef({ x: 0, y: 0, z: 0 });
  const tweenRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const config = CAMERA_CONFIGS[currentScene];
    const [px, py, pz] = config.pos;
    const [tx, ty, tz] = config.target;

    // Kill previous tweens
    for (const t of tweenRef.current) {
      t.kill();
    }

    tweenRef.current = [
      gsap.to(camera.position, {
        x: px,
        y: py,
        z: pz,
        duration: 2.2,
        ease: "power3.inOut",
      }),
      gsap.to(lookTarget.current, {
        x: tx,
        y: ty,
        z: tz,
        duration: 2.2,
        ease: "power3.inOut",
      }),
    ];

    return () => {
      for (const t of tweenRef.current) {
        t.kill();
      }
    };
  }, [currentScene, camera]);

  useFrame(() => {
    camera.lookAt(
      lookTarget.current.x,
      lookTarget.current.y,
      lookTarget.current.z,
    );
  });

  return null;
}
