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
const text = document.querySelector(".text")
const TIME_LIMIT=10
let gameStat = "loading"
let isLookingBackward = true

//musics

const bgMusic = new Audio('./music_bg.mp3')
bgMusic.loop = true
const winMusic = new Audio('./music/win.mp3')
const loseMusic = new Audio('./music/lose.mp3')

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

function delay(ms){
    return new Promise(resolve=> setTimeout(resolve, ms));
}


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
        setTimeout(()=>isLookingBackward = true ,150)

    }

    lookforWard(){
        // this.doll.rotation.y = 0;
        gsap.to(this.doll.rotation,{y: 0 , duration: 1})
        setTimeout(()=>isLookingBackward = false,450)

    } 
    
      async start(){
          this.lookbackWards()
          await delay((Math.random()*1000)+1800)
          this.lookforWard()
          await delay((Math.random()*750)+1000)
          this.start()
      }
        
    
    

}

function createTrack(){
    createCube({w:.2,h:1.5,d:1}, start_position, -.35)
    createCube({w:.2,h:1.5,d:1}, end_position,.35);
    createCube({w: start_position*2 + .21 ,h:1.5,d:1}, 0,0,0x000).position.z = -1 ;
}
createTrack()

class Player{
    constructor(){
            const geometry = new THREE.SphereGeometry( .3, 15, 211 );
            const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
            const sphere = new THREE.Mesh( geometry, material );
            sphere.position.z = 1
            sphere.position.x = start_position
            scene.add( sphere )
            this.player = sphere
            this.playerInfo = {
                positionX: start_position,
                velocity: 0.00,
            }
            
            
            
        }

    run(){

        this.playerInfo.velocity = .03

    }
    stop(){

        // this.playerInfo.velocity = 0
        gsap.to(this.playerInfo, { duration: .1, velocity: 0 })

    }
    check(){
            if(this.playerInfo.velocity > 0 && !isLookingBackward){
                console.log("You lost!")
                text.innerText="You Loss!"
                loseMusic.play()
                gameStat="over" 
            }
            if(this.playerInfo.positionX < end_position +.4 ){
                console.log("you won!")
                text.innerText="You win!"
                winMusic.play()
                gameStat="over"
            }
    }


    update(){
        this.check()
        this.playerInfo.positionX -= this.playerInfo.velocity
        this.player.position.x = this.playerInfo.positionX
        // this.playerInfo.position.x = this.playerInfo.positionX

    }
}


const player = new Player()
// doll on screen
let doll = new Doll()

async function init(){
    await delay(500)
    text.innerText ="starting In 3"
    await delay(500)
    text.innerText ="starting In 2"
    await delay(500)
    text.innerText ="starting In 1"
    await delay(500)
    text.innerText ="GOO!!"
    bgMusic.play()
    startGame()
}

function startGame(){
    doll.start()
    gameStat="started"
    let progressBar = createCube({w:5,h:-1,d:1},0)
    progressBar.position.y = 3.35
    // gsap.to(progressBar.scale,{})
    gsap.to(progressBar.scale, {duration: TIME_LIMIT, x: 0, ease: "none"})
    doll.start()
    setTimeout(() => {
        if(gameStat != "over"){
            text.innerText="KHATAM TATA BYE BYE"
            loseMusic.play()
            gameStat="over"
        }
    },TIME_LIMIT*1000);
}
init()
// the doll model take time to load thats why we have // taken time 
// setTimeout(() => {
//     doll.start()
    
//         },1000);






function animate() {
	if(gameStat == "over") return

	renderer.render( scene, camera );



    requestAnimationFrame( animate );
    player.update()
}
animate();

window.addEventListener( 'resize', onWindowResize, false )
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth, window.innerHeight )

}

window.addEventListener('keydown', (e)=>{
   if(gameStat != "started" ) return 
    if(e.key == "ArrowUp"){
        player.run()
    }
})
window.addEventListener('keyup', (e)=>{
    if(e.key == "ArrowUp"){
        player.stop()
    }
})