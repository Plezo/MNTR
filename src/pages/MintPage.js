import React from 'react'

import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import CreateProfile from '../components/CreateProfile';
import CreateTask from '../components/CreateTask';
import CreateWallet from '../components/CreateWallet';
import TaskTable from '../components/TaskTable';

import 'bootstrap/dist/css/bootstrap.min.css';
import './MintPage.css'

const { ipcRenderer } = window;

export default function MintPage() {
  const [wallets, setWallets] = useState({'RPCURL': '', "wallets": {}});
  const [profiles, setProfiles] = useState({});
  const [tasks, setTasks] = useState({tasks: []});

  const handleProfilesChange = (newProfiles) => {
    setProfiles(newProfiles);
  }

  const handleTaskChange = (newTasks) => {
    setTasks(newTasks);
  }

  const handleWalletsChange = (newWallets) => {
    setWallets(newWallets);
  }

  const runAllTasks = () => {
    ipcRenderer.invoke('runTasks', {wallets: wallets, profiles: profiles, tasks: tasks}).then((result) => {
      if (result.success) {
        console.log(result.message)
      }
      else {
        console.log(result.message)
      }
    });
  }

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
              <Button variant="success" size="lg" onClick={runAllTasks}>
                Run All
              </Button>
            </Col>
            <Col md="auto">
              <CreateProfile profile={profiles} setProfiles={handleProfilesChange} />
            </Col>
            <Col md="auto">
              <CreateTask tasks={tasks} setTasks={handleTaskChange} profiles={profiles} wallets={wallets} />
            </Col>
            <Col md="auto">
              <CreateWallet wallets={wallets} setWallets={handleWalletsChange} />
            </Col>
          </Row>
  
          <Row className="mb-3">
            <Col>
              <TaskTable wallets={wallets} profiles={profiles} tasks={tasks} />
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
