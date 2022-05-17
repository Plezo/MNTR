import React from 'react'
import { IconContext } from 'react-icons';

import * as BsIcons from 'react-icons/bs';

import './Topbar.css';

export default function Topbar() {

    const onExitClick = (e) => {
        window.close();
        e.preventDefault();
    }

    return (
    <>
        <IconContext.Provider value={{ color: '#fff' }}>
            <div className='topBar'>
                <button className='iconBtn'>
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
