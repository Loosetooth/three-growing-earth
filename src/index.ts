import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TIFFLoader } from 'three/examples/jsm/loaders/TIFFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 64, 32);
const loader = new TIFFLoader();
const texture = loader.load('age_lithosphere_map_noscale.tif')
const material = new THREE.MeshBasicMaterial( { map: texture } );
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', onWindowResize);

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();