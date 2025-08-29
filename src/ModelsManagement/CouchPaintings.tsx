import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { JSX } from 'react'

type GLTFResult = GLTF & {
  nodes: {
    couch_paintings: THREE.Mesh
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
        geometry={nodes.couch_paintings.geometry}
        material={nodes.couch_paintings.material}
        position={[2.473, 2.023, 5.344]}
      />
    </group>
  )
}

useGLTF.preload('/couch_paintings.glb')
