let moveX=0, moveZ=0;
const joystick = document.getElementById('joystick');
joystick.addEventListener('touchmove', e => {
  const touch = e.touches[0];
  const rect = joystick.getBoundingClientRect();
  moveX = (touch.clientX - rect.left - rect.width/2)/50;
  moveZ = (touch.clientY - rect.top - rect.height/2)/50;
});

const fireBtn = document.getElementById('fireBtn');
fireBtn.addEventListener('touchstart', () => {
  console.log("FIRE!");
});
