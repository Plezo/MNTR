import { Dropdown } from 'react-bootstrap';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import React from 'react';

const { ipcRenderer } = window;

export default function Task(props) {
    const runTask = async (e) => {
        const task = {taskName: {taskName: props.task.taskName, profileName: props.task.profileName, walletName: props.task.walletName}};
        const dataToSend = {wallets: props.wallets, profiles: props.profiles, tasks: task};
        ipcRenderer.invoke('runTasks', dataToSend);
        e.preventDefault();
    }

    const deleteTask = async (e) => {
        ipcRenderer.invoke('deleteTask', {task: props.task.taskName}).then((result) => {
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
            <TableRow className="taskRow">
                <TableCell className='taskCell'>
                    {props.task.taskName}
                </TableCell>
                <TableCell className='taskCell'>
                    {props.task.profileName}
                </TableCell>
                <TableCell className='taskCell'>
                    {props.task.walletName}
                </TableCell>
                <TableCell className='taskCell'>
                    temp
                </TableCell>
                <TableCell className='taskCell'>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary">
                        Actions
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={(e) => runTask(e)}>
                                Run
                            </Dropdown.Item>
                            <Dropdown.Item onClick={(e) => deleteTask(e)}>
                                Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </TableCell>
            </TableRow>
        </>
    )
}