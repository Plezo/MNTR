import React from 'react'

import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import Task from './Task'

export default function TaskTable(props) {

    const [rows, setRows] = useState([]);

    useEffect(() => {
        for (let i = 0; i < props.tasks.length; i++) {
            const row = {
                taskName: props.tasks[i].taskName, 
                profileName: props.tasks[i].profileName, 
                walletName: props.tasks[i].walletName
            };
            setRows([...rows, row]);
        }
    });

    return (
    <>
        <Table className="walletsTable" responsive="sm">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Profile</th>
                    <th>Wallet</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((item) => {
                    return (
                        <Task item={item}/>
                    )
                })}
            </tbody>
        </Table>
    </>
    )
}
