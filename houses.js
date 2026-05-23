var canvas = document.querySelector("#render-canvas");
var engine = new BABYLON.Engine(canvas);
var scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);

var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 10, -50), scene);
var light = new BABYLON.PointLight("light", new BABYLON.Vector3(10, 10, 0), scene);

camera.attachControl(canvas, true);

camera.keysUp.push(87);    // W
camera.keysDown.push(83);  // S
camera.keysLeft.push(65);  // A
camera.keysRight.push(68); // D


class HouseFactory {
    constructor(){
        this.baseMaterial = new BABYLON.StandardMaterial("baseMaterial", scene);
        this.roofMaterial = new BABYLON.StandardMaterial("roofMat");

        this.baseMaterial.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/floor.png")
        this.roofMaterial.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);
    }

    createHouse(pos){
        var base = new BABYLON.Mesh.CreateBox("box", 2, scene)
        base.material = this.baseMaterial
        base.position = new BABYLON.Vector3(0, 0, 0)

        var roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 3, height: 2.5, tessellation: 3});
        roof.scaling.x = 1;
        roof.rotation.z = Math.PI / 2;
        roof.position.y = 1.22;
        roof.material = this.roofMaterial

        var house = BABYLON.Mesh.MergeMeshes([base, roof], true, false, null, false, true);
        house.position = pos

        return house
    }
}

var factory = new HouseFactory();
var houses = []

var limit = [5, 5]
var spacing = [3, 4]
var height = 1

for (var i = 0; i<limit[0]; i++){
    for (var j = 0; j<limit[1]; j++){
        houses[i] = factory.createHouse(pos = new BABYLON.Vector3(i * spacing[0], height, j * spacing[1]))
    }
}

const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:1000, height:1000});

const groundMat = new BABYLON.StandardMaterial("groundMat");
groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
ground.material = groundMat; 


engine.runRenderLoop(()=>{
    scene.render();
})