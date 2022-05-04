import React from 'react'
import { Contract, ethers } from 'ethers';

import { Button, Form, FormControl, FloatingLabel, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './SettingsPage.css'

const { ipcRenderer } = window;

export default function SettingsPage() {

  // consider having one usestate for an obj

  // private info (switch to seperate wallet configs instead of task info)
  const [privateKey, setPrivateKey] = useState('');
  const [RPCURL, setRPCURL] = useState('');
  const [walletName, setWalletName] = useState('');


  // add checks for if input is empty
  const addWalletEvent = (e) => {
    const obj = {
      privateKey: privateKey,
      walletName: walletName
    }

    ipcRenderer.invoke('editConfig', obj).then((result) => {
      if (result.success) {
        // popup success message
        console.log(result.message);
      }
      else {
        // popup fail message
        console.log(result.message);
      }
    });
  }

  const changeRPCURLEvent = (e) => {
    ipcRenderer.invoke('changeRPC', RPCURL).then((result) => {
      if (result.success) {
        // popup success message
        console.log(result.message);
      }
      else {
        // popup fail message
        console.log(result.message);
      }
    });
  }

  return (
      <>
        <div className="SettingsPage">
          <Container>
            <Row className="mb-3">
              <Col>
                <InputGroup className="RPCURLInput">
                  <FloatingLabel label="RPC URL">
                    <Form.Control type="text" placeholder="https://" onChange={(e) => {setRPCURL(e.target.value)}}/>
                  </FloatingLabel>
                  <Button variant="success" onClick={changeRPCURLEvent}>Save</Button>
                </InputGroup>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form className="PrivateKeyForm">
                  <Form.Floating>
                    <Form.Control id="floatingInputCustom" type="text" placeholder="0x00" onChange={(e) => {setPrivateKey(e.target.value)}}/>
                    <Form.Label htmlFor="floatingInputCustom">Private Key</Form.Label>
                  </Form.Floating>
                </Form>
              </Col>
              <Col>
                <Form className="WalletNameForm">
                  <Form.Floating>
                    <Form.Control id="floatingInputCustom" type="text" placeholder="Wallet" onChange={(e) => {setWalletName(e.target.value)}}/>
                    <Form.Label htmlFor="floatingInputCustom">Wallet Name</Form.Label>
                  </Form.Floating>
                </Form>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <Button variant="success" size="lg" onClick={addWalletEvent}>
                  Save Wallet
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="bottomPage">
          <Container>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <Link to="/">
                  <Button>Mint Page</Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      </>
  )
}
