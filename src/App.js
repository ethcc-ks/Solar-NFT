import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import getWeb3 from "./getWeb3";
import NFTPlanet from "./contracts/NFTplanet.json";
import { Nav, Navbar } from "react-bootstrap";
import Routes from "./Routes";
import BlockchainContext from "./context/BlockchainContext";

class App extends Component {
  constructor() {
    super();

    this.state = {
      accounts: null,
      contract: null,
      balance:0,
    };
  }

  async componentDidMount() {
    const web3 = getWeb3();
    const accounts = await web3.eth.getAccounts();
    const balance = web3.utils.fromWei(await web3.eth.getBalance(accounts[0]));
    this.setState({
      accounts,
      balance,
    });
  }

  render() {
    try {
      let web3;
      let instance;
      let accountsPromise;
      // web3 instance.
      console.log("RENDING");
      web3 = getWeb3();

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
                <Navbar
                  bg='light'
                  variant='light'
                  styled
                  style={{ position: "absolute", top: 0, width: "100vw" , display:"flex"}}
                >
                  <Navbar.Brand href='#home'>NFT PlanEth</Navbar.Brand>

                  <Nav.Link href='#home'>
                      {" "}
                      Signed in as: {this.state.accounts[0]}
                    </Nav.Link>

                  <Nav className='mr-auto'>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/play">Play</Nav.Link>
                    <Nav.Link href="/users">Users</Nav.Link>
                    <Nav.Link href="/campaign">Campaign</Nav.Link>


                  </Nav>

                  <Navbar.Collapse className='justify-content-end'>
                    <Navbar.Text>Balance: {this.state.balance} ETH</Navbar.Text>
                  </Navbar.Collapse>
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
      return <div>Loading Web3, accounts, and contract...</div>;
    }
  }
}
export default App;
