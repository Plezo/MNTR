import React from 'react'

import { Form, Container, Row, Col, Dropdown, Modal } from 'react-bootstrap';
import { Button } from '@mui/material';
import { useState } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateTask.css'

const { ipcRenderer } = window;

export default function CreateTask(props) {
    const [show, setShow] = useState(false);

    const [taskName, setTaskName] = useState('');
    const [profileName, setProfileName] = useState('');
    const [walletName, setWalletName] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveButtonEvent = async (e) => {
        const toSave = {
          taskName: taskName,
          profileName: profileName,
          walletName: walletName
        }
    
        ipcRenderer.invoke('addTask', toSave).then((result) => {
          if (result.success) {
            // popup success message
            console.log(result.message);
            props.setTasks(result.content);
          }
          else {
            // popup fail message
            console.log(result.message);
          }
        });
        e.preventDefault();
    }

    return (
    <>
        <Button onClick={handleShow} startIcon={<AddShoppingCartIcon />} sx={{color: 'var(--color4)'}}>
            Create Task
        </Button>

        <Modal 
        size="lg"
        centered
        show={show} 
        onHide={handleClose} 
        backdrop="static" 
        keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Form>
                        <Form.Floating>
                            <Form.Control 
                            className="taskNameInput" 
                            type="text" 
                            placeholder="Task Name" 
                            onChange={(e) => {setTaskName(e.target.value)}}/>
                            <Form.Label className="taskNameLabel">Task Name</Form.Label>
                        </Form.Floating>
                    </Form>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary">
                                    {profileName === '' ? 'Profile' : profileName}
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="createTaskDropdown">
                                    {Object.keys(props.profiles).map((item) => {
                                        return (
                                            <Dropdown.Item 
                                            key={item} 
                                            onClick={() => setProfileName(item)}
                                            > {item} </Dropdown.Item>
                                        )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary">
                                    {walletName === "" ? "Wallet" : walletName}
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="createTaskDropdown">
                                    {Object.keys(props.wallets.wallets).map((item) => {
                                        return (
                                            <Dropdown.Item
                                            key={item} 
                                            onClick={() => setWalletName(item)}> {item} </Dropdown.Item>
                                        )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={(e) => { handleClose(e); saveButtonEvent(e) }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}
