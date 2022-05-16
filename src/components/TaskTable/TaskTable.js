import React from 'react'

import { Table } from 'react-bootstrap';

import Task from '../Task/Task'

export default function TaskTable(props) {

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
                {Object.keys(props.tasks).map((taskName) => {
                    return (
                        <Task key={taskName} task={props.tasks[taskName]} setTasks = {props.setTasks} wallets={props.wallets} profiles={props.profiles}/>
                    )
                })}
            </tbody>
        </Table>
    </>
    )
}
