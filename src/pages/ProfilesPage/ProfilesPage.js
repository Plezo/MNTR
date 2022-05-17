import React from 'react'

import { Button, Form, FloatingLabel, InputGroup, Container, Row, Col, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfilesPage.css'

const { ipcRenderer } = window;

export default function ProfilesPage() {

  const [profiles, setProfiles] = useState({});

  useEffect(() => {
    ipcRenderer.invoke('getProfiles').then((result) => {
      if (result.success) {
        // popup success message  
        setProfiles(result.content);
        console.log(result.message);
      }
      else {
        // popup fail message
        console.log(result.message);
      }
    });
  }, []);

  // make the profile name a modal that shows all the stats and allows you to edit
  return (
      <>
        <div className="profiles">
          <Container>
            <Row className="mb-3">
              <Table className="walletsTable" responsive="sm">
                <thead>
                  <tr>
                    <th>Profile Name</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(profiles).map((item) => {
                    return (
                      <tr key={ item }>
                        <td>{ item }</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Row>
          </Container>
        </div>
      </>
  )
}
