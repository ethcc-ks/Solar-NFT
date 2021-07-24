import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class Popup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            closePopup: this.props.closePopup,
            selectedFile: null,
            isFilePicked: false,
            NFTName: "",
            NFTDescription: ""
        }
    }

    changeHandler = (event) => {
        this.setState({selectedFile : event.target.files[0]});
        this.setState({isFilePicked : true});
    };

    handleSubmission = async () => {
        let data = this;
        console.log(this.state.selectedFile);
        await this.props.createNFTPlanet(this.state.name, this)
    };

    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <Modal.Dialog centered>
                        <Modal.Header>
                            <Modal.Title>Upload your incredible NFT</Modal.Title>
                        </Modal.Header>
                        <div className="mb-3">
                            <input className="form-control" type="file" id="formFile" onChange={this.changeHandler}/>
                        </div>
                        {this.state.isFilePicked ? (
                            <p>You can upload your file now</p>
                        ) : (
                            <p>Select a file to show details</p>
                        )}
                        <div>
                            <Button variant="primary" style={{ margin: "10px" }} onClick={this.handleSubmission}>Submit</Button>
                            <Button variant="secondary"  style={{ margin: "10px" }} onClick={this.props.closePopup}>Close</Button>
                        </div>
                    </Modal.Dialog>
                </div>
            </div>
        );
    }
}
export default Popup;
