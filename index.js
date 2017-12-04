const t = THREE;
const V3 = t.Vector3;

const scene = new t.Scene();
scene.fog = new t.Fog(0xcb5d5f, 0.1, 6000);
const camera = new t.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

const renderer = new t.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new t.SphereGeometry(4, 16, 16);
const material = new t.MeshBasicMaterial({ color: 0xffffff });
const sphere = new t.Mesh(geometry, material);
//camera.position.z = 1500;
camera.position.y = 350;
//camera.position.x = 500;
camera.rotation.x = -0.15;
camera.rotation.y = 0.2;

const sideLength = 60;
const distanceBetween = 75;

let s;

function getValueMapper(inputS, inputE, outputS, outputE) {
  return val =>
    outputS + (outputE - outputS) * (val - inputS) / (inputE - inputS);
}

let end = sideLength * distanceBetween / 2;
let start = -end;

const spheres = [];
let row;

for (let i = start; i < end; i += distanceBetween) {
  row = [];
  for (let j = start; j < end; j += distanceBetween) {
    s = sphere.clone();
    scene.add(s);
    s.position.set(i, 0, j);
    row.push(s);
  }
  spheres.push(row);
}

let time = 0;

iSinMapper = getValueMapper(0, sideLength, 0, 3 * Math.PI * 2);
jSinMapper = getValueMapper(0, sideLength, 0, 2 * Math.PI * 2);

const center = new V3(0, 0, 0);

function animate() {
  time++;

  camera.position.x = end * Math.cos(0.0015 * time);
  camera.position.z = end * Math.sin(0.0015 * time);
  camera.lookAt(center);

  for (let i = 0; i < spheres.length; i++) {
    for (let j = 0; j < spheres[i].length; j++) {
      spheres[i][j].position.setComponent(
        1,
        (Math.cos(iSinMapper((time / 20) % (sideLength * 2) + i)) +
          Math.sin(jSinMapper((time / 10) % (sideLength * 2) + j))) *
          50
      );
    }
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
