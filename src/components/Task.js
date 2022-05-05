import { Dropdown } from 'react-bootstrap';
import React from 'react';

export default function Task(props) {
    return (
        <>
            <tr>
                <td>
                    {props.item.taskName}
                </td>
                <td>
                    {props.item.profileName}
                </td>
                <td>
                    {props.item.walletName}
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