import React from 'react'

import { Button, Form, FloatingLabel, InputGroup, Container, Row, Col, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './SettingsPage.css'

const { ipcRenderer } = window;

export default function SettingsPage() {

  const [config, setConfig] = useState({RPCURL: "", wallets: []});
  const [RPCURL, setRPCURL] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [walletName, setWalletName] = useState('');

  useEffect(() => {
    ipcRenderer.invoke('getConfig').then((result) => {
      if (result.success) {
        // popup success message  
        setConfig(result.content);
        console.log(result.message);
      }
      else {
        // popup fail message
        console.log(result.message);
      }
    });
  }, []);

  // add checks for if input is empty
  const addWalletEvent = (e) => {
    const obj = {
      privateKey: privateKey,
      walletName: walletName
    }

    ipcRenderer.invoke('addWallet', obj).then((result) => {
      if (result.success) {
        // popup success message
        setConfig(result.content);
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
            <Row className="justify-content-md-center mb-3">
              <Col md="auto">
                <Button variant="success" size="lg" onClick={addWalletEvent}>
                  Save Wallet
                </Button>
              </Col>
            </Row>
            <Row className="mb-3">
              <Table className="walletsTable" responsive="sm">
                <thead>
                  <tr>
                    <th>Wallet Name</th>
                    <th>Private Key</th>
                  </tr>
                </thead>
                <tbody>
                  {config.wallets.map((item) => {
                    return (
                      <tr key={item.walletName}>
                        <td>{ item.walletName }</td>
                        <td>{ item.privateKey }</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
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
