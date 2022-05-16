import { Dropdown } from 'react-bootstrap';
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
            <tr>
                <td>
                    {props.task.taskName}
                </td>
                <td>
                    {props.task.profileName}
                </td>
                <td>
                    {props.task.walletName}
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
                            <Dropdown.Item onClick={(e) => runTask(e)}>
                                Run
                            </Dropdown.Item>
                            <Dropdown.Item onClick={(e) => deleteTask(e)}>
                                Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
        </>
    )
}