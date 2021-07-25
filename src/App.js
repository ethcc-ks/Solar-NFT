import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import getWeb3 from "./getWeb3";
import NFTPlanet from "./contracts/NFTplanet.json";
import * as THREE from "three";
import {Nav, Navbar} from "react-bootstrap";
import Routes from "./Routes";
import BlockchainContext from "./context/BlockchainContext";

class App extends Component {

    constructor() {
        super();

        this.state = {
            balance: null,
            accounts: null,
            web3: false,
            contract: null
        };

    }

    async componentDidMount() {

    }

    render() {

        let web3;
        let instance;
        let accountsPromise;
        try {
            // Get network provider and web3 instance.
            console.log("RENDING");
            const web3 = getWeb3();

            // Use web3 to get the user's accounts.
            const accountsPromise = web3.eth.getAccounts();

            // Get the contract instance.
            /* const networkId = await web3.eth.net.getId();
             console.log(NFTPlanet.networks);
             const deployedNetwork = NFTPlanet.networks[networkId];
             console.log("deployedNetwork",deployedNetwork);*/

            const instance = new web3.eth.Contract(
                NFTPlanet.abi,
                "0xe27Ca6a5B8BF1350cE50D103853836a8d24a9f7E"
                /*
                          deployedNetwork && deployedNetwork.address,
                */
            );

            this.state.contract = instance;

/*
            this.state.balance = web3.utils.fromWei( web3.eth.getBalance(accounts[0]), 'ether');
*/

            //console.log(instance);
      /*      this.setState({web3});
            this.setState({web3, accounts});*/
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }

        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        } else {
            return (
                <div className="App">
                    <Router>

                    <Navbar bg="light" variant="light" styled style={{position: 'absolute', top: 0, width: '100vw'}}>
                        <Navbar.Brand href="#home">NFT PlanEth</Navbar.Brand>

                        <Nav className="mr-auto">
                            <Nav.Link href="#home"> Signed in as: {this.state.accounts[0]}</Nav.Link>
                        </Nav>

                            <BlockchainContext.Provider
                                value={{ instance, accountsPromise, web3 }}
                            >
                            <div>
                                <nav>
                                    <ul>
                                        <li>
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li>
                                            <Link to="/play">Play</Link>
                                        </li>
                                        <li>
                                            <Link to="/users">Users</Link>
                                        </li>
                                    </ul>
                                </nav>

                                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

                            </div>

                                <Routes/>
                        </BlockchainContext.Provider>

                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Balance: {this.state.balance} ETH
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar>
                </Router>


        </div>
            )
        }
    }
}
export default App;
