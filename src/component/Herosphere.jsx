import React, { useRef, useState, useMemo ,} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import "./herosphere.css";




function AnimatedSphere({ spinning }) {

  const sphereRef = useRef();
  const particlesRef = useRef();
  const hoverPoint = useRef(null); // ✅ useRef instead of useState
  const originalPositions = useRef(null);

  // Sphere geometry
  const geometry = new THREE.IcosahedronGeometry(4,3);
  const wireframe = new THREE.WireframeGeometry(geometry);

 

  // --- Generate floating particles around sphere ---
  const { basePositions, particleGeometry } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 200;
    const positions = [];
    const basePositions = [];

    for (let i = 0; i < count; i++) {
      const dir = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize();

      const distance = 4 + Math.random() * 0.3; // base gap
      const pos = dir.multiplyScalar(distance);

      positions.push(pos.x, pos.y, pos.z);
      basePositions.push([pos.x, pos.y, pos.z]); // store base once
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return { basePositions, particleGeometry: geo };
  }, []);

  const scatter = useRef(0);
  const tempVec = new THREE.Vector3(); // ✅ reused to avoid allocations

  useFrame(() => {
    if (!sphereRef.current) return;

    // smooth scatter factor
    scatter.current += ((spinning ? 1 : 0) - scatter.current) * 0.05;

    // rotate sphere
    sphereRef.current.rotation.x += 0.010;
    sphereRef.current.rotation.y += 0.008;
    sphereRef.current.rotation.z += 0.006;

    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.010;
      particlesRef.current.rotation.y += 0.008;
      particlesRef.current.rotation.z += 0.006;
    }

    // update particle positions smoothly outward
    const pos = particleGeometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const [bx, by, bz] = basePositions[i];
      tempVec.set(bx, by, bz).normalize();
      const baseDist = Math.sqrt(bx * bx + by * by + bz * bz);
      const extra = scatter.current * 2.5; // outward movement
      const newPos = tempVec.multiplyScalar(baseDist + extra);
      pos.setXYZ(i, newPos.x, newPos.y, newPos.z);
    }
    pos.needsUpdate = true;

    // sphere hover expansion
    const sPos = geometry.attributes.position;
    if (!originalPositions.current) {
      // ✅ store once
      originalPositions.current = sPos.array.slice();
    } else {
      // ✅ restore only once per frame
      for (let i = 0; i < sPos.count; i++) {
        sPos.setXYZ(
          i,
          originalPositions.current[i * 3],
          originalPositions.current[i * 3 + 1],
          originalPositions.current[i * 3 + 2]
        );
      }
    }

    if (hoverPoint.current) {
      for (let i = 0; i < sPos.count; i++) {
        tempVec.fromBufferAttribute(sPos, i);
        const dist = tempVec.distanceTo(hoverPoint.current);
        if (dist < 0.6) {
          const dir = tempVec.clone().sub(hoverPoint.current).normalize();
          tempVec.addScaledVector(dir, 0.15 * (0.6 - dist));
          sPos.setXYZ(i, tempVec.x, tempVec.y, tempVec.z);
        }
      }
    }
    sPos.needsUpdate = true;
  });

  return (
    <group
      ref={sphereRef}
      onPointerMove={(e) => {
        hoverPoint.current = e.point.clone(); // ✅ no re-render
      }}
      onPointerOut={() => {
        hoverPoint.current = null; // ✅ no re-render
      }}
    >
      {/* Wireframe */}
      <lineSegments geometry={wireframe}>
        <lineBasicMaterial color="#615f5f" />
      </lineSegments>

      {/* Dots on vertices */}
      <points geometry={geometry}>
        <pointsMaterial color="#2c2b2b" size={0.06} />
      </points>

      {/* Floating particles */}
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial color="#2c2b11" size={0.07} transparent opacity={0.8} />
      </points>
    </group>
  );
}

const Herosphere = () => {
  const [spinning, setSpinning] = useState(false);

  return (
    <div id="container" className="container">
      <Canvas className="sphere-container" camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[-11, 9, 4]} intensity={20} decay={2} distance={90} />
        <AnimatedSphere spinning={spinning} />
        <pointLight position={[10, -7, -2]} intensity={10} />
        <OrbitControls
          enableZoom={false}
          onStart={() => setSpinning(true)}
          onEnd={() => setSpinning(false)}
        />
      </Canvas>
    </div>
  );
};

export default Herosphere;



