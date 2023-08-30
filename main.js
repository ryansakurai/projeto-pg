import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const RENDERER = new THREE.WebGLRenderer({ antialias: true });
RENDERER.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(RENDERER.domElement);

const SCENE = new THREE.Scene();
SCENE.background = new THREE.Color("rgb(26,82,168)");

const CAMERA1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
CAMERA1.position.set(0, 0, 7);
CAMERA1.lookAt(0, 0, 0);

const CAMERA2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
CAMERA2.position.set(4, 4, 7);
CAMERA2.lookAt(0, 0, 0);

const DIRECTIONAL_LIGHT = new THREE.DirectionalLight(undefined, 3);
DIRECTIONAL_LIGHT.position.set(2, 1, 3);
SCENE.add(DIRECTIONAL_LIGHT);

let DUCK
const LOADER = new GLTFLoader();
LOADER.load(
    "assets/duck/Duck.gltf",
    (gltf) => {
        DUCK = gltf.scene;
        SCENE.add(DUCK);
        DUCK.position.set(0, -1, 0)
        DUCK.rotation.y -= 1.85;
        DUCK.rotation.x += 0.2;
    }
);

const RING1 = new THREE.Mesh(
    new THREE.TorusGeometry(2.25, 0.1, 16, 100),
    new THREE.MeshBasicMaterial( { color: 0xffff00 } )
);
SCENE.add(RING1);

const RING2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.75, 0.1, 16, 100),
    new THREE.MeshBasicMaterial( { color: 0xffff00 } )
);
SCENE.add(RING2);

let currentCamera = CAMERA1;

const animate = () => {
    requestAnimationFrame(animate);

    RING1.rotation.x += 0.015;
    RING1.rotation.y += 0.025;
    RING1.rotation.z += 0.035;

    RING2.rotation.x += 0.03;
    RING2.rotation.y += 0.02;
    RING2.rotation.z += 0.01;

    RENDERER.render(SCENE, currentCamera);
}

document.addEventListener(
    'keydown',
    (event) => {
        if(event) {
            if(event.key === "ArrowUp")
                currentCamera = CAMERA1;
            else if(event.key === "ArrowDown")
                currentCamera = CAMERA2;
        }
    }
);

window.addEventListener(
    'resize',
    () => {
        CAMERA1.aspect = CAMERA2.aspect = window.innerWidth / window.innerHeight;
        CAMERA1.updateProjectionMatrix();
        CAMERA2.updateProjectionMatrix();
        RENDERER.setSize(window.innerWidth, window.innerHeight);
    }
);

animate();
