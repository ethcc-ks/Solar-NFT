import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class Popup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            closeLoader: this.props.closeLoader,
            selectedFile: null,
            isFilePicked: false,
            NFTName: "name",
            NFTDescription: "description"
        }
    }

    changeHandler = (event) => {
        this.setState({selectedFile : event.target.files[0]});
        this.setState({isFilePicked : true});
    };

    handleSubmission = async () => {
        let data = this;
        console.log(this.state.selectedFile);
        console.log(this.state.NFTName)
        await this.props.createNFTPlanet(this.state.NFTName, this.state.NFTDescription, this.state.selectedFile);
    };

    changeName = (event) => {
        this.setState({NFTName: event.target.value})
    };

    render() {
        return (
            <div className='popup' style={{position: 'absolute', top: 0, margin: 'auto'}}>
                <div className='popup_inner'>
                    <Modal.Dialog centered>
                        <Modal.Header>
                            <Modal.Title>Create your wonderful planETH !</Modal.Title>
                        </Modal.Header>
                        <div className="mb-3">
                            <input className="form-control" type="text" id="formName" onChange={this.changeName} placeholder='Planet Name'/>
                        </div>
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
                            <Button variant="secondary"  style={{ margin: "10px" }} onClick={this.props.closeLoader}>Close</Button>
                        </div>
                    </Modal.Dialog>
                </div>
            </div>
        );
    }
}
export default Popup;
