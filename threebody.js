var camera, scene, renderer, labelRenderer;

var clock = new THREE.Clock();
var textureLoader = new THREE.TextureLoader();

const EARTH_RADIUS = 1;
const MOON_RADIUS = 0.27;
const SUN_RADIUS = 5;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(10, 5, 20);

    var controls = new THREE.OrbitControls(camera);

    scene = new THREE.Scene();

    var dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 0, 1);
    scene.add(dirLight);

    var axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    var earthGeometry = new THREE.SphereBufferGeometry(EARTH_RADIUS, 16, 16);
    var earthMaterial = new THREE.MeshPhongMaterial({
    specular: 0x333333,
    shininess: 5,
    map: textureLoader.load( 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Earthmap100x500.jpg' ),
    normalScale: new THREE.Vector2( 0.85, 0.85 )
    });

    earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth)


    var sunGeometry = new THREE.SphereBufferGeometry(SUN_RADIUS, 16, 16);
    var sunMaterial = new THREE.MeshPhongMaterial({
        specular: 0xFFFFAA,
        shininess: 10,
        map: textureLoader.load( 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Solarsystemscope_texture_2k_sun.jpg' ),
        normalScale: new THREE.Vector2( 0.85, 0.85 )
    });
    sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    var moonGeometry = new THREE.SphereBufferGeometry(MOON_RADIUS, 16, 16);
    var moonMaterial = new THREE.MeshPhongMaterial({
        shininess: 5,
        map: textureLoader.load('https://upload.wikimedia.org/wikipedia/commons/7/74/Moon_texture.jpg')
    });
    moon = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moon);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio);
    renderer.setSize( window.innerWidth, window.innerHeight);
    canvasWrapper = document.querySelector(".canvas-wrapper")
    canvasWrapper.appendChild( renderer.domElement);

    labelRenderer = new THREE.CSS2DRenderer();
    labelRenderer.setSize( window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = 0;
    canvasWrapper.appendChild(labelRenderer.domElement);
   
}

function animate(){
    requestAnimationFrame(animate);

    var elapsed = clock.getElapsedTime();

    // Fake orbit calculation
    moon.position.set( Math.sin(elapsed) * 2 + Math.sin(elapsed/365) * 10, 0, Math.cos( elapsed ) * 2 + Math.cos(elapsed/365) * 10);
    earth.position.set(Math.sin(elapsed/365) * 10, 0, Math.cos(elapsed/365)*10)

    renderer.render(scene, camera);

}