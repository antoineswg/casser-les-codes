import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useEffect } from 'react';


import Navbar from '../components/Navbar';

export const Home = ({oui}) => {

    useEffect(() => {
        // SCENE
        const scene = new THREE.Scene();

        const center = new THREE.Vector3(1.5, 1.5, -5.5);

        // CAMERA
        const aspect = window.innerWidth / window.innerHeight;
        const camera = new THREE.PerspectiveCamera(75, aspect, .01, 1000);
        camera.position.copy(center.clone().add(new THREE.Vector3(-.1, 0, 0)));

        // RENDERER
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        renderer.setClearColor(0x000000, 0);
        renderer.render(scene, camera);

        // CONTROLS
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.copy(center);
        controls.enableRotate = true;
        controls.minPolarAngle = THREE.MathUtils.degToRad(60);
        controls.maxPolarAngle = THREE.MathUtils.degToRad(100);
        controls.maxDistance = 2;
        controls.zoomSpeed = 3;
        controls.update();

        // RESIZE
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener('resize', onResize);
        onResize();

        // HIDE LOADING SCREEN
        const hideLoadingScreen = () => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
        };

        const animation = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animation);
        }

        animation();

        // CUBE
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0xfedcba });
        const cube = new THREE.Mesh(geometry, material);
        cube.scale.set(.1, .1, .1);
        cube.position.set(1.5, 1, -5);
        //scene.add(cube);

        // LIGHTS
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // MODELS
        const toLoad = ['office','door', 'objects'];

        toLoad.forEach((modelName) => {
            const loader = new GLTFLoader();
            loader.load(
            `models/${modelName}.glb`,
            (gltf) => {
            const model = gltf.scene;
            model.name = modelName; 
            model.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
            model.position.set(0, 0, 0);
            });
            scene.add(model);
            hideLoadingScreen();
            },
            (xhr) => {
            console.log(`${modelName} : ${(xhr.loaded / xhr.total * 100)}% loaded`);
            },
            (error) => {
            console.error(`An error happened with ${modelName}`, error);
            }
            );
        });

        // INTERACTIVITY
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseClick = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(scene.children, true);

            intersects.forEach((intersect) => {
                if (intersect.object.name === 'porte') {
                    camera.position.set(2, 2, 2);
                }
            });
        };

        window.addEventListener('click', onMouseClick);

        // enlever la scene au changement de fenetre
        return () => {
            window.removeEventListener('resize', onResize);
            document.body.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <>
        </>
    );
}

export default Home;