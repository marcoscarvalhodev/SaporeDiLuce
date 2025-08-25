import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { JSX } from 'react'
type GLTFResult = GLTF & {
  nodes: {
    molding_doors002: THREE.Mesh
  }
  materials: {"": THREE.MeshStandardMaterial}
}

export function CouchPaintings(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/couch_paintings.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.molding_doors002.geometry}
        material={nodes.molding_doors002.material}
        position={[2.473, 2.023, 5.344]}
      />
    </group>
  )
}

useGLTF.preload('/couch_paintings.glb')
