import React from 'react';
import './Sidebar.css';
import DrawerToggleButton from './Objects/DrawerToggleButton'
import GrayoutCurtain from './Objects/GrayoutCurtain';

const Sidebar = props => {
  let sidebarClasses = 'sidebar';
  if(props.show) {
    sidebarClasses = 'sidebar open';
  }
  return (
      <nav className={sidebarClasses}>
        <ul className="sidebar-links">
          <li><a href="/">Test1</a></li>
          <li><a href="/">Test2</a></li>
          <li><a href="/">Test3</a></li>
        </ul>
      </nav>
  );
};

export default Sidebar;
