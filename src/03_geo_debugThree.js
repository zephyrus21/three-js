import './style.css';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

const geometry = new THREE.BoxBufferGeometry(1, 1, 1);

const parameter = {
  color: '#ff0000',
};

const material = new THREE.MeshBasicMaterial({
  color: parameter.color,
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//!-------- Custom Geometry --------
// const geometry = new THREE.Geometry();

// const vertex1 = new THREE.Vector3(0, 0, 0);
// geometry.vertices.push(vertex1);
// const vertex2 = new THREE.Vector3(0, 1, 0);
// geometry.vertices.push(vertex2);
// const vertex3 = new THREE.Vector3(0, 0, 1);
// geometry.vertices.push(vertex3);

// const face = new THREE.Face3(0, 1, 2);
// geometry.faces.push(face);

// for (let i = 0; i < 50; i++) {
//   for (let j = 0; j < 3; j++) {
//     geometry.vertices.push(
//       new THREE.Vector3(Math.random(), Math.random(), Math.random())
//     );
//   }

//   const verticesIndex = i * 3;
//   geometry.faces.push(
//     new THREE.Face3(verticesIndex, verticesIndex + 1, verticesIndex + 2)
//   );
// }

//! ------------------------------

//!--------- Debug UI -------------
const gui = new dat.GUI();
gui.hide();

// gui.add(mesh.position, 'x', -1, 1, 0.01);
// gui.add(mesh.position, 'y', -1, 1, 0.01);
// gui.add(mesh.position, 'z', -1, 1, 0.01);

gui.add(mesh.position, 'x').min(-1).max(1);
gui.add(mesh.position, 'y').min(-1).max(1);
gui.add(mesh.position, 'z').min(-1).max(1);

gui.add(mesh, 'visible');

gui.add(material, 'wireframe');

//* Changing color
gui.addColor(parameter, 'color').onChange(() => {
  material.color.set(parameter.color);
});

// gui.addColor(material, 'color');

//!--------------------------------

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

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

window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / size.width - 0.5;
  cursor.y = -(e.clientY / size.height - 0.5);
});

window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) canvas.requestFullscreen();
  else document.exitFullscreen();
});

const camera = new THREE.PerspectiveCamera(
  70,
  size.width / size.height,
  0.1,
  100
);

camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  mesh.rotation.y = elapsedTime;

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
tick();
