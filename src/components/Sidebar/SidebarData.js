import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io5';

export const SidebarData = [
  {
    title: 'Tasks',
    path: '/',
    icon: <FaIcons.FaTasks />
  },
  {
    title: 'Wallets',
    path: '/wallets',
    icon: <IoIcons.IoWalletOutline />
  },
  {
    title: 'Profiles',
    path: '/profiles',
    icon: <AiIcons.AiOutlineFolderOpen />
  }
];