import './style.css';
import * as THREE from 'three';

//! Canvas
const canvas = document.querySelector('.webgl');

//! Scene
const scene = new THREE.Scene();

//* Basic Objects

//! Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: '#ff0000' });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//? Position, Scale, Rotation
// mesh.position.set(0.7, -0.6, 1);
// mesh.scale.set(2, 0.5, 0.5);
// mesh.rotation.set(0, 2, 0);

//! Group
// const group = new THREE.Group();
// scene.add(group);

// const cube1 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: '#ff0000' })
// );

// const cube2 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: '#ff00ff' })
// );

// const cube3 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: '#ffff00' })
// );
// group.add(cube1, cube2, cube3);

// cube1.position.set(-2, 0, 0);
// cube3.position.set(2, 0, 0);
//! Axes helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

//! Sizes
const size = {
  width: 800,
  height: 600,
};

//! camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 3;
scene.add(camera);

// camera.lookAt(mesh.position);

//! Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);

//* Animations

// let time = Date.now();

// const clock = new THREE.Clock();

const tick = () => {
  //* animation using Clock in Three.js
  // const elapsedTime = clock.getElapsedTime();

  //* to make animation same in every computer
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;

  // mesh.position.x += 0.002 * deltaTime;
  // if (mesh.position.x > 4) mesh.position.x = -4;
  // mesh.position.x = Math.sin(elapsedTime);
  // mesh.position.y = Math.cos(elapsedTime);
  // camera.position.x = Math.sin(elapsedTime);
  // camera.position.y = Math.cos(elapsedTime);
  // camera.lookAt(mesh.position);

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
tick();
