import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Particle {
  x: number;
  y: number;
  z: number;
  speedY: number;
  speedX: number;
  speedZ: number;
  scale: number;
  rotation: number;
  rotationSpeed: number;
  life: number;
}

interface SteamParticlesProps {
  count?: number;
  position?: [number, number, number];
}

export function ParticleSteam({
  count = 10,
  position = [0, 0, 0],
}: SteamParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo<Particle[]>(() => {
    const temp: Particle[] = [];
    for (let i = 0; i < count; i++) {

      const angle = Math.random() * Math.PI * 0.1;
      const radius = Math.random() * 0.1;

      temp.push({
        x: Math.cos(angle) * radius,
        y: Math.random() * 0.5,
        z: Math.sin(angle) * radius,
        speedY: 0.008 + Math.random() * 0.008,
        speedX: (Math.random() - 0.5) * 0.003,
        speedZ: (Math.random() - 0.5) * 0.003,
        scale: 0.3 + Math.random() * 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        life: Math.random(),
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const smokeTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, 128, 256);

    for (let i = 0; i < 8; i++) {
      const x = 64 + (Math.random() - 0.5) * 60;
      const y = 64 + (Math.random() - 0.5) * 60;
      const radius = 20 + Math.random() * 40;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(
        0,
        `rgba(255,255,255,${0.3 + Math.random() * 0.3})`
      );
      gradient.addColorStop(
        0.5,
        `rgba(255,255,255,${0.1 + Math.random() * 0.2})`
      );
      gradient.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {

      const easeProgress = Math.min(particle.life / 2, 1);
      const easeFactor = easeProgress * easeProgress;


      const currentSpeed = particle.speedY * (0.6 + easeFactor * 0.8);
      particle.y += currentSpeed;
      particle.x += Math.sin(particle.life * 3) * 0.001;
      particle.z += Math.cos(particle.life * 3) * 0.001;
      particle.rotation += particle.rotationSpeed;
      particle.life += 0.01;

      const heightOpacity = Math.max(0, 1 - particle.y / 0.4);

      const fadeInDuration = 0.7;
      const fadeIn = Math.min(particle.life / fadeInDuration, 1);


      const opacity = heightOpacity * fadeIn;

      const scale = particle.scale * (0.3 + particle.y * 0.2); // Grow as it rises

      if (particle.y > 1.5 || opacity <= 0) {
        const angle = Math.random() * Math.PI * 0.1;
        const radius = Math.random() * 0.1;
        particle.x = Math.cos(angle) * radius;
        particle.y = 0;
        particle.z = Math.sin(angle) * radius;
        particle.life = 0;
        particle.rotation = Math.random() * Math.PI * 2;
      }

      dummy.position.set(
        position[0] + particle.x,
        position[1] + particle.y,
        position[2] + particle.z
      );
      dummy.quaternion.copy(state.camera.quaternion);
      dummy.rotation.z = particle.rotation;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);

      const color = new THREE.Color().setRGB(1, 1, 1).multiplyScalar(opacity);
      meshRef.current!.setColorAt(i, color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      frustumCulled={false}
      ref={meshRef}
      args={[undefined, undefined, count]}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={smokeTexture}
        transparent
        opacity={0.2}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}
