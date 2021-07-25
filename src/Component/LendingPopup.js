import axios from 'axios';
import React, { Component } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import BlockchainContext from "../context/BlockchainContext";

class LendingPopup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contract: null,
            nft: null,
        }

        this.handleSubmission=this.handleSubmission.bind(this);
        this.handleLendingAmount=this.handleLendingAmount.bind(this)
    }

    async componentDidMount ()  {
        this.setState({ contract: this.context.instance });
        this.setState({ accounts: await this.context.accountsPromise }); 

        
    }

    handleSubmission =  (e) => {
        this.setState({amountToLend: e.target.value})
        console.log(this.state.amountToLend);
        this.props.handleLend(this.state.amountToLend)
    };
    handleLendingAmount(e) {
        this.setState({amountToLend: e.target.value})
    }

    async displayNFT(nftContract, tokenId, planetId) {
        const addedNFT = await this.state.contract.methods.addNFT(nftContract, tokenId, planetId)
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
    }

    render() {
        return (
            <div className='popup' style={{position: 'absolute', top: 0, margin: 'auto', right: 0}}>
                <div className='popup_inner'>
                    <Modal.Dialog centered>
                        <Modal.Header>
                            <Modal.Title>You are on the planet {this.props.planetID}.</Modal.Title>
                        </Modal.Header>
                        <div className="mb-3">
                        <Modal.Title>Add NFT to your planet</Modal.Title>
                            <input className="form-control" type="text" id="formName" onChange={this.changeName} placeholder='NFT Contract'/>
                            <input className="form-control" type="text" id="formName" onChange={this.changeName} placeholder='Token ID'/>
                        </div>
                        <div>
                            <Button variant="primary" style={{ margin: "10px" }} onClick={this.handleSubmission}>Submit</Button>
                            <Button variant="secondary" style={{ margin: "10px" }} onClick={this.props.closePopup}>Close</Button>
                        </div>
                        <Modal.Body>
                            <Modal.Title>{this.state.nft}</Modal.Title>
                        </Modal.Body>
                    </Modal.Dialog>
                </div>
            </div>
        );
    }
}

LendingPopup.contextType = BlockchainContext;

export default LendingPopup;
