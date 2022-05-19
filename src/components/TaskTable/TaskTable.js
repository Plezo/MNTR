import React from 'react'

// import { Table } from 'react-bootstrap';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

import Task from '../Task/Task'

import './TaskTable.css';

export default function TaskTable(props) {

    return (
    <>
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label='task table' className="taskTable">
                <TableHead className='taskTableHead'>
                    <TableRow>
                        <TableCell>Task</TableCell>
                        <TableCell>Profile</TableCell>
                        <TableCell>Wallet</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(props.tasks).map((taskName) => {
                        return (
                            <Task
                            key={taskName}
                            task={props.tasks[taskName]}
                            setTasks={props.setTasks}
                            wallets={props.wallets}
                            profiles={props.profiles}/>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>
    )
}
