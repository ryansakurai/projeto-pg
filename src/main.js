import * as THREE from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {CameraSet} from "./camera-set.js"

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(26,82,168)");

const cameraSet = new CameraSet();

const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera1.position.set(0, 0, 7);
camera1.lookAt(0, 0, 0);
cameraSet.addCamera(camera1);

const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera2.position.set(4, 4, 7);
camera2.lookAt(0, 0, 0);
cameraSet.addCamera(camera2);

const camera3 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera3.position.set(-4, -4, 7);
camera3.lookAt(0, 0, 0);
cameraSet.addCamera(camera3);

const camera4 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera4.position.set(0, 6, 0);
camera4.lookAt(0, 0, 0);
cameraSet.addCamera(camera4);

const directionalLight = new THREE.DirectionalLight(undefined, 3);
directionalLight.position.set(2, 1, 3);
scene.add(directionalLight);

let duck
const loader = new GLTFLoader();
loader.load(
    "../assets/duck/Duck.gltf",
    (gltf) => {
        duck = gltf.scene;
        scene.add(duck);
        duck.position.set(0, -1, 0)
        duck.rotation.y -= 1.85;
        duck.rotation.x += 0.2;
    }
);

const ringMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 }
    },
    vertexShader: `
        // stardard projection procedure
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        void main() {
            // interpolation between white and red based on time
            vec3 rgbColor = mix(vec3(1.0, 1.0, 1.0), vec3(1.0, 0, 0), 0.5 + 0.5 * sin(time));
            vec4 rgbaColor = vec4(rgbColor, 1.0);
            gl_FragColor = rgbaColor;
        }
    `
});

const ring1 = new THREE.Mesh(
    new THREE.TorusGeometry(2.25, 0.1, 16, 100),
    ringMaterial
);
scene.add(ring1);
const RING1_SPEED = [Math.random()*0.1, Math.random()*0.1, Math.random()*0.1];

const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.75, 0.1, 16, 100),
    ringMaterial
);
scene.add(ring2);
const RING2_SPEED = [Math.random()*0.1, Math.random()*0.1, Math.random()*0.1];

const animate = () => {
    requestAnimationFrame(animate);

    ringMaterial.uniforms.time.value += 0.1;

    ring1.rotation.x += RING1_SPEED[0];
    ring1.rotation.y += RING1_SPEED[1];
    ring1.rotation.z += RING1_SPEED[2];

    ring2.rotation.x += RING2_SPEED[0];
    ring2.rotation.y += RING2_SPEED[1];
    ring2.rotation.z += RING2_SPEED[2];

    renderer.render(scene, cameraSet.currentCamera);
}

document.addEventListener(
    'keydown',
    (event) => {
        if(event) {
            if(event.key === "ArrowUp")
                cameraSet.prevCamera();
            else if(event.key === "ArrowDown")
                cameraSet.nextCamera();
        }
    }
);

window.addEventListener(
    'resize',
    () => {
        camera1.aspect = camera2.aspect = window.innerWidth / window.innerHeight;
        camera1.updateProjectionMatrix();
        camera2.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
);

animate();
