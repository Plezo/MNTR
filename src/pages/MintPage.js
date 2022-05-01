import React from 'react'
import { constants, Contract, ethers } from 'ethers';

import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './MintPage.css'

export default function MintPage() {
  const [privateKey, setPrivateKey] = useState('');
  const [RPCURL, setRPCURL] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [contractABI, setContractABI] = useState([]);
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);

  // might be useful?
  function isValidPrivateKey() {
    return ethers.utils.isHexString(privateKey);
  }

  // nothing in this func is useful rn
  const onSubmit = (e) => {
    const validPrivateKey = isValidPrivateKey(e.target.value);

    if (validPrivateKey)
      console.log("Valid input!")
    else
      console.log("Invalid input!") // display error or somethin

    e.preventDefault();
  }

  const mintButtonEvent = async (e) => {

    // const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    // const contractABI = ["function publicMint(uint) payable"];

    // const price = 0.08;
    // const amount = 1;

    // const RPCURL = "http://127.0.0.1:8545/";

    const Provider = new ethers.providers.JsonRpcProvider(RPCURL)
    const Wallet = new ethers.Wallet(privateKey, Provider);
    const Contract = new ethers.Contract(contractAddress, contractABI, Wallet);

    // figure out how to call a function by name
    const tx = await Contract.publicMint(amount, {value: ethers.utils.parseUnits(`${price*amount}`, "ether")});
    console.log(tx)

    e.preventDefault();
  }

  return (
      <div className="mintPage">
        <Container className="mintInfo">
          <Row>
            <Col>
              <Form className="PrivateKeyForm" onSubmit={onSubmit}>
                <Form.Floating className="mb-3">
                    <Form.Control id="floatingInputCustom" type="text" placeholder="0x00" onChange={(e) => {setPrivateKey(e.target.value)}}/>
                    <Form.Label htmlFor="floatingInputCustom">Private Key</Form.Label>
                </Form.Floating>
              </Form>
            </Col>

            <Col>
              <Form className="RPCForm" onSubmit={onSubmit}>
                <Form.Floating className="mb-3">
                    <Form.Control id="floatingInputCustom" type="text" placeholder="https://" onChange={(e) => {setRPCURL(e.target.value)}}/>
                    <Form.Label htmlFor="floatingInputCustom">RPC Url</Form.Label>
                </Form.Floating>
              </Form>
            </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col>
            <Form className="ContractAddressForm" onSubmit={onSubmit}>
              <Form.Floating className="mb-3">
                  <Form.Control id="floatingInputCustom" type="text" placeholder="0x00" onChange={(e) => {setContractAddress(e.target.value)}}/>
                  <Form.Label htmlFor="floatingInputCustom">Contract Address</Form.Label>
              </Form.Floating>
            </Form>
          </Col>

          <Col>
            <Form className="ABIForm" onSubmit={onSubmit}>
              <Form.Floating className="mb-3">
                  <Form.Control id="floatingInputCustom" type="text" placeholder="[]" onChange={(e) => {setContractABI([e.target.value])}}/>
                  <Form.Label htmlFor="floatingInputCustom">Contract ABI</Form.Label>
              </Form.Floating>
            </Form>
          </Col>

          <Col md="2">
            <Form className="PriceForm" onSubmit={onSubmit}>
              <Form.Floating className="mb-3">
                  <Form.Control id="floatingInputCustom" type="text" placeholder="0.2" onChange={(e) => {setPrice(e.target.value)}}/>
                  <Form.Label htmlFor="floatingInputCustom">ETH</Form.Label>
              </Form.Floating>
            </Form>
          </Col>

          <Col md="2">
            <Form className="AmountForm" onSubmit={onSubmit}>
              <Form.Floating className="mb-3">
                  <Form.Control id="floatingInputCustom" type="text" placeholder="1" onChange={(e) => {setAmount(e.target.value)}}/>
                  <Form.Label htmlFor="floatingInputCustom">Amount</Form.Label>
              </Form.Floating>
            </Form>
          </Col>
        </Row>
      </Container>

        <Row className="justify-content-md-center">
          <Col md="auto">
            <Button variant="primary" size="lg" onClick={mintButtonEvent}>
              Mint
            </Button>
          </Col>
        </Row>
      </div>
  )
}
