import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: '#ff0000' })
);
scene.add(mesh);

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//! Update canvas size on window resize
window.addEventListener('resize', () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const cursor = {
  x: 0,
  y: 0,
};

//! Mouse movement
window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / size.width - 0.5;
  cursor.y = -(e.clientY / size.height - 0.5);
});

//! Fullscreen
window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) canvas.requestFullscreen();
  else document.exitFullscreen();
});

//! Perspective Camera
const camera = new THREE.PerspectiveCamera(
  60,
  size.width / size.height,
  0.1,
  100
);

//! Orthographic Camera
// const aspectRatio = size.width / size.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );

camera.position.z = 2;
// camera.position.set(2, 2, 2);
camera.lookAt(mesh.position);
scene.add(camera);

//! Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// const clock = new THREE.Clock();

const tick = () => {
  // const elapsedTime = clock.getElapsedTime();

  //* Update Camera
  // camera.position.x = cursor.x * 10;
  // camera.position.y = cursor.y * 10;
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 10;
  // camera.lookAt(mesh.position);

  // mesh.rotation.y = elapsedTime;

  //* control update
  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
tick();
