import React, { Component } from "react";
import * as THREE from "three";
import BlockchainContext from "../context/BlockchainContext";
import { Button, Col, Container, Row } from "react-bootstrap";
import Service from "../Component/service";



class Home extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        width: window.innerWidth/2,
        height: window.innerHeight/2,
        planets: [],
        service: new Service(),
      };
  
      this.planetArray = [];
      this.planetDictionary = {};
      this.GraphURL = "https://api.studio.thegraph.com/query/5410/planeth/v0.0.12";
      this.mouse = new THREE.Vector2();
      this.intersected = null;
  
      this.updateDimensions = this.updateDimensions.bind(this);
      this.getXYPosition = this.getXYPosition.bind(this);
      this.getRandomLogInt = this.getRandomLogInt.bind(this);
      this.start = this.start.bind(this);
    
    }
  
    updateDimensions = () => {
      this.setState({ width: window.innerWidth/2, height: window.innerHeight/2 });
    };

  
    async componentDidMount() {
  
      const width = this.state.width;
      const height = this.state.height;
      this.scene = new THREE.Scene();
      this.setState({ mouse: new THREE.Vector2() });
      //Add Renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setClearColor("#000000");
      this.renderer.setSize(width, height);
      this.mount.appendChild(this.renderer.domElement);
      //add Camera
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      this.camera.position.z = 228;
      this.camera.position.y = 102;
      this.camera.rotation.x = -0.2;
      this.camera.lookAt(this.scene.position);

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
  
      for (let i = 2; i < 6; i++) {
        const curve = new THREE.EllipseCurve(
          0, 0,            // ax, aY
          100 * Math.log(i), 100 * Math.log(i),           // xRadius, yRadius
          0, 2 * Math.PI,  // aStartAngle, aEndAngle
          false,            // aClockwise
          0                 // aRotation
        );
  
        const points = curve.getPoints(128);
        const geometry3 = new THREE.BufferGeometry().setFromPoints(points);
        geometry3.rotateX(-Math.PI / 2);
        const material3 = new THREE.LineBasicMaterial({ color: 0xCC0000 });
        const ellipse = new THREE.Line(geometry3, material3);
        this.scene.add(ellipse);
      }
      
      const graphResult = await this.state.service.queryPlanetsFromGraph();
      graphResult.data.planets.map((planet)=> {
        const radius = this.state.service.getRandomLogInt(2,5);
        this.createSphere(radius, planet.id, planet.tokenURI);
      });
      this.renderScene();
      //start animation
      this.start();
  
      window.addEventListener('resize', this.updateDimensions);
      window.addEventListener('mousemove', this.onMouseMove, false);
  
      window.addEventListener('click', this.onMouseClick, false);
      this.setState({ showPopup: true })
  
    }
  
    createSphere(radius, planetID) {

      let planet = {
        radius: radius,
        angle: Math.random() * 360,
        id: planetID,
        color: "#"+ Math.floor(Math.random()*16777215).toString(16),
      }

      const cubeGeometry = new THREE.SphereBufferGeometry(3, 16, 16);
      const material = new THREE.MeshPhongMaterial({
        color: planet.color
      });
      let cubeMesh = new THREE.Mesh(cubeGeometry, material);
  
      const posXY = this.getXYPosition(planet);
      cubeMesh.position.x = posXY.positionX;
      cubeMesh.position.z = posXY.positionZ;
      cubeMesh.position.y = 0;
      planet.mesh = cubeMesh;
      this.planetDictionary[planet.mesh.uuid] = planetID
      this.planetArray.push(planet);
  
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
  
    getXYPosition = (planet) => {
      return {
        positionX: planet.radius * Math.cos(planet.angle),
        positionZ: planet.radius * Math.sin(planet.angle)
      }
    }
  
    getRandomLogInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return 100 * Math.log(Math.floor(Math.random() * (max - min + 1)) + min);
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
      for (let i = 0; i < this.planetArray.length; i++) {
        this.planetArray[i].angle = (this.planetArray[i].angle > 360) ? 0 : this.planetArray[i].angle + this.planetArray[i].radius / 100000;
        this.planetArray[i].mesh.position.x = this.getXYPosition(this.planetArray[i]).positionX;
        this.planetArray[i].mesh.position.z = this.getXYPosition(this.planetArray[i]).positionZ;
      }


      this.renderScene();
      this.frameId = window.requestAnimationFrame(this.animate);
  
    };
  
    renderScene = () => {
  
      if (this.renderer) this.renderer.render(this.scene, this.camera);
  
    };
    render() {
      return (
        <div className="App">
          <Container style={{textAlign: "left", paddingTop: '5%'}} fluid>
            <Row className="justify-content-md-center align-items-center">
              <Col xs={{span: 12, order: 2}} md={{span: 3, order: 1}}>
                <div className="p-5" style={{borderStyle: "none", color: 'white'}}>
                  <h1>Planeth</h1>
                  <p>Promote your NFTs in the best way possible</p>
                  <Button className='border-0' href="/play">Get Started</Button>
                </div>
              </Col>
              <Col xs={{span: 12, order: 1}} md={{span: 6, order: 2}}>
                <div className="p-5">
                  <div ref={mount => {
                    this.mount = mount
                  }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )
    }
}
Home.contextType = BlockchainContext;
  
export default Home;
