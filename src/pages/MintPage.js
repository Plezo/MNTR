import React from 'react'


import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

import './MintPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MintPage() {
  const [privateKey, setPrivateKey] = useState('');

  function isValidPrivateKey() {
    return true;
  }

  const changePrivateKey = (e) => {
    e.preventDefault();
    console.log(e.target.name)
    const validPrivateKey = isValidPrivateKey(e.target.value);

    if (validPrivateKey) {
      console.log(privateKey)
      setPrivateKey(e.target.value);
      console.log(privateKey)
    }
    else {
      console.log("Invalid!")
    }
  }

  return (
      <>
        <div className="privateKeyForm">
          <Form onSubmit={changePrivateKey}>
            <Form.Floating className="mb-3" >
                <Form.Control id="floatingInputCustom" type="text" placeholder="0x00" />
                <Form.Label htmlFor="floatingInputCustom">Private Key</Form.Label>
                <Button type="submit">Submit</Button>
            </Form.Floating>
          </Form>
        </div>

        <Button variant="primary" size="lg">
          Mint
        </Button>
      </>
  )
}
