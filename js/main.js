// Creatng a scene like we do in Unity.

const scene = new THREE.Scene();

// setting a camera there are lots of camera in this varity but we are aiming to the 
// basic one for this project.

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// rendering

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.setClearColor( 0xb7c3f3 , 1);


// Light 
const light = new THREE.AmbientLight( 0xffffff );
scene.add( light );

// Global Variable
const start_position = 3 
const end_position = -start_position 




// Animate the cube
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

 function createCube(size,positionX , rotY = 0, color = 0xffffff){
     const geometry = new THREE.BoxGeometry(size.w,size.h,size.d);
    const material = new THREE.MeshBasicMaterial( { color } );
    const cube = new THREE.Mesh( geometry, material );

    cube.position.x = positionX;
    cube.rotation.y = rotY;
    scene.add( cube );
    return cube;

 }

camera.position.z = 5;


// loading the 3D model

const loader = new THREE.GLTFLoader();




class Doll{
    constructor(){
        loader.load('../models/scene.gltf',(gltf) => {
            scene.add( gltf.scene );
            gltf.scene.scale.set(.4,.4,.4);
            gltf.scene.position.set(0,-1,0);
            this.doll = gltf.scene;
        
        })

    }

    lookbackWards(){
        // this.doll.rotation.y = -3.15;
        gsap.to(this.doll.rotation,{y: -3.15 , duration: 1})
    }

    lookforWard(){
        // this.doll.rotation.y = 0;
        gsap.to(this.doll.rotation,{y: 0 , duration: 1})

    } 
    

}

function createTrack(){
    createCube({w:.2,h:1.5,d:1}, start_position, -.35)
    createCube({w:.2,h:1.5,d:1}, end_position,.35);
    createCube({w: start_position*2 + .21 ,h:1.5,d:1}, 0,0,0x000).position.z = -1 ;
}
createTrack()

// doll on screen
let doll = new Doll()
// the doll model take time to load thats why we have // taken time 
setTimeout(() => {
    doll.lookbackWards()
    
        },1000);
    


function animate() {
	

	renderer.render( scene, camera );



    requestAnimationFrame( animate );
}
animate();

window.addEventListener( 'resize', onWindowResize, false )
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth, window.innerHeight )
}