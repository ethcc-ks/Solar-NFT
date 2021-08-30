import React, { Component } from "react";
import { BrowserRouter as Router, } from "react-router-dom";

import getWeb3 from "./getWeb3";
import NFTPlanet from "./contracts/NFTplanet.json";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import Routes from "./Routes";
import BlockchainContext from "./context/BlockchainContext";
import Home from "./Pages/Landing";

class App extends Component {
  constructor() {
    super();

    this.state = {
      accounts: null,
      contract: null,
      balance:0,
    };
  }
  async componentDidMount () {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = getWeb3();
        const balance = web3.utils.fromWei(await web3.eth.getBalance(accounts[0]));
        this.setState({ accounts, balance })
      } catch (error) {
        if (error.code === 4001) {
          // User rejected request
        }
    
        console.log(error)
      }
    }
  }
  async getAccounts () {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = getWeb3();
        const balance = web3.utils.fromWei(await web3.eth.getBalance(accounts[0]));
        this.setState({ accounts, balance })
      } catch (error) {
        if (error.code === 4001) {
          // User rejected request
        }
    
        console.log(error)
      }
    }
  }

  render() {
    try {
      let web3;
      let instance;
      let accountsPromise;
      // web3 instance.
      console.log("RENDING");
      web3 = getWeb3();
      console.log(this.state.accounts);

      // Use web3 to get the user's accounts.
      accountsPromise = web3.eth.getAccounts();

      instance = new web3.eth.Contract(
        NFTPlanet.abi,
        "0xe25B6837f3647BB7EBCD4477cf931E8d3c0AC417"
      );
      if (this.state.accounts !== null) {
        return (
          <div className='App'>
            <Router>
              <BlockchainContext.Provider
                value={{ instance, accountsPromise, web3 }}
              >
                <Navbar variant="dark" expand="lg" style={{borderBottom: '1px solid', borderImage: 'linear-gradient(to right, rgba(30, 150, 250, 0.5), rgba(200, 30, 200, 0.5))', borderImageSlice: '5', backgroundColor: 'black'}}>
                        <Container fluid>
                            <Navbar.Brand href="/">
                                <img src='logo192.png' style={{width: 50, height: 'auto'}} alt=''/>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                              <Nav.Link>
                                {" "}
                                Signed in as: {this.state.accounts[0]}
                              </Nav.Link>
                              <Nav className='mr-auto'>
                                <Nav.Link href="/play">Play</Nav.Link>
                                <Nav.Link href="/users">Users</Nav.Link>
                                <Nav.Link href="/campaign">Campaign</Nav.Link>
                              </Nav>
                              <Navbar.Text>Balance: {this.state.balance} ETH</Navbar.Text>
                            </Navbar.Collapse>
                        </Container>
                </Navbar>
                <Routes />
              </BlockchainContext.Provider>
            </Router>
          </div>
        );
      } else {
        throw new Error();
      }
    } catch (error) {
      return (
        <div className='App'>
          <Router>
              <Navbar variant="dark" expand="lg" style={{borderBottom: '1px solid', borderImage: 'linear-gradient(to right, rgba(30, 150, 250, 0.5), rgba(200, 30, 200, 0.5))', borderImageSlice: '5', backgroundColor: 'black'}}>
                      <Container fluid>
                          <Navbar.Brand href="/">
                              <img src='logo192.png' style={{width: 50, height: 'auto'}} alt=''/>
                          </Navbar.Brand>
                          <Navbar.Toggle aria-controls="basic-navbar-nav" />
                          <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className='ml-auto'>
                              <Button className='border-0 coloredreverse' onClick={() => { this.getAccounts()}}>Connect To MetaMask</Button>
                            </Nav>
                          </Navbar.Collapse>
                      </Container>
                      </Navbar>
              <Home/>
          </Router>
        </div>
      );
    }
  }
}
export default App;
