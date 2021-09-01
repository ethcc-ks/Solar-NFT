import { Card, Col, Modal, Nav, Row } from "react-bootstrap";
import React from "react";

    function PlanetGrid (props) {

        const rows = [];
    
        for (var i = 0; i < 3; i++) {
            rows.push(
                    <Col key={i} xs={{span: 12, order: 1}}  md='auto'>
                        <Card text='white' className='cardhover noselect' style={{padding: '10px', background: 'rgba(20, 20, 20, 1)', border: '1px solid rgb(44, 51, 57)', borderRadius: '1rem'}}>
                            <Card.Body>
                                <Card.Title style={{color: "white"}}>Hello</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
            )
        }
    
        return rows;
    }

    function MyVerticallyCenteredModal(props) {
        return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>My Planets</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row id='myplanets'>
                    <PlanetGrid/>
                </Row>
            </Modal.Body>
        </Modal>
        );
    }
  
    export function MyPlanets () {
        const [modalShow, setModalShow] = React.useState(false);
    
        return (
        <>
            <Nav.Link onClick={() => setModalShow(true)}>My Planets</Nav.Link>
    
            <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            />
        </>
        );
    }