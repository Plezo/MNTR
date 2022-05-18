import React from 'react'
import { IconContext } from 'react-icons';

import * as BsIcons from 'react-icons/bs';
import './Topbar.css';

const { ipcRenderer } = window;

export default function Topbar() {

    const onExitClick = (e) => {
        ipcRenderer.invoke('close');
        e.preventDefault();
    }

    const onMinimizeClick = (e) => {
        // window.minimize();
        ipcRenderer.invoke('minimize');
        e.preventDefault();
    }

    return (
    <>
        <IconContext.Provider value={{ color: '#fff' }}>
            <div className='topBar'>
                <button className='iconBtn' onClick={(e) => onMinimizeClick(e)} >
                    <BsIcons.BsDashLg />
                </button>
                <button className='iconBtn' onClick={(e) => onExitClick(e)} >
                    <BsIcons.BsXLg />
                </button>
            </div>
        </IconContext.Provider>
    </>
    )
}
