let scene, camera, renderer;
let player, zombies = [];
let health = 100, ammo = 30;
let moveX=0, moveZ=0;
const zombieCount = 6;
let character = "ginger", map = "christmas";

// Initialize Game
function initGame() {
  document.getElementById("mainMenu").style.display = "none";
  document.getElementById("gameUI").style.display = "block";

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0,2,5);

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gameCanvas") });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Light
  const light = new THREE.DirectionalLight(0xffffff,1);
  light.position.set(5,10,7.5);
  scene.add(light);

  // Ground
  const groundGeo = new THREE.PlaneGeometry(50,50);
  const groundMat = new THREE.MeshStandardMaterial({ color: map==="christmas"?0x99ddff:0x77aa55 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI/2;
  scene.add(ground);

  // Player
  const playerGeo = new THREE.BoxGeometry(1,2,1);
  const playerMat = new THREE.MeshStandardMaterial({ color: 0xffaa00 });
  player = new THREE.Mesh(playerGeo, playerMat);
  player.position.y = 1;
  scene.add(player);

  // Zombies
  for(let i=0;i<zombieCount;i++){
    const zGeo = new THREE.BoxGeometry(1,2,1);
    const zMat = new THREE.MeshStandardMaterial({color:0x00ff00});
    const zombie = new THREE.Mesh(zGeo,zMat);
    zombie.position.set(Math.random()*20-10,1,Math.random()*20-10);
    zombies.push(zombie);
    scene.add(zombie);
  }

  animate();
}

// Mobile joystick
const joystick = document.getElementById('joystick');
joystick.addEventListener('touchmove', e=>{
  const touch = e.touches[0];
  const rect = joystick.getBoundingClientRect();
  moveX = (touch.clientX - rect.left - rect.width/2)/50;
  moveZ = (touch.clientY - rect.top - rect.height/2)/50;
});

// Fire button
const fireBtn = document.getElementById('fireBtn');
fireBtn.addEventListener('touchstart', shoot);

// Shooting
function shoot(){
  if(ammo>0){
    ammo--;
    document.getElementById("ammo").innerText = `Ammo: ${ammo}`;
    zombies.forEach(z=>{
      if(player.position.distanceTo(z.position)<5){
        scene.remove(z);
      }
    });
  }
}

// Player movement
function updatePlayer(){
  player.position.x += moveX*0.2;
  player.position.z += moveZ*0.2;
}

// Zombie AI
function updateZombies(){
  zombies.forEach(z=>{
    const dx = player.position.x - z.position.x;
    const dz = player.position.z - z.position.z;
    const dist = Math.sqrt(dx*dx+dz*dz);
    if(dist>0.5){
      z.position.x += dx/dist*0.05;
      z.position.z += dz/dist*0.05;
    } else {
      health -= 0.1;
      document.getElementById("health").innerText = `Health: ${Math.floor(health)}`;
    }
  });
}

// Animate loop
function animate(){
  requestAnimationFrame(animate);
  updatePlayer();
  updateZombies();
  renderer.render(scene,camera);
}

// Start button
document.getElementById("startBtn").addEventListener("click",()=>{
  character = document.getElementById("characterSelect").value;
  map = document.getElementById("mapSelect").value;
  initGame();
});
