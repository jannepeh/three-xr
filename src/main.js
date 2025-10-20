import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene, renderer, camera, controls;

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(8, 6, 8);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // Orbit Controls - allows camera rotation with mouse
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  const axisHelper = new THREE.AxesHelper(5);
  scene.add(axisHelper);

  // Three different lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 10, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.left = -10;
  directionalLight.shadow.camera.right = 10;
  directionalLight.shadow.camera.top = 10;
  directionalLight.shadow.camera.bottom = -10;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffaa00, 0.5, 20);
  pointLight.position.set(-5, 5, 0);
  scene.add(pointLight);

  // Geometry 1: PlaneGeometry
  const groundGeometry = new THREE.PlaneGeometry(20, 20);
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x228b22,
    roughness: 0.8,
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const car = new THREE.Group();

  // Geometry 2: BoxGeometry
  const bodyGeometry = new THREE.BoxGeometry(4, 1, 2);
  const bodyMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    shininess: 100,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 1;
  body.castShadow = true;
  car.add(body);

  const cabinGeometry = new THREE.BoxGeometry(2, 1, 1.8);
  const cabinMaterial = new THREE.MeshLambertMaterial({
    color: 0x8b0000,
  });
  const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
  cabin.position.set(-0.5, 1.5, 0);
  cabin.castShadow = true;
  car.add(cabin);

  // Geometry 3: CylinderGeometry
  const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
  const wheelMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
    metalness: 0.3,
    roughness: 0.7,
  });

  const wheelPositions = [
    { x: 1.2, y: 0.4, z: 1.1 },
    { x: 1.2, y: 0.4, z: -1.1 },
    { x: -1.2, y: 0.4, z: 1.1 },
    { x: -1.2, y: 0.4, z: -1.1 },
  ];

  wheelPositions.forEach((pos) => {
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(pos.x, pos.y, pos.z);
    wheel.castShadow = true;
    car.add(wheel);
  });

  scene.add(car);

  window.addEventListener("resize", onWindowResize);
}

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
