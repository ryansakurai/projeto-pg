import * as THREE from 'three';

const SCENE = new THREE.Scene();
const CAMERA1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const CAMERA2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const RENDERER = new THREE.WebGLRenderer({ antialias: true });
const BOX_GEOMETRY = new THREE.BoxGeometry();
const MATERIAL = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const CUBE1 = new THREE.Mesh(BOX_GEOMETRY, MATERIAL);
const CUBE2 = new THREE.Mesh(BOX_GEOMETRY, MATERIAL);
const CUBE3 = new THREE.Mesh(BOX_GEOMETRY, MATERIAL);
let currentCamera = CAMERA1;

const init = () => {
    RENDERER.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(RENDERER.domElement);
    CAMERA1.position.set(0, 0, 5);
    CAMERA1.lookAt(0, 0, 0);
    CAMERA2.position.set(5, 5, 5);
    CAMERA2.lookAt(0, 0, 0);
    CUBE1.position.set(-2, 0, 0);
    CUBE2.position.set(0, 0, 0);
    CUBE3.position.set(2, 0, 0);
    SCENE.add(CUBE1, CUBE2, CUBE3);
}

const animate = () => {
    requestAnimationFrame(animate);

    CUBE1.rotation.x += 0.01;
    CUBE1.rotation.y += 0.01;

    CUBE2.rotation.x += 0.01;
    CUBE2.rotation.y += 0.01;

    CUBE3.rotation.x += 0.01;
    CUBE3.rotation.y += 0.01;

    RENDERER.render(SCENE, currentCamera);
}

document.addEventListener('keydown', (event) => {
    if(event) {
        if(event.key === "ArrowUp")
            currentCamera = CAMERA1;
        else if(event.key === "ArrowDown")
            currentCamera = CAMERA2;
    }
});

window.addEventListener('resize', () => {
    CAMERA1.aspect = CAMERA2.aspect = window.innerWidth / window.innerHeight;
    CAMERA1.updateProjectionMatrix();
    CAMERA2.updateProjectionMatrix();
    RENDERER.setSize(window.innerWidth, window.innerHeight);
});

init();
animate();