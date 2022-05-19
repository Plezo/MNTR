import React from 'react'

import { Form, Container, Row, Col, Table, Modal } from 'react-bootstrap';
import { Button } from '@mui/material';
import AddCardIcon from '@mui/icons-material/AddCard';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateWallet.css'

const { ipcRenderer } = window;

export default function CreateProfile(props) {
    const [show, setShow] = useState(false);

    const [walletName, setWalletName] = useState('');
    const [RPCURL, setRPCURL] = useState('');
    const [privateKey, setPrivateKey] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveButtonEvent = async (e) => {
    
        let walletToAdd = {
            RPCURL: RPCURL,
            walletName: walletName,
            privateKey: privateKey
        }
    
        ipcRenderer.invoke('addWallet', walletToAdd).then((result) => {
          if (result.success) {
            // popup success message
            console.log(result.message);

            // result.content is the new editted json
            props.setWallets(result.content);
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
        <Button onClick={handleShow} startIcon={<AddCardIcon />} sx={{color: 'var(--color4)'}}>
            Add Wallet
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
                            className="walletNameInput" 
                            type="text" 
                            placeholder="Wallet Name" 
                            onChange={(e) => {setWalletName(e.target.value)}}/>
                            <Form.Label className="walletNameLabel">Wallet Name</Form.Label>
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
                                <Form.Control id="floatingInputCustom" type="text" placeholder="" onChange={(e) => {setRPCURL(e.target.value)}}/>
                                <Form.Label htmlFor="floatingInputCustom">RPC URL</Form.Label>
                            </Form.Floating>
                        </Form>
                        </Col>

                        <Col>
                        <Form>
                            <Form.Floating>
                                <Form.Control id="floatingInputCustom" type="text" placeholder="0x00" onChange={(e) => {setPrivateKey(e.target.value)}}/>
                                <Form.Label htmlFor="floatingInputCustom">Private Key</Form.Label>
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
