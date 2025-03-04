import { Camera } from '@react-three/fiber';
import * as THREE from 'three';
export default class RotateCamera {
  public camera;
  public previousMousePosition;
  public isMouseDown;
  public xRotationLimits;
  public deltaX;
  public deltaY;
  public normalizedZ;
  public normalizedX;
  public normalizedY;
  public targetRotation;
  public dampingFactor;
  public rotationOffset;
  public rotationSpeed;

  constructor(camera: Camera) {
    this.isMouseDown = false;
    this.camera = camera;
    this.previousMousePosition = new THREE.Vector2(0, 0);
    this.xRotationLimits = { min: -Math.PI / 4, max: Math.PI / 4 };

    this.deltaX = 0;
    this.deltaY = 0;
    this.normalizedZ = 0;
    this.normalizedX = 0;
    this.normalizedY = 0;

    this.targetRotation = new THREE.Euler();
    this.dampingFactor = 0.035;
    this.rotationOffset = 0.1;
    this.rotationSpeed = 0.005;

    window.addEventListener("mousedown", this.onMouseDown)
    window.addEventListener("mousemove", this.onMouseMove)
    window.addEventListener("mouseup", this.onMouseUp)
  }

  onMouseDown(event: MouseEvent) {
    this.previousMousePosition.set(event.clientX, event.clientY);
    this.isMouseDown = true;
  }

  onMouseMove = (event: MouseEvent) => {
    if (!this.isMouseDown || !this.camera) return;

    this.deltaX = event.clientX - this.previousMousePosition.x;
    this.deltaY = event.clientY - this.previousMousePosition.y;

    const targetYRotation = this.camera.rotation.y + this.deltaX * 0.2;
    const targetXRotation = this.camera.rotation.x + this.deltaY * 0.2;

    this.camera.rotation.y = THREE.MathUtils.lerp(
      this.camera.rotation.y,
      targetYRotation,
      this.dampingFactor
    );
    this.camera.rotation.x = THREE.MathUtils.lerp(
      this.camera.rotation.x,
      targetXRotation,
      this.dampingFactor
    );

    this.previousMousePosition.set(event.clientX, event.clientY);
  };

  onMouseUp = () => {
    this.isMouseDown = false;

    if (this.camera) {
      this.targetRotation.copy(this.camera.rotation);
      this.targetRotation.y +=
        this.deltaX * this.rotationSpeed + this.rotationOffset;
      this.targetRotation.x +=
        this.deltaY * this.rotationSpeed + this.rotationOffset;
    }

    this.animate();
  };

  animate = () => {
    if (this.isMouseDown) return;

    if (this.camera) {
      this.camera.rotation.x = THREE.MathUtils.lerp(
        this.camera.rotation.x,
        this.targetRotation.x,
        this.dampingFactor
      );
      this.camera.rotation.y = THREE.MathUtils.lerp(
        this.camera.rotation.y,
        this.targetRotation.y,
        this.dampingFactor
      );
    }
  };

  update() {
    this.animate();
  }
}
