import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useEffect } from 'react';

export const Home = () => {

    useEffect(() => {
        // SCENE
        const scene = new THREE.Scene();

        // CAMERA
        const aspect = window.innerWidth / window.innerHeight;
        const camera = new THREE.PerspectiveCamera(75, aspect, .01, 1000);
        camera.position.set(0, 1, 3);

        // RENDERER
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        renderer.render(scene, camera);

        // CONTROLS
        const controls = new OrbitControls(camera, renderer.domElement);

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

        hideLoadingScreen();

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
        scene.add(cube);



        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', onResize);
            document.body.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <Link to="/">Accueil</Link> | <Link to="/about">À propos</Link>
        </div>
    );
}

export default Home;