import React from 'react'

import { Button, Form, FloatingLabel, InputGroup, Container, Row, Col, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './SettingsPage.css'

const { ipcRenderer } = window;

export default function SettingsPage() {

  const [wallets, setWallets] = useState({RPCURL: "", "wallets": {}});

  useEffect(() => {
    ipcRenderer.invoke('getWallets').then((result) => {
      if (result.success) {
        // popup success message  
        setWallets(result.content);
        console.log(result.message);
      }
      else {
        // popup fail message
        console.log(result.message);
      }
    });
  }, []);

  return (
      <>
        <div className="SettingsPage">
          <Container>
            <Row className="mb-3">
              <Table className="walletsTable" responsive="sm">
                <thead>
                  <tr>
                    <th>Wallet Name</th>
                    <th>Private Key</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(wallets.wallets).map((item) => {
                    return (
                      <tr key={ item }>
                        <td>{ item }</td>
                        <td>{ wallets.wallets[item].privateKey }</td>
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
