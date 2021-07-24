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
    };
    this.updateDimensions = this.updateDimensions.bind(this);

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

    var geometry2 = new THREE.CircleGeometry(36, 128);
    geometry2.rotateX(-Math.PI / 2);
    var material2 = new THREE.LineBasicMaterial( { color: 0xCC0000 } );
    var mesh2 = new THREE.Line( geometry2, material2 );

    for ( let i = 0; i < 2000; i ++ ) {
      this.createSphere()
    }
    this.renderScene();
    //start animation
    this.start();

    window.addEventListener('resize', this.updateDimensions);

  }

  createSphere() {
    const cubeGeometry = new THREE.SphereGeometry(3);
    const material = new THREE.MeshBasicMaterial({
      color: '#6ab056',
      wireframe: true
    });
    let cubeMesh = new THREE.Mesh(cubeGeometry, material);

    cubeMesh.position.x = Math.random() * 800 - 400;
		cubeMesh.position.y = Math.random() * 800 - 400;
		cubeMesh.position.z = Math.random() * 800 - 400;

		cubeMesh.rotation.x = Math.random() * 2 * Math.PI;
		cubeMesh.rotation.y = Math.random() * 2 * Math.PI;
		cubeMesh.rotation.z = Math.random() * 2 * Math.PI;

		cubeMesh.scale.x = Math.random() + 0.5;
		cubeMesh.scale.y = Math.random() + 0.5;
		cubeMesh.scale.z = Math.random() + 0.5;

    this.scene.add(cubeMesh);
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

    // let INTERSECTED;
    
    // // Raycaster
    // let raycaster = new THREE.Raycaster();

    // const pointer = new THREE.Vector2();
    

    // raycaster.setFromCamera( pointer, this.camera );

		// 		const intersects = raycaster.intersectObjects( this.scene.children );

		// 		if ( intersects.length > 0 ) {

		// 			if ( INTERSECTED != intersects[ 0 ].object ) {

		// 				if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

    //         console.log('click');
		// 				INTERSECTED = intersects[ 0 ].object;
		// 				// INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
		// 				// INTERSECTED.material.emissive.setHex( 0xff0000 );

		// 			}

		// 		} else {

		// 			if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

		// 			INTERSECTED = null;

		// 		}
  };

  render() {
    return (<div
        ref={mount => { this.mount = mount}}
    />)
  }}
export default ThreeScene;
