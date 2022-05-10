import { Dropdown } from 'react-bootstrap';
import React from 'react';

const { ipcRenderer } = window;

export default function Task(props) {
    const runTask = async (e) => {
        const task = {tasks: [{taskName: props.item.taskName, profileName: props.item.profileName, walletName: props.item.walletName}]};
        const dataToSend = {wallets: props.wallets, profiles: props.profiles, tasks: task};
        ipcRenderer.invoke('runTasks', dataToSend);
        e.preventDefault();
    }

    const deleteTask = async (e) => {
        let newTasks = props.tasks;

        // change the way tasks are stored to the same way as wallets and get rid of tasks.tasks array, keep it as tasks obj
        // delete newTasks[props.item.taskName];
    
        ipcRenderer.invoke('updateTasks', {wallets: props.wallets, profiles: props.profiles, tasks: newTasks}).then((result) => {
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
                            <Dropdown.Item onClick={() => runTask()}>
                                Run
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => deleteTask()}>
                                Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
        </>
    )
}