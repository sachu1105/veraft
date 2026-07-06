"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const COUNT = 4200;
const RADIUS_MIN = 0.44;
const RADIUS_MAX = 1.08;
const STRENGTH_MIN = 0.3;
const STRENGTH_MAX = 1.25;
const RADIAL_MAX = 0.58;
const RETURN_SLOW = 1.1;
const RETURN_FAST = 3.8;
const COLOR_LIFT = 0.42;
const MOUSE_EASE = 5;
const SPEED_FLOOR = 0.35;
const SPEED_CEIL = 3.2;

// Point cloud data generated once at module load (this file is client-only and
// lazily imported), so no impure Math.random runs during React render.
const SPHERE_DATA = (() => {
  const basePositions = new Float32Array(COUNT * 3);
  const baseColors = new Float32Array(COUNT * 3);
  const ink = new THREE.Color("#16181f");
  const accent = new THREE.Color("#001ffe");
  const radius = 1.7;

  for (let i = 0; i < COUNT; i++) {
    // Even distribution on a sphere shell with a little thickness.
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = radius * (0.9 + Math.random() * 0.1);
    basePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    basePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    basePositions[i * 3 + 2] = r * Math.cos(phi);

    const c = Math.random() < 0.18 ? accent : ink;
    baseColors[i * 3] = c.r;
    baseColors[i * 3 + 1] = c.g;
    baseColors[i * 3 + 2] = c.b;
  }
  return { basePositions, baseColors };
})();

/** Soft round dot sprite, generated once on the client. */
function makeCircleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.45, "rgba(255,255,255,1)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function Sphere() {
  const { gl } = useThree();
  const points = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const prevMouse = useRef({ x: 0, y: 0 });
  const mouseSpeed = useRef(0);
  const raycaster = useRef(new THREE.Raycaster());
  const mouseNdc = useRef(new THREE.Vector2());
  const invMatrix = useRef(new THREE.Matrix4());
  const localRayOrigin = useRef(new THREE.Vector3());
  const localRayDir = useRef(new THREE.Vector3());
  const pushDir = useRef(new THREE.Vector3());
  const liftColor = useRef(new THREE.Color());
  const white = useRef(new THREE.Color("#ffffff"));

  const { geometry, material, basePositions, baseColors } = useMemo(() => {
    const basePositions = SPHERE_DATA.basePositions.slice();
    const baseColors = SPHERE_DATA.baseColors.slice();
    const positions = SPHERE_DATA.basePositions.slice();
    const colors = SPHERE_DATA.baseColors.slice();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.032,
      map: makeCircleTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      sizeAttenuation: true,
    });

    return { geometry, material, basePositions, baseColors };
  }, []);

  // Map pointer to this canvas's NDC — not the full window — so the ray
  // lines up with where the sphere is actually drawn on screen.
  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.ty = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [gl]);

  // Dispose GPU resources on unmount.
  useEffect(
    () => () => {
      geometry.dispose();
      material.map?.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const p = points.current;
    if (!p) return;

    p.rotation.y += d * 0.05;
    p.rotation.x += d * 0.012;

    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const colAttr = geometry.getAttribute("color") as THREE.BufferAttribute;
    const positions = posAttr.array as Float32Array;
    const colors = colAttr.array as Float32Array;

    const mouseEase = 1 - Math.exp(-MOUSE_EASE * d);
    mouse.current.x += (mouse.current.tx - mouse.current.x) * mouseEase;
    mouse.current.y += (mouse.current.ty - mouse.current.y) * mouseEase;

    const mdx = mouse.current.x - prevMouse.current.x;
    const mdy = mouse.current.y - prevMouse.current.y;
    const instant = Math.sqrt(mdx * mdx + mdy * mdy) / Math.max(d, 1e-4);
    const rise = 1 - Math.exp(-14 * d);
    const fall = 1 - Math.exp(-2 * d);
    if (instant > mouseSpeed.current) {
      mouseSpeed.current += (instant - mouseSpeed.current) * rise;
    } else {
      mouseSpeed.current += (instant - mouseSpeed.current) * fall;
    }
    prevMouse.current.x = mouse.current.x;
    prevMouse.current.y = mouse.current.y;

    const energy = smoothstep(SPEED_FLOOR, SPEED_CEIL, mouseSpeed.current);
    const flowRadius = RADIUS_MIN + (RADIUS_MAX - RADIUS_MIN) * energy;
    const flowStrength =
      STRENGTH_MIN + (STRENGTH_MAX - STRENGTH_MIN) * energy;
    const returnSpring = RETURN_SLOW + (RETURN_FAST - RETURN_SLOW) * energy;
    const blend = 1 - Math.exp(-returnSpring * d);

    mouseNdc.current.set(mouse.current.x, mouse.current.y);
    raycaster.current.setFromCamera(mouseNdc.current, state.camera);

    invMatrix.current.copy(p.matrixWorld).invert();
    localRayOrigin.current
      .copy(raycaster.current.ray.origin)
      .applyMatrix4(invMatrix.current);
    localRayDir.current
      .copy(raycaster.current.ray.direction)
      .transformDirection(invMatrix.current)
      .normalize();

    const ox = localRayOrigin.current.x;
    const oy = localRayOrigin.current.y;
    const oz = localRayOrigin.current.z;
    const dx = localRayDir.current.x;
    const dy = localRayDir.current.y;
    const dz = localRayDir.current.z;

    const inner = flowRadius * 0.14;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];

      const vx = bx - ox;
      const vy = by - oy;
      const vz = bz - oz;
      const t = Math.max(0, vx * dx + vy * dy + vz * dz);
      const cx = ox + dx * t;
      const cy = oy + dy * t;
      const cz = oz + dz * t;
      const ex = bx - cx;
      const ey = by - cy;
      const ez = bz - cz;
      const dist = Math.sqrt(ex * ex + ey * ey + ez * ez);

      const raw = 1 - smoothstep(inner, flowRadius, dist);
      const influence = raw * raw + raw * energy * 0.75;

      let tx = bx;
      let ty = by;
      let tz = bz;

      if (influence > 0.001) {
        const rlen = Math.sqrt(bx * bx + by * by + bz * bz) || 1;
        const nx = bx / rlen;
        const ny = by / rlen;
        const nz = bz / rlen;

        let rx: number;
        let ry: number;
        let rz: number;
        if (dist > 1e-4) {
          rx = ex / dist;
          ry = ey / dist;
          rz = ez / dist;
        } else {
          rx = nx;
          ry = ny;
          rz = nz;
        }

        const dotN = rx * nx + ry * ny + rz * nz;
        pushDir.current.set(rx - nx * dotN, ry - ny * dotN, rz - nz * dotN);
        const plen = Math.sqrt(
          pushDir.current.x * pushDir.current.x +
            pushDir.current.y * pushDir.current.y +
            pushDir.current.z * pushDir.current.z,
        );
        if (plen > 1e-4) {
          pushDir.current.multiplyScalar(1 / plen);
        }

        const tangentAmt = influence * flowStrength * (1 - energy * 0.35);
        const repelAmt = influence * flowStrength * (0.25 + energy * 0.85);
        const radialAmt = influence * RADIAL_MAX * energy;

        tx =
          bx +
          pushDir.current.x * tangentAmt +
          rx * repelAmt +
          nx * radialAmt;
        ty =
          by +
          pushDir.current.y * tangentAmt +
          ry * repelAmt +
          ny * radialAmt;
        tz =
          bz +
          pushDir.current.z * tangentAmt +
          rz * repelAmt +
          nz * radialAmt;
      }

      positions[i3] += (tx - positions[i3]) * blend;
      positions[i3 + 1] += (ty - positions[i3 + 1]) * blend;
      positions[i3 + 2] += (tz - positions[i3 + 2]) * blend;

      liftColor.current.setRGB(
        baseColors[i3],
        baseColors[i3 + 1],
        baseColors[i3 + 2],
      );
      liftColor.current.lerp(white.current, influence * COLOR_LIFT * (0.45 + energy * 0.55));
      colors[i3] += (liftColor.current.r - colors[i3]) * blend;
      colors[i3 + 1] += (liftColor.current.g - colors[i3 + 1]) * blend;
      colors[i3 + 2] += (liftColor.current.b - colors[i3 + 2]) * blend;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return <points ref={points} geometry={geometry} material={material} />;
}

export function ParticleSphere({ active }: { active: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <Sphere />
    </Canvas>
  );
}
