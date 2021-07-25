import axios from 'axios';
import React, { Component } from 'react';
import { Button, Form, Modal } from "react-bootstrap";

class LendingPopup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            amountToLend:0,
        }

        this.handleSubmission=this.handleSubmission.bind(this);
        this.handleLendingAmount=this.handleLendingAmount.bind(this)
    }

    handleSubmission =  (e) => {
        this.setState({amountToLend: e.target.value})
        console.log(this.state.amountToLend);
        this.props.handleLend(this.state.amountToLend)
    };
    handleLendingAmount(e) {
        this.setState({amountToLend: e.target.value})
    }

    render() {
        return (
            <div className='popup' style={{position: 'absolute', top: 0, margin: 'auto', right: 0}}>
                <div className='popup_inner'>
                    <Modal.Dialog centered>
                        <Modal.Header>
                            <Modal.Title>You are on the planet {this.props.planetID}.</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                        </Modal.Body>
                        <div>
                            <Button variant="secondary" style={{ margin: "10px" }} onClick={this.props.closePopup}>Close</Button>
                            
                        </div>
                    </Modal.Dialog>
                </div>
            </div>
        );
    }
}
export default LendingPopup;
