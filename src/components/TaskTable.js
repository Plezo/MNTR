import React from 'react'

import { Table } from 'react-bootstrap';

import Task from './Task'

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
                {props.tasks.tasks.map((item) => {
                    return (
                        <Task key={item.taskName} item={item} wallets={props.wallets} profiles={props.profiles}/>
                    )
                })}
            </tbody>
        </Table>
    </>
    )
}
