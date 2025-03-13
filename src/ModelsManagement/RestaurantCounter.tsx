import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { JSX } from 'react'

type GLTFResult = GLTF & {
  nodes: {
    light_counter013: THREE.Mesh
  }
  materials: {"" : THREE.MeshStandardMaterial}
}

export function RestaurantCounter(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/restaurant_counter.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.light_counter013.geometry}
        material={nodes.light_counter013.material}
        position={[0.099, 0.449, -6.777]}
        scale={[1, 0.826, 1]}
      />
    </group>
  )
}

useGLTF.preload('/restaurant_counter.glb')