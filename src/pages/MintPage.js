import React from 'react'
import { constants, Contract, ethers } from 'ethers';

import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './MintPage.css'

const { app } = require('electron');
const fs = window.require('fs');

export default function MintPage() {
  const [profileName, setProfileName] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [RPCURL, setRPCURL] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [contractABI, setContractABI] = useState([]);
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);

  // eventually change this into just getting it from ABI 
  // and having a dropdown for choosing the function
  const [functionName, setFunctionName] = useState('');
  const [parameters, setParameters] = useState([]);

  // might be useful?
  function isValidPrivateKey() {
    return ethers.utils.isHexString(privateKey);
  }

  function formatParams(paramArr) {
    let returnStr = "";
    for (let i = 0; i < paramArr.length; i++) {
      if (paramArr[i] === 'uint') paramArr[i] = 'uint256';

      returnStr += `${paramArr[i]}, `;
    }

    return returnStr.slice(0, -2);
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

    const params = [amount, {value: ethers.utils.parseUnits(`${price*amount}`, "ether")}]
    await Contract[`${functionName}(${formatParams(parameters)})`](...params);

    e.preventDefault();
  }

  // have a popup asking for profile name
  // have a popup for success
  const saveButtonEvent = async (e) => {
    
    let toSave = {
      profileName: profileName,
      privateKey: privateKey,
      RPCURL: RPCURL,
      contractAddress: contractAddress,
      contractABI: contractABI,
      price: price,
      amount: amount,
      functionName: functionName,
      parameters: parameters
    }

    fs.writeFileSync(`${profileName}.json`, JSON.stringify(toSave, null, 2));

    e.preventDefault();
  }

  const loadButtonEvent = async (e) => {
    

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
        </Row>

        <Row>
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

          <Col md="2">
            <Form className="FunctionForm" onSubmit={onSubmit}>
              <Form.Floating className="mb-3">
                  <Form.Control id="floatingInputCustom" type="text" placeholder="mint" onChange={(e) => {setFunctionName(e.target.value)}}/>
                  <Form.Label htmlFor="floatingInputCustom">Function</Form.Label>
              </Form.Floating>
            </Form>
          </Col>

          <Col md="2">
            <Form className="ParamsForm" onSubmit={onSubmit}>
              <Form.Floating className="mb-3">
                  <Form.Control id="floatingInputCustom" type="text" placeholder="uint256" onChange={(e) => {setParameters(e.target.value.split(' '))}}/>
                  <Form.Label htmlFor="floatingInputCustom">Params</Form.Label>
              </Form.Floating>
            </Form>
          </Col>

          <Col md="2">
            <Form className="ProfileNameForm" onSubmit={onSubmit}>
              <Form.Floating className="mb-3">
                  <Form.Control id="floatingInputCustom" type="text" placeholder="profile" onChange={(e) => {setProfileName(e.target.value)}}/>
                  <Form.Label htmlFor="floatingInputCustom">Profile Name</Form.Label>
              </Form.Floating>
            </Form>
          </Col>
        </Row>
      </Container>

        <Row className="justify-content-md-center">
          <Col md="auto">
            <Button variant="success" size="lg" onClick={mintButtonEvent}>
              Mint
            </Button>
          </Col>
          <Col md="auto">
            <Button variant="primary" size="lg" onClick={saveButtonEvent}>
              Save Profile
            </Button>
          </Col>
          <Col md="auto">
            <Button variant="primary" size="lg" onClick={loadButtonEvent}>
              Load Profile
            </Button>
          </Col>
        </Row>
      </div>
  )
}
