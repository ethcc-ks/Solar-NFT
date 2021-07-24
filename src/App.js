import React, {Component, useLayoutEffect} from "react";
import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
import OrbitControls from "three-orbitcontrols";
class ThreeScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      planets: []
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.getXYPosition = this.getXYPosition.bind(this);
    this.getRandomLogInt = this.getRandomLogInt.bind(this);
    this.pointer = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  componentDidMount() {

    const width = this.state.width;
    const height = this.state.height;
    this.scene = new THREE.Scene();
    //Add Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#263238");
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    //add Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 8;
    this.camera.position.y = 5;
    //Camera Controls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    //LIGHTS
    var lights = [];
    lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);
    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);

    //ADD Your 3D Models here
    const cubeGeometry = new THREE.SphereGeometry(3);
    const material = new THREE.MeshBasicMaterial({
      color: '#6ab056',
      wireframe: true
    });
    this.cubeMesh = new THREE.Mesh(cubeGeometry, material);

    this.cubeMesh.position.x = 36;
    this.cubeMesh.position.y = 0;
    this.scene.add(this.cubeMesh);


    for ( let i = 2; i < 6; i++) {
      const curve = new THREE.EllipseCurve(
          0,  0,            // ax, aY
          100*Math.log(i), 100*Math.log(i),           // xRadius, yRadius
          0,  2 * Math.PI,  // aStartAngle, aEndAngle
          false,            // aClockwise
          0                 // aRotation
      );

      const points = curve.getPoints( 128 );
      const geometry3 = new THREE.BufferGeometry().setFromPoints( points );
      geometry3.rotateX(-Math.PI / 2);
      const material3 = new THREE.LineBasicMaterial( { color : 0xCC0000 } );
      const ellipse = new THREE.Line( geometry3, material3 );
      this.scene.add(ellipse);
    }
    for ( let i = 0; i < 100; i ++ ) {
      let radius = this.getRandomLogInt(2, 5);
      this.createSphere(radius)
    }
    this.renderScene();
    //start animation
    this.start();

    window.addEventListener('resize', this.updateDimensions);
  }

  createSphere(radius) {
      const cubeGeometry = new THREE.SphereGeometry(3);
      const material = new THREE.MeshBasicMaterial({
          color: '#6ab056',
          wireframe: true
      });
      let cubeMesh = new THREE.Mesh(cubeGeometry, material);

      let planet = {
        radius: radius,
        angle:  Math.random() * 360
      }
      this.addPlanet(planet);

      const posXY = this.getXYPosition(planet);
      cubeMesh.position.x = posXY.positionX;
      cubeMesh.position.z = posXY.positionZ;
      cubeMesh.position.y = 0

      cubeMesh.rotation.x = Math.random() * 2 * Math.PI;
      cubeMesh.rotation.y = Math.random() * 2 * Math.PI;
      cubeMesh.rotation.z = Math.random() * 2 * Math.PI;
      
      const scale = Math.random() + 0.5;
      cubeMesh.scale.x = scale;
      cubeMesh.scale.y = scale;
      cubeMesh.scale.z = scale;

      // this.scene.domElement.addEventListener("click", event => {
      //   this.raycaster.setFromCamera( this.pointer, this.camera );
      //   const intersects = this.raycaster.intersectObjects( this.scene.children );
      //   if ( intersects.length > 0 ) {
      //     console.log('hello')
      //   }
      // });

      this.scene.add(cubeMesh);
  }

  addPlanet = (planet) => {
    const planets = this.state.planets.slice();
    planets.push(planet);
    this.setState({planets: planet}, () => {
      // console.log(this.state.planets);
    });
  }

  getXYPosition = (planet) => {
    return {
      positionX: planet.radius*Math.cos(planet.angle),
      positionZ: planet.radius*Math.sin(planet.angle)
    }
  }

  getRandomLogInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return 100*Math.log(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);}
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
//Animate Models Here
//ReDraw Scene with Camera and Scene Object
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };
  renderScene = () => {
    if (this.renderer) this.renderer.render(this.scene, this.camera);

  };
  render() {
    return (<div
        ref={mount => { this.mount = mount}}
    />)
  }}
export default ThreeScene;
