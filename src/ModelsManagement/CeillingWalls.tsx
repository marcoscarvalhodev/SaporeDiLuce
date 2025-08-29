import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { JSX } from 'react'

type GLTFResult = GLTF & {
  nodes: {
    ceilling_walls: THREE.Mesh
  }
  materials: {"": THREE.MeshStandardMaterial}
}

export function CeillingWalls(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/ceilling_walls.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ceilling_walls.geometry}
        material={nodes.ceilling_walls.material}
        position={[-0.378, 4.473, -2.514]}
      />
    </group>
  )
}

useGLTF.preload('/ceilling_walls.glb')
