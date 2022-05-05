import React from 'react'

import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import CreateProfile from '../components/CreateProfile';
import CreateTask from '../components/CreateTask';
import TaskTable from '../components/TaskTable';

import 'bootstrap/dist/css/bootstrap.min.css';
import './MintPage.css'

const { ipcRenderer } = window;

export default function MintPage() {

  const [config, setConfig] = useState({RPCURL: "", wallets: []});
  const [profiles, setProfiles] = useState({temp: {profileName: ""}});
  const [tasks, setTasks] = useState({tasks: []});

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

      ipcRenderer.invoke('getTasks').then((result) => {
        if (result.success) {
          // popup success message  
          setTasks(result.content);
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
      <div className="mintPage">
        <Container className="mintInfo">
          <Row className="justify-content-md-center mb-3">
            <Col md="auto">
              <Button variant="success" size="lg">
                Mint
              </Button>
            </Col>
            <Col md="auto">
              <CreateProfile />
            </Col>
            <Col md="auto">
              <CreateTask tasks={tasks} profiles={profiles} config={config}/>
            </Col>
          </Row>
          
          <Row className="mb-3">
            <Col>
              <TaskTable tasks={tasks} profiles={profiles} config={config} />
            </Col>
          </Row>
        </Container>
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
