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




// Animate the cube
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );0

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
        this.doll.rotation.y = 0;
    } 

}

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