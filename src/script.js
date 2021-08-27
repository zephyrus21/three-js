import './style.css';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

//!--------- Texture -------------!//

//* Both are same size

//? 1
// const image = new Image();
// const texture = new THREE.Texture(image);

// image.onload = () => {
//   texture.needsUpdate = true;
// };

// image.src = '/textures/door/color.jpg';

//? 2
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/textures/door/color.jpg');

//!------------------------!//

const geometry = new THREE.BoxBufferGeometry(1, 1, 1);

const parameter = {
  color: '#ff0000',
};

const material = new THREE.MeshBasicMaterial({
  map: texture,
  color: parameter.color,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//!--------- Debug UI -------------!//
const gui = new dat.GUI();
gui.hide();

gui.add(mesh.position, 'x').min(-1).max(1);
gui.add(mesh.position, 'y').min(-1).max(1);
gui.add(mesh.position, 'z').min(-1).max(1);

gui.add(mesh, 'visible');

gui.add(material, 'wireframe');

//* Changing color
gui.addColor(parameter, 'color').onChange(() => {
  material.color.set(parameter.color);
});

//!------------------------!//

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
