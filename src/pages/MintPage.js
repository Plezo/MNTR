import React from 'react'
import { Contract, ethers } from 'ethers';

import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './MintPage.css'

const { ipcRenderer } = window;

export default function MintPage() {

  // consider having one usestate for an obj

  // private info (switch to seperate wallet configs instead of task info)
  const [privateKey, setPrivateKey] = useState('');
  const [RPCURL, setRPCURL] = useState('');

  // task info
  const [profileName, setProfileName] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [contractABI, setContractABI] = useState([]);
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);

  // eventually change this into just getting it from ABI 
  // and having a dropdown for choosing the function
  const [functionName, setFunctionName] = useState('');
  const [parameters, setParameters] = useState([]);


  function formatParams(paramArr) {
    let returnStr = "";
    for (let i = 0; i < paramArr.length; i++) {
      if (paramArr[i] === 'uint') paramArr[i] = 'uint256';

      returnStr += `${paramArr[i]}, `;
    }

    return returnStr.slice(0, -2);
  }

  // might be useful?
  function isValidPrivateKey() {
    return ethers.utils.isHexString(privateKey);
  }

  const mintButtonEvent = async (e) => {

    // have this code in a seperated js file

    const Provider = new ethers.providers.JsonRpcProvider(RPCURL)
    const Wallet = new ethers.Wallet(privateKey, Provider);
    const Contract = new ethers.Contract(contractAddress, contractABI, Wallet);

    const params = [amount, {value: ethers.utils.parseUnits(`${price*amount}`, "ether")}]
    await Contract[`${functionName}(${formatParams(parameters)})`](...params);

    e.preventDefault();
  }

  // have a popup asking for profile name
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

    ipcRenderer.invoke('addProfile', toSave).then((result) => {
      if (result.success) {
        // popup success message
        console.log(result.message);
      }
      else {
        // popup fail message
        console.log(result.message);
      }
    });

    e.preventDefault();
  }

  const loadButtonEvent = async (e) => {
    const profileToLoad = profileName;
    // prompt up a textbox that asks for profile name
    ipcRenderer.invoke('loadProfile', profileToLoad).then((result) => {
      if (result.success) {
        // popup success message
        console.log(result.message);

        setPrivateKey(result.content.privateKey);
        setRPCURL(result.content.RPCURL);
        setProfileName(result.content.profileName);
        setContractAddress(result.content.contractAddress);
        setContractABI(result.content.contractABI);
        setPrice(result.content.price);
        setAmount(result.content.amount);
        setFunctionName(result.content.functionName);
        setParameters(result.content.parameters);
      }
      else {
        // popup fail message
        console.log(result.message);
      }
    });    

    e.preventDefault();
  }

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
      <div className="mintPage">
        <Container className="mintInfo">
        <Row className="justify-content-md-center">
          <Col>
            <Form className="ContractAddressForm" >
              <Form.Floating className="mb-3">
                  <Form.Control id="floatingInputCustom" type="text" value={contractAddress} placeholder="0x00" onChange={(e) => {setContractAddress(e.target.value)}}/>
                  <Form.Label htmlFor="floatingInputCustom">Contract Address</Form.Label>
              </Form.Floating>
            </Form>
          </Col>

          <Col>
            <Form className="ABIForm" >
              <Form.Floating className="mb-3">
                  <Form.Control id="floatingInputCustom" type="text" value={contractABI} placeholder="[]" onChange={(e) => {setContractABI([e.target.value])}}/>
                  <Form.Label htmlFor="floatingInputCustom">Contract ABI</Form.Label>
              </Form.Floating>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col md="2">
            <Form className="PriceForm" >
              <Form.Floating className="mb-3">
                  <Form.Control id="floatingInputCustom" type="text" value={price} placeholder="0.2" onChange={(e) => {setPrice(e.target.value)}}/>
                  <Form.Label htmlFor="floatingInputCustom">ETH</Form.Label>
              </Form.Floating>
            </Form>
          </Col>

          <Col md="2">
            <Form className="AmountForm" >
              <Form.Floating className="mb-3">
                  <Form.Control id="floatingInputCustom" type="text" value={amount} placeholder="1" onChange={(e) => {setAmount(e.target.value)}}/>
                  <Form.Label htmlFor="floatingInputCustom">Amount</Form.Label>
              </Form.Floating>
            </Form>
          </Col>

          <Col md="2">
            <Form className="FunctionForm" >
              <Form.Floating className="mb-3">
                  <Form.Control id="floatingInputCustom" type="text" value={functionName} placeholder="mint" onChange={(e) => {setFunctionName(e.target.value)}}/>
                  <Form.Label htmlFor="floatingInputCustom">Function</Form.Label>
              </Form.Floating>
            </Form>
          </Col>

          <Col md="2">
            <Form className="ParamsForm" >
              <Form.Floating className="mb-3">
                  <Form.Control id="floatingInputCustom" type="text" value={parameters} placeholder="uint256" onChange={(e) => {setParameters(e.target.value.split(' '))}}/>
                  <Form.Label htmlFor="floatingInputCustom">Params</Form.Label>
              </Form.Floating>
            </Form>
          </Col>

          <Col md="2">
            <Form className="ProfileNameForm" >
              <Form.Floating className="mb-3">
                  <Form.Control id="floatingInputCustom" type="text" value={profileName} placeholder="profile" onChange={(e) => {setProfileName(e.target.value)}}/>
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
      <div className="bottomPage">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Link to="/settings">
                <Button>
                  Settings Page
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
