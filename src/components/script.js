import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from 'dat.gui';

import vertexShader from '../shaders/vertex.glsl.js';
import fragmentShader from '../shaders/fragment.glsl.js';
import vertexPars from '../shaders/verterx_pars.glsl.js';
import vertexMain from '../shaders/vertex_main.glsl.js'

import fragmentMain from '../shaders/fragment_main.glsl.js';
//import fragmentPars from '../shaders/fragment_pars.glsl.js';

//import colorfulTexture from '../images/image.jpg';

let currentRef = null;
const gui = new dat.GUI();


//const {clientWidth: width, clientHeight: height} = currentRef;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x5c7aff);
const camera = new THREE.PerspectiveCamera( 10, 100 / 100, 0.01, 1000 );
scene.add(camera);
camera.position.set(0, -25, 0);
camera.lookAt(new THREE.Vector3());

const renderer = new THREE.WebGLRenderer();
//renderer.setSize(width, height);

//para mover la figura
const controls = new OrbitControls(camera, renderer.domElement);
//para que se siga moviendo el objeto despues de mover el mouse
controls.enableDamping = true;

//resize
const resize = () =>{
    renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
    camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
    camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);

//para indicarle el punto de referencia donde debería moverse, es vector3 porque tiene 3 ejes (x,y,z)
//controls.target = new THREE.Vector3(3,3,3);


//para cargar la textura
//const textureLoader = new THREE.TextureLoader();
//const texturaPrueba = textureLoader.load('./textures/prueba.png');

//para crear un cubo
/*const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhongMaterial({matcap: texturaPrueba});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(-1, 0, 0);
scene.add(cube);*/

//crear un plano

//modificar el material del plano
/*const planeMaterial = new THREE.ShaderMaterial({
    vertexShader: `
        void main(){
            gl_Position = projectionMatriz * modelViewMatrix * vec4(position, 1);
        }
    `,
    fragmentShader: `
        void main(){
            gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
        }
    `
});*/

/*const planeGeometry = new THREE.PlaneGeometry(1, 2);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
//plane.position.set(0, 0, 0);
scene.add(plane);*/

//crear una icosphere
//const geometry = new THREE.IcosahedronGeometry(1,5);
const geometry = new THREE.IcosahedronGeometry(1, 100);
const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
});
//const material = new THREE.MeshStandardMaterial({
    //onBeforeCompile: (shader) => {
        //guardando una referencia de los shaders
        //material.userData.shader = shader;
        //const parsVertexString = /* glsl */ `#include <displacementmap_pars_vertex>`
        //const mainVertexString = /* glsl */ `#include <displacementmap_vertex>`
        //shader.vertexShader = shader.vertexShader.replace(parsVertexString, parsVertexString + vertexPars);
        //shader.vertexShader = shader.vertexShader.replace(mainVertexString, mainVertexString + vertexMain);
        //console.log(shader.vertexShader);

        //const mainFragmentString = /* glsl */ `#include <normal_fragment_maps>`
        //const parsFragmentString = /* glsl */ `#include <bumpmap_pars_fragment>`
        //shader.fragmentShader = shader.fragmentShader.replace(parsFragmentString, parsFragmentString + fragmentPars);
        //shader.fragmentShader = shader.fragmentShader.replace(mainFragmentString, mainFragmentString + fragmentMain);
        //console.log(shader.fragmentShader);
    //}
//});
const ico = new THREE.Mesh(geometry, material);
scene.add(ico);

//material.userData.shader.uniforms.uTime = {value: 0}
//material.uniforms.uRadius = {value: 0.5}
//material.uniforms.uDisplacement = {value: 3.0}
//material.uniforms.uTexture = {value: new THREE.TextureLoader().load(colorfulTexture)}

//gui.add(material.uniforms.uDisplacement, "value").min(1.0).max(10.0);
//gui.add(material.uniforms.uRadius, "value").min(0).max(1);

/*const spheres = [];

const userCollection = collection(db, "users");
onSnapshot(userCollection, (querySnapshot) => {
    spheres.forEach(sphere => scene.remove(sphere));
    spheres.length = 0;

    querySnapshot.forEach((doc) => {
        const user = doc.data();
        const sphereGeometry = new THREE.SphereGeometry( 0.8, 32, 16 );
        const sphereMaterial = new THREE.MeshPhongMaterial({color: 0x7f3b16});
        const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
        //sphere.position.x = 2;
        //para que se puedan poner las posiciones en X, Y y Z en solo una linea de codigo
        sphere.position.set(user.x, user.y, user.z);
        scene.add( sphere );
        spheres.push( sphere );
    });

});*/



//para crear una esfera
/*const sphereGeometry = new THREE.SphereGeometry( 0.8, 32, 16 );
const sphereMaterial = new THREE.MeshPhongMaterial({color: 0x7f3b16});
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
//sphere.position.x = 2;
 //para que se puedan poner las posiciones en X, Y y Z en solo una linea de codigo
sphere.position.set(0, 0, 0)
scene.add( sphere );

const positions = gui.addFolder("Positions")
//posiciones de la esfera
positions.add(sphere.position, "x").min(-5).max(5).step(0.5).name('Post X');
positions.add(sphere.position, 'y').min(-10).max(10).step(0.5).name('Post Y');
positions.add(sphere.position, 'z').min(-5).max(5).step(0.5).name('Post Z');

//escala de la esfera
const sphereScale = {
    scale: 1,
}

const sphereColor = {
    color: 0x7f3b16
}

//cambiar la escala de la esfera, segun su 3 tamaños determinados
gui.add(sphereScale, 'scale', {"Small": 1, "Medium":2, "Big": 3}).name("Escala").onChange(()=>{sphere.scale.set(sphereScale.scale, sphereScale.scale, sphereScale.scale)});

//cambiar el color de la esfera
gui.addColor(sphereColor, "color").name("color").onChange(() => {sphere.material.color.set(sphereColor.color)});*/


//para agregar una luz que ilumina todo
const ambientLight = new THREE.AmbientLight( 0xfffffff, 0.5 ); // soft white light
scene.add( ambientLight );

//la luz de foco
const pointLight = new THREE.PointLight(0xffff00, 1.3);
pointLight.position.set(12, -12, 12);
scene.add(pointLight);
const light = gui.addFolder("Light")
light.add(pointLight.position, "x").min(-12).max(12).step(0.5).name('Light X');
light.add(pointLight.position, "y").min(-12).max(12).step(0.5).name('Light Y');
light.add(pointLight.position, "z").min(-12).max(12).step(0.5).name('Light Z');

//directional light
const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    1.3
);
directionalLight.position.set(1,2,0);
//scene.add(directionalLight);


 const clock = new THREE.Clock();
const animate = () => {
    const elapsedTime = clock.getElapsedTime();
    //cube.rotation.y = elapsedTime;
    //cube.rotation.x = elapsedTime;
    //cube.position.y = Math.cos(elapsedTime);

    /*sphere.rotation.y = elapsedTime;
    sphere.rotation.x = elapsedTime;
    sphere.rotation.y = Math.cos(elapsedTime);*/


    controls.update();
    //para que se rederice
    renderer.render(scene, camera);
    requestAnimationFrame(animate)
}
animate();

//para que se cree la escena
export const mountScene = (mountRef) => {
    currentRef = mountRef.current; 
    resize();
    currentRef.appendChild(renderer.domElement);
}

//para que se limpie la escena
export const cleanUpScene = ()  =>{
    //scene.dispose();
    //supuestamente para borrar el gui para que no se repita
    //gui.destroy();
    currentRef.removeChild(renderer.domElement);
}