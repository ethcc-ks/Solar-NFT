import React, { Component, useLayoutEffect } from "react";
import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
import OrbitControls from "three-orbitcontrols";
import { Nav, Navbar } from "react-bootstrap";
import LendingPopup from "../Component/LendingPopup"
import NFTLoader from "../Component/NFTLoader"
import axios from 'axios';
import querystring from 'querystring';
import dotenv from 'dotenv';
import { NFTStorage, File } from 'nft.storage'
import NFTPlanet from '../contracts/NFTplanet.json'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import BlockchainContext from "../context/BlockchainContext";
import { Mesh, ObjectSpaceNormalMap } from "three";


class ThreeScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      planets: [],
      raycaster: new THREE.Raycaster(),
      intersected: null,
      isSelected: false,
      balance: 0,
      accounts: null,
      showPopup: false,
      showNFTLoader: true,
      contract: null,
      clickPlanetID: 0,
    };

    this.planetArray = [];
    this.planetDictionary = {};
    this.GraphURL = "https://api.studio.thegraph.com/query/3145/ks/v0.0.15";
    this.mouse = new THREE.Vector2();
    this.intersected = null;

    this.updateDimensions = this.updateDimensions.bind(this);
    this.getXYPosition = this.getXYPosition.bind(this);
    this.getRandomLogInt = this.getRandomLogInt.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseClick = this.onMouseClick.bind(this);
    this.start = this.start.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.closeLoader = this.closeLoader.bind(this);
    this.createNFTPlanet = this.createNFTPlanet.bind(this);
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  closePopup = () => {
    this.setState({
      showPopup: false
    });
  }

  closeLoader = () => {
    this.setState({
      showNFTLoader: false
    });
  }

  async componentDidMount() {

    this.setState({ contract: this.context.instance });
    this.setState({ accounts: await this.context.accountsPromise }); 

    const width = this.state.width;
    const height = this.state.height;
    this.scene = new THREE.Scene();
    this.setState({ mouse: new THREE.Vector2() });
    //Add Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#263238");
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    //add Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 98;
    this.camera.position.y = 62;
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


    const loader = new THREE.FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', function (font) {

      const geometryText = new THREE.TextGeometry('Hello three.js!', {
        font: font,
        size: 8000,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
      });
      const materialText = new THREE.MeshBasicMaterial({
        color: '#6ab056'
      });
      let textMesh = new THREE.Mesh(geometryText, materialText);
      textMesh.position.y = 0;
      textMesh.position.x = 0;
      textMesh.position.z = 10;
      this.scene.add(textMesh);

    });

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
    
    const graphResult = await this.queryPlanetsFromGraph();
    graphResult.data.transfers.map((transfer)=>{
      const radius = this.getRandomLogInt(2,5);
      this.createSphere(radius, transfer.id);
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
    console.log(radius)
    console.log(planetID)
    const cubeGeometry = new THREE.SphereBufferGeometry(3, 16, 16);
    const material = new THREE.MeshBasicMaterial({
      color: "#"+ Math.floor(Math.random()*16777215).toString(16),
      wireframe: true
    });
    let cubeMesh = new THREE.Mesh(cubeGeometry, material);

    let planet = {
      radius: radius,
      angle: Math.random() * 360,
      id: planetID,
    }

    const posXY = this.getXYPosition(planet);
    cubeMesh.position.x = posXY.positionX;
    cubeMesh.position.z = posXY.positionZ;
    cubeMesh.position.y = 0;
    planet.mesh = cubeMesh;
    this.planetDictionary[planet.mesh.uuid] = planetID
    this.addPlanet(planet);

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
    this.planetArray.push(planet);
    this.setState({ planets: planet }, () => {
      console.log(this.state.planets);
    });
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

  createNFTPlanet = async (NFTName, NFTDescription, NFTFile) => {

    dotenv.config();
    //const apiKey = process.env.API_NFT_STORAGE_KEY;
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIwODZiMDI0NjZEQTQwQjBFNDEyOGM0NTdCMDFDYzZDMzhhYUZhZEIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyNzE1NzExMjE5MCwibmFtZSI6IlBsYW5ldE5GVCJ9.wVX9L6uGGTRxxGg7jneXUYgd0Q8lveKFXnWCUo0tvkc";
    const client = new NFTStorage({ token: apiKey })

    const metadata = await client.store({
      name: NFTName,
      description: NFTDescription,
      image: NFTFile
    });
    console.log(metadata.url);

    const mintedPlanet = await this.state.contract.methods.mintPlanet(metadata.url, NFTName)
      .send({ from: this.state.accounts[0], value: 0.002 * 10 ** 18 })
      .then(res => {
        console.log(res.events.Transfer.returnValues.tokenId)
        const IDPlanet = res.events.Transfer.returnValues.tokenId;
        console.log('Success', res);
        alert('You have successfully created a new NFT! ID : ' + IDPlanet)

        let radius = this.getRandomLogInt(5, 5);
        this.createSphere(radius, IDPlanet);

        return IDPlanet;
      })
      .catch(err => console.log(err));

    console.log(mintedPlanet)
  }

  async fetchNFT(contractAddress, tokenID) {
    const req = await axios.get(`https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenID}`)
      .then(function (response) {
        return response
      })
    return { contract: req.data.asset_contract.address, image: req.data.asset_contract.image_url, name: req.data.name, owner: req.data.owner.address, tokenID: req.data.token_id };
  }

  onMouseMove(event) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    let mouse = this.mouse;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    if (this.state.intersected !== null)
      this.state.intersected.material.color.set(0x6ab056);
    this.setState({ mouse: mouse, intersected: null });

  }

  onMouseClick(event) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    let mouse = this.mouse;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    this.setState({ mouse: mouse })
    // console.log(this.state.intersected.type)
    if (this.state.intersected !== null) {
      if (this.state.intersected.type.toString() === 'Mesh') {
        console.log(this.state.intersected.uuid)
        console.log(this.planetDictionary[this.state.intersected.uuid])
        this.setState({clickPlanetID: this.planetDictionary[this.state.intersected.uuid]}, () =>  {
          console.log(this.state.clickPlanetID)
        })
        this.setState({ isSelected: true }, () => {
          console.log(this.state.isSelected);
          this.setState({ showPopup: true })
          console.log(`is showpopup : ${this.state.showPopup}`);
        });
      }
    } else {
      this.setState({ isSelected: false }, () => {
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
    for (let i = 0; i < this.planetArray.length; i++) {

      this.planetArray[i].angle = (this.planetArray[i].angle > 360) ? 0 : this.planetArray[i].angle + this.planetArray[i].radius / 100000;
      this.planetArray[i].mesh.position.x = this.getXYPosition(this.planetArray[i]).positionX;
      this.planetArray[i].mesh.position.z = this.getXYPosition(this.planetArray[i]).positionZ;
    }

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);

  };

  queryPlanetsFromGraph = () => {
    const planetRequest = `
            query {
              transfers {
                id
              }
            }
          `
    const client = new ApolloClient({
      uri: this.GraphURL,
      cache: new InMemoryCache()
    });

    const result = client.query({
      query: gql(planetRequest)
    })
      .then(data => {
        console.log("Subgraph data: ", data)
        return data;
      })
      .catch(err => { console.log("Error fetching data: ", err) });
    return result;
  }
  queryNftsFromGraph = () => {
    const nftRequest = `
          query {
            nftinplanets {
              planetid
              owner
              nftaddress
              nftid
            }
          }
          `
    const client = new ApolloClient({
      uri: this.GraphURL,
      cache: new InMemoryCache()
    });

    let receivedData;
    client.query({
      query: gql(nftRequest)
    })
      .then(data => {
        console.log("Subgraph data: ", data)
        receivedData = data;
      })
      .catch(err => { console.log("Error fetching data: ", err) });
    return receivedData;
  }

  renderScene = () => {
    // update the picking ray with the camera and mouse position
    this.state.raycaster.setFromCamera(this.mouse, this.camera);

    // calculate objects intersecting the picking ray
    const intersects = this.state.raycaster.intersectObjects(this.scene.children);

    if (intersects.length > 0) {

      intersects[0].object.material.color.set(0xff0000);
      this.setState({ intersected: intersects[0].object });
    }
    /* if ( intersects.length > 0) {
 
       intersects[0].object.material.color.set(0xff0000);
       this.intersected = intersects[0].object;
     } else {
       if (this.intersected !== null) {
         this.intersected.material.color.set(0x6ab056);
       }
       this.intersected = null;
     }*/

    if (this.renderer) this.renderer.render(this.scene, this.camera);

  };
  render() {
    return (
      <div className="App">
        <div ref={mount => {
          this.mount = mount
        }}
        />
        {this.state.showPopup ?
          <LendingPopup
            handleLend={this.handleLend}
            closePopup={this.closePopup}
            planetID={this.state.clickPlanetID}
          />
          : null
        }
        {this.state.showNFTLoader ?
          <NFTLoader
            createNFTPlanet={this.createNFTPlanet}
            closeLoader={this.closeLoader}
          />
          : null
        }
      </div>
    )
  }
}
ThreeScene.contextType = BlockchainContext;

export default ThreeScene;
