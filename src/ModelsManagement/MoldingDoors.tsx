import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { JSX } from 'react'

type GLTFResult = GLTF & {
  nodes: {
    molding_doors: THREE.Mesh
  }
  materials: {"": THREE.MeshStandardMaterial}
}

export function MoldingDoors(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/molding_doors.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.molding_doors.geometry}
        material={nodes.molding_doors.material}
        position={[8.114, 2.518, -6.452]}
      />
    </group>
  )
}

useGLTF.preload('/molding_doors.glb')