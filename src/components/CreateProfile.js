import React from 'react'

import { Button, Form, Container, Row, Col, Table, Modal } from 'react-bootstrap';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateProfile.css'

const { ipcRenderer } = window;

export default function CreateProfile(props) {
    const [show, setShow] = useState(false);

    const [profileName, setProfileName] = useState('');
    const [contractAddress, setContractAddress] = useState('');
    const [contractABI, setContractABI] = useState([]);
    const [price, setPrice] = useState(0);
    const [amount, setAmount] = useState(0);

    // eventually change this into just getting it from ABI 
    // and having a dropdown for choosing the function
    const [functionName, setFunctionName] = useState('');
    const [parameters, setParameters] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveButtonEvent = async (e) => {
    
        let toSave = {
          profileName: profileName,
          contractAddress: contractAddress,
          contractABI: contractABI,
          price: price,
          amount: amount,
          functionName: functionName,
          parameters: parameters
        }
    
        ipcRenderer.invoke('addProfile', toSave).then((result) => {
          if (result.success) {
            // popup success message
            console.log(result.message);
            props.setProfiles(result.content);
          }
          else {
            // popup fail message
            console.log(result.message);
          }
        });
    
        e.preventDefault();
    }

    return (
    <>
        <Button variant="primary" size="lg" onClick={handleShow}>
            Create Profile
        </Button>

        <Modal 
        size="lg"
        centered
        show={show} 
        onHide={handleClose} 
        backdrop="static" 
        keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Form>
                        <Form.Floating>
                            <Form.Control 
                            className="profileNameInput" 
                            type="text" 
                            placeholder="Profile Name" 
                            onChange={(e) => {setProfileName(e.target.value)}}/>
                            <Form.Label className="profileNameLabel">Profile Name</Form.Label>
                        </Form.Floating>
                    </Form>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="mb-3">
                        <Col>
                        <Form>
                            <Form.Floating>
                                <Form.Control id="floatingInputCustom" type="text" placeholder="0x00" onChange={(e) => {setContractAddress(e.target.value)}}/>
                                <Form.Label htmlFor="floatingInputCustom">Contract Address</Form.Label>
                            </Form.Floating>
                        </Form>
                        </Col>

                        <Col>
                        <Form>
                            <Form.Floating>
                                <Form.Control id="floatingInputCustom" type="text" placeholder="[]" onChange={(e) => {setContractABI([e.target.value])}}/>
                                <Form.Label htmlFor="floatingInputCustom">Contract ABI</Form.Label>
                            </Form.Floating>
                        </Form>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                        <Form>
                            <Form.Floating>
                                <Form.Control id="floatingInputCustom" type="text" placeholder="0" onChange={(e) => {setPrice(e.target.value)}}/>
                                <Form.Label htmlFor="floatingInputCustom">ETH</Form.Label>
                            </Form.Floating>
                        </Form>
                        </Col>

                        <Col>
                        <Form>
                            <Form.Floating className="mb-3">
                                <Form.Control id="floatingInputCustom" type="text" placeholder="1" onChange={(e) => {setAmount(e.target.value)}}/>
                                <Form.Label htmlFor="floatingInputCustom">Amount</Form.Label>
                            </Form.Floating>
                        </Form>
                        </Col>

                        <Col>
                        <Form>
                            <Form.Floating className="mb-3">
                                <Form.Control id="floatingInputCustom" type="text" placeholder="mint" onChange={(e) => {setFunctionName(e.target.value)}}/>
                                <Form.Label htmlFor="floatingInputCustom">Function</Form.Label>
                            </Form.Floating>
                        </Form>
                        </Col>

                        <Col>
                        <Form>
                            <Form.Floating className="mb-3">
                                <Form.Control id="floatingInputCustom" type="text" placeholder="uint256" onChange={(e) => {setParameters(e.target.value.split(' '))}}/>
                                <Form.Label htmlFor="floatingInputCustom">Params</Form.Label>
                            </Form.Floating>
                        </Form>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={(e) => { handleClose(e); saveButtonEvent(e) }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}
