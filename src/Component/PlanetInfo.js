import React, { Component } from 'react';
import { Button, Image, Modal } from "react-bootstrap";
import BlockchainContext from "../context/BlockchainContext";

class PlanetModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contract: null,
        }

        this.handleSubmission=this.handleSubmission.bind(this);
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

    async displayNFT(nftContract, tokenId, planetId) {
      await this.state.contract.methods.addNFT(nftContract, tokenId, planetId)
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
        if(this.props.nft !== null) {
            return (
                <div className='popup' style={{position: 'absolute', top: 0, margin: 'auto', right: 10}}>
                    <div className='popup_inner'>
                        <Modal.Dialog centered variant='dark'>
                            <Image src={this.props.nft.image} thumbnail />
                            <Modal.Header>
                                <Modal.Title>{this.props.nft.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="mb-3" style={{paddingLeft: 15, paddingRight: 15}}>
                                    <p>{this.props.nft.description}</p>
                                    <h6>NFT Slots Available: <strong>{this.props.nft.attributes[0].value}</strong></h6>
                                    <input className="form-control" type="text" onChange={this.changeName} placeholder='NFT Contract'/>
                                    <input className="form-control" type="text" onChange={this.changeName} placeholder='Token ID'/>
                                </div>
                                <div>
                                    <Button variant="primary" style={{ margin: "10px" }} onClick={this.handleSubmission}>Submit</Button>
                                    <Button variant="secondary" style={{ margin: "10px" }} onClick={this.props.closePopup}>Close</Button>
                                </div>
                            </Modal.Body>
                        </Modal.Dialog>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='popup' style={{position: 'absolute', top: 0, margin: 'auto', right: 10}}>
                    <div className='popup_inner'>
                        <Modal.Dialog centered>
                            <Modal.Header>
                                <Modal.Title>No planet selected</Modal.Title>
                            </Modal.Header>
                        </Modal.Dialog>
                    </div>
                </div>
            )
        }
        
    }
}

PlanetModal.contextType = BlockchainContext;

export default PlanetModal;
