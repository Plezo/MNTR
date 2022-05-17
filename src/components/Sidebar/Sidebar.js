import React from 'react'
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';

import './Sidebar.css'

export default function Sidebar() {
  return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
            <nav className='sideBar'>
                <ul className='sidebarList'>
                    <li className='appName'>
                        MNTR
                    </li>

                    {SidebarData.map((item) => {
                        return (
                            <li key={item.title} >
                                <Link to={item.path} className='sidebarLink'>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
      </>
  )
}
