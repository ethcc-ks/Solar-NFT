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
            <div className='popup' style={{position: 'absolute', top: 0, margin: 'auto'}}>
                <div className='popup_inner'>
                    <Modal.Dialog centered>
                        <Modal.Header>
                            <Modal.Title>You are on the {this.props.planetID} planet</Modal.Title>
                        </Modal.Header>
                        <Form>
                            <Form.Group controlId="formBasicText">

                                <Form.Label>Explore more...</Form.Label>
                                <Form.Control type="number" value={this.state.amountToLend} placeholder="1" onChange={this.handleLendingAmount} />
                            </Form.Group>
                        </Form>
                        <div>
                            <Button variant="primary" style={{ margin: "10px" }} onClick={this.handleSubmission}>Lend</Button>
                            <Button variant="secondary" style={{ margin: "10px" }} onClick={this.props.closePopup}>Close</Button>
                            
                        </div>
                    </Modal.Dialog>
                </div>
            </div>
        );
    }
}
export default LendingPopup;
