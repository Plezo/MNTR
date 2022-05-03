import React from 'react'
import { Contract, ethers } from 'ethers';

import { Button, Form, Container, Row, Col } from 'react-bootstrap';
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

  const saveConfigEvent = async (e) => {
    ipcRenderer.invoke('editConfig', "").then((result) => {
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

  const loadConfigEvent = async (e) => {
    ipcRenderer.invoke('loadConfig', "").then((result) => {
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
                <Row>
                    <Col>
                        <Form className="PrivateKeyForm" >
                            <Form.Floating className="mb-3">
                                <Form.Control id="floatingInputCustom" type="text" value={privateKey} placeholder="0x00" onChange={(e) => {setPrivateKey(e.target.value)}}/>
                                <Form.Label htmlFor="floatingInputCustom">RPC URL</Form.Label>
                            </Form.Floating>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form className="PrivateKeyForm" >
                            <Form.Floating className="mb-3">
                                <Form.Control id="floatingInputCustom" type="text" value={privateKey} placeholder="0x00" onChange={(e) => {setPrivateKey(e.target.value)}}/>
                                <Form.Label htmlFor="floatingInputCustom">Private Key</Form.Label>
                            </Form.Floating>
                        </Form>
                    </Col>

                    <Col>
                    <Form className="RPCForm" >
                        <Form.Floating className="mb-3">
                            <Form.Control id="floatingInputCustom" type="text" value={RPCURL} placeholder="https://" onChange={(e) => {setRPCURL(e.target.value)}}/>
                            <Form.Label htmlFor="floatingInputCustom">Profile Name</Form.Label>
                        </Form.Floating>
                    </Form>
                    </Col>
                </Row>
            </Container>
        </div>
        <div className="bottomPage">
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Link to="/">
                            <Button>
                            Mint Page
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
      </>
  )
}
