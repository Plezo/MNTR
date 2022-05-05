import { Dropdown, Form } from 'react-bootstrap';
import React from 'react';
import { useState } from 'react';

export default function Task(props) {

    return (
        <>
            <tr key={props.item.taskName}>
                <td>
                    {props.taskName}
                </td>
                <td>
                    {props.profileName}
                </td>
                <td>
                    {props.walletName}
                </td>
                <td>
                    temp
                </td>
                <td>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary">
                        Actions
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item>Run</Dropdown.Item>
                            <Dropdown.Item>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
        </>
    )
}