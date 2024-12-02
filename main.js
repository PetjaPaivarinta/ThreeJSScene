import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material2 = new THREE.MeshNormalMaterial( { color: 0x00ffff } );
const cube = new THREE.Mesh( geometry, material2 );
const cube2 = new THREE.Mesh( geometry, material2 );

cube.position.x = -2;
cube2.position.x = 2;

scene.add( cube );
scene.add( cube2 );

camera.position.z = 5;
controls.keys = {
	LEFT: 'ArrowLeft', //left arrow
	UP: 'ArrowUp', // up arrow
	RIGHT: 'ArrowRight', // right arrow
	BOTTOM: 'ArrowDown' // down arrow
}
controls.update();
controls.autoRotate = true;
controls.autoRotateSpeed = 10.0;
controls.enableDamping = true;
controls.dampingFactor = 0.01;


function animate() {
    controls.update();

    cube.rotation.x += 0.01;
    cube2.rotation.y -= 0.01;

    renderer.render( scene, camera );
}