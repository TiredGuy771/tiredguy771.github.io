import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Logo Scene
class LogoScene {
  constructor(canvas) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    this.renderer.setSize(canvas.width, canvas.height);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    this.scene.add(ambientLight, pointLight);
    
    // Create logo geometry
    this.group = new THREE.Group();
    
    const mainBox = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    
    const smallBox1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.MeshStandardMaterial({ color: 0xcccccc })
    );
    smallBox1.position.set(0.5, 0.5, 0.5);
    
    const smallBox2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x999999 })
    );
    smallBox2.position.set(-0.5, -0.5, -0.5);
    
    this.group.add(mainBox, smallBox1, smallBox2);
    this.scene.add(this.group);
    
    this.camera.position.z = 5;
  }
  
  animate() {
    this.group.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }
}

// Main Scene
class MainScene {
  constructor(canvas) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Controls
    this.controls = new OrbitControls(this.camera, canvas);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    this.scene.add(ambientLight, pointLight);
    
    // Grid
    const size = 30;
    const divisions = 30;
    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);
    
    // Create animated boxes
    this.boxes = this.createAnimatedBoxes();
    
    this.camera.position.set(30, 30, 30);
    this.controls.update();
  }
  
  createAnimatedBoxes() {
    const boxes = [];
    const positions = [
      [-9, 0.5, -9], [-3, 0.5, -3], [0, 0.5, 0],
      [3, 0.5, 3], [9, 0.5, 9], [-6, 0.5, 6],
      [6, 0.5, -6], [-12, 0.5, 0], [12, 0.5, 0],
      [0, 0.5, 12]
    ];
    
    positions.forEach(pos => {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9
      });
      const box = new THREE.Mesh(geometry, material);
      box.position.set(...pos);
      
      // Add wireframe
      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0x000000 })
      );
      box.add(line);
      
      this.scene.add(box);
      boxes.push({
        mesh: box,
        targetPosition: new THREE.Vector3(...pos),
        currentPosition: new THREE.Vector3(...pos)
      });
    });
    
    return boxes;
  }
  
  updateBoxPositions() {
    this.boxes.forEach(box => {
      if (Math.random() < 0.01) { // Change direction occasionally
        const directions = [
          [1, 0], [-1, 0], [0, 1], [0, -1]
        ];
        const [dx, dz] = directions[Math.floor(Math.random() * directions.length)];
        const newX = Math.max(-15, Math.min(15, box.currentPosition.x + dx * 3));
        const newZ = Math.max(-15, Math.min(15, box.currentPosition.z + dz * 3));
        box.targetPosition.set(newX, 0.5, newZ);
      }
      
      box.currentPosition.lerp(box.targetPosition, 0.1);
      box.mesh.position.copy(box.currentPosition);
    });
  }
  
  animate() {
    this.updateBoxPositions();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
  
  handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}

// Initialize scenes
const logoCanvas = document.getElementById('logo-canvas');
const sceneCanvas = document.getElementById('scene-canvas');

const logoScene = new LogoScene(logoCanvas);
const mainScene = new MainScene(sceneCanvas);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  logoScene.animate();
  mainScene.animate();
}

// Handle window resize
window.addEventListener('resize', () => {
  mainScene.handleResize();
});

// Start animation
animate();