import React from 'react'
import { Contract, ethers } from 'ethers';

import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './MintPage.css'

export default function MintPage() {
  const [privateKey, setPrivateKey] = useState('');

  // might be useful?
  function isValidPrivateKey() {
    return true;
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

  const mintButtonEvent = (e) => {

    // just mint here, hardcode everything for now

    e.preventDefault();
  }

  return (
      <div className="mintPage">
        <div className="privateKeyForm">
          <Form onSubmit={onSubmit}>
            <Form.Floating className="mb-3">
                <Form.Control id="floatingInputCustom" type="text" placeholder="0x00" onChange={(e) => {setPrivateKey({ privateKey: e.target.value })}}/>
                <Form.Label htmlFor="floatingInputCustom">Private Key</Form.Label>
                <Button type="submit">Submit</Button>
            </Form.Floating>
          </Form>
        </div>

        <Button variant="primary" size="lg" onClick={mintButtonEvent}>
          Mint
        </Button>
      </div>
  )
}
