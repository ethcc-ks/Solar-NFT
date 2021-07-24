import React, {Component, useLayoutEffect} from "react";
import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
import OrbitControls from "three-orbitcontrols";
import {Nav, Navbar} from "react-bootstrap";
import getWeb3 from "./getWeb3";
import LendingPopup from "./Component/LendingPopup"

class ThreeScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight-56,
      planets: [],
      raycaster: new THREE.Raycaster(),
      intersected: null,
      isSelected: false,
      balance: null,
      accounts: null,
      web3: null,
      showPopup: false
    };

    this.mouse = new THREE.Vector2();

    this.updateDimensions = this.updateDimensions.bind(this);
    this.getXYPosition = this.getXYPosition.bind(this);
    this.getRandomLogInt = this.getRandomLogInt.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseClick = this.onMouseClick.bind(this);
    this.start = this.start.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  closePopup=()=> {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  async componentDidMount() {

    try {
      // Get network provider and web3 instance.
      console.log("RENDING");
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
   /*   console.log(DynamicCollateralLending.networks);
      const deployedNetwork = DynamicCollateralLending.networks[networkId];
      console.log("deployedNetwork",deployedNetwork);

      const instance = new web3.eth.Contract(
          DynamicCollateralLending.abi,
          deployedNetwork && deployedNetwork.address,
      );

      this.state.contract = instance;*/

      this.state.balance = await web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'ether');

      //console.log(instance);
      this.setState({ web3, accounts });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }


    const width = this.state.width;
    const height = this.state.height;
    this.scene = new THREE.Scene();
    this.setState({mouse: new THREE.Vector2()});
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
    window.addEventListener( 'mousemove', this.onMouseMove, false );

    window.addEventListener( 'click', this.onMouseClick, false );
    this.setState({showPopup : true})

  }

  createSphere(radius) {
      const cubeGeometry = new THREE.SphereGeometry(3, 16, 16);
      const material = new THREE.MeshBasicMaterial({
          color: '#6ab056',
          wireframe: true
      });
      let cubeMesh = new THREE.Mesh(cubeGeometry, material);

      let planet = {
        radius: radius,
        angle:  Math.random() * 360,
      }

      const posXY = this.getXYPosition(planet);
      cubeMesh.position.x = posXY.positionX;
      cubeMesh.position.z = posXY.positionZ;
      cubeMesh.position.y = 0;
      planet.mesh = cubeMesh;
      //this.addPlanet(planet);

      cubeMesh.rotation.x = Math.random() * 2 * Math.PI;
      cubeMesh.rotation.y = Math.random() * 2 * Math.PI;
      cubeMesh.rotation.z = Math.random() * 2 * Math.PI;
      
      const scale = Math.random() + 0.5;
      cubeMesh.scale.x = scale;
      cubeMesh.scale.y = scale;
      cubeMesh.scale.z = scale;

    cubeMesh.rotation.x = Math.random() * 2 * Math.PI;
    cubeMesh.rotation.y = Math.random() * 2 * Math.PI;
    cubeMesh.rotation.z = Math.random() * 2 * Math.PI;

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


  onMouseMove( event ) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    let mouse = this.mouse;
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    this.setState({mouse: mouse})
  }

  onMouseClick( event ) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    this.setState({showpopup: true});

    let mouse = this.mouse;
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    this.setState({mouse: mouse})

    if (this.state.intersected !== null) {
      this.setState({isSelected: true}, () => {
        console.log(this.state.isSelected);
      });
    } else {
      this.setState({isSelected: false}, () => {
        console.log(this.state.isSelected);
      });
    }

  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
    console.log('planets ' + this.state.planets);
  //Animate Models Here
  //ReDraw Scene with Camera and Scene Object
    /*for (let planet of Object.keys(this.state.planets)) {
      let currentPlanet = this.state.planets[planet];

      //console.log(planet);
      /!*currentPlanet.radial.angle++;
      currentPlanet.position.x = this.getXYPosition(currentPlanet.radial).positionX;
      currentPlanet.position.z = this.getXYPosition(currentPlanet.radial).positionZ;*!/
    }

    Object.entries(this.state.planets).forEach(
        ([key, value]) => {
          if (key==='radial')
            console.log(key, value)
        }
    );*/

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);

  };

  renderScene = () => {
      // update the picking ray with the camera and mouse position
    this.state.raycaster.setFromCamera( this.mouse, this.camera );

    // calculate objects intersecting the picking ray
    const intersects = this.state.raycaster.intersectObjects( this.scene.children );

    if ( intersects.length === 1) {

      intersects[0].object.material.color.set(0xff0000);
      this.setState({intersected: intersects[0].object});
    } else {
      if (this.state.intersected !== null) {
        this.state.intersected.material.color.set(0x6ab056);
      }
      this.setState({intersected: null});
    }

    if (this.renderer) this.renderer.render(this.scene, this.camera);

  };
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    else {
      return (
          <div className="App">
            <Navbar bg="light" variant="light" styled>
              <Navbar.Brand href="#home">NFT PlanEth</Navbar.Brand>

              <Nav className="mr-auto">
                <Nav.Link href="#home"> Signed in as: {this.state.accounts[0]}</Nav.Link>
              </Nav>

              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Balance: {this.state.balance} ETH
                </Navbar.Text>
              </Navbar.Collapse>
            </Navbar>
            <div ref={mount => {
              this.mount = mount
            }}
            />
            {this.state.showPopup ?
                <LendingPopup
                    handleLend={this.handleLend}
                    closePopup={this.closePopup}
                />
                : null
            }
          </div>
      )
    }
  }}
export default ThreeScene;
