import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

scene.background = new THREE.Color('#00FFFF');

const loader = new GLTFLoader();

let model;

loader.load( 'Assets/Models/cube.glb', function ( gltf ) {
    model = gltf.scene;
    scene.add(model);
}, function ( xhr ) {
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
}, function ( error ) {
    console.log( 'An error happened' );
} );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

const texture = new THREE.TextureLoader().load( 'Assets/markoboy.webp' );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 16, 16 );

const material = new THREE.MeshStandardMaterial( { map: texture } );
const planeGeometry = new THREE.PlaneGeometry( 100, 100, 100 );
const plane = new THREE.Mesh( planeGeometry, material );
plane.rotation.x = -Math.PI/2;
plane.position.y = -2;

const christmasTexture = new THREE.TextureLoader().load( 'Assets/christmastree.jpg' );
const christmasMaterial = new THREE.MeshBasicMaterial( { map: christmasTexture } );
const christmasGeometry = new THREE.PlaneGeometry( 40, 40, 40 );
const christmasTree = new THREE.Mesh( christmasGeometry, christmasMaterial );
christmasTree.position.z = -40;
christmasTree.position.y = 0;

const geometry = new THREE.TorusKnotGeometry(1, 0.3, 500, 500, 2, 3); 
const material2 = new THREE.MeshStandardMaterial({ color: 0x00ffff, metalness: 0.0, roughness: 0.4, wireframe: false, transparent: false, opacity: 1.0, side: THREE.DoubleSide, map: texture,  });
const cube = new THREE.Mesh(geometry, material2);

cube.position.x = -3;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

// directiona light
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

scene.add( christmasTree );
scene.add( plane );
scene.add( cube );

camera.position.set(0, 2, 4); 
controls.keys = {
	LEFT: 'ArrowLeft', //left arrow
	UP: 'ArrowUp', // up arrow
	RIGHT: 'ArrowRight', // right arrow
	BOTTOM: 'ArrowDown' // down arrow
}
controls.update();
controls.autoRotateSpeed = 10.0;
controls.enableDamping = true;
controls.dampingFactor = 0.01;
controls.enablePan = false;

function animate() {
    controls.update();

    plane.rotation.z += 0.002;
    cube.rotation.z += 0.01;
    cube.rotation.x += 0.01;
    if (model) {
        model.rotation.x += 0.01; // Rotate the model if it is loaded
        model.rotation.z += 0.01;
    }
    renderer.render( scene, camera );
}