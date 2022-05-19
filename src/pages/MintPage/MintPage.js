import React from 'react'

import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import CreateProfile from '../../components/CreateProfile/CreateProfile';
import CreateTask from '../../components/CreateTask/CreateTask';
import CreateWallet from '../../components/CreateWallet/CreateWallet';
import TaskTable from '../../components/TaskTable/TaskTable';

import 'bootstrap/dist/css/bootstrap.min.css';
import './MintPage.css'

const { ipcRenderer } = window;

export default function MintPage() {
  const [wallets, setWallets] = useState({'RPCURL': '', "wallets": {}});
  const [profiles, setProfiles] = useState({});
  const [tasks, setTasks] = useState({});

  const handleProfilesChange = (newProfiles) => {
    setProfiles(newProfiles);
  }

  const handleTaskChange = (newTasks) => {
    setTasks(newTasks);
  }

  const handleWalletsChange = (newWallets) => {
    setWallets(newWallets);
  }

  const runAllTasks = (e) => {
    ipcRenderer.invoke('runTasks', {wallets: wallets, profiles: profiles, tasks: tasks}).then((result) => {
      if (result.success) {
        console.log(result.message)
      }
      else {
        console.log(result.message)
      }
    });
    e.preventDefault();
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
      <div className="mint">
        <Container className="mintInfo">
          <Row className="justify-content-md-center mb-3 topButtons">
            <Col md="auto">
              <Button onClick={(e) => runAllTasks(e)} startIcon={<CheckIcon />} sx={{color: 'var(--color4)'}}>
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
              <TaskTable wallets={wallets} profiles={profiles} tasks={tasks} setTasks={handleTaskChange} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
