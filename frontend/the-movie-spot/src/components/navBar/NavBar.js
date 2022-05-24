import React from 'react';
import menuList from './nenuList';
import { NavLink, Link } from 'react-router-dom';


import './NavBar.css'

function NavBar() {
console.log(menuList)

 const Menulist = menuList.map(({url, title}, index)=>{
     return(
         <li key={index}>
             <NavLink axact="true" to={url} activeclassname="active"> {title}</NavLink >
         </li>
     )
 })
  return (
      <nav>
          <div className='logo'>
              <Link to = '/'>
              <font>TMS</font>
              </Link>
          
          </div>
          <div className='menu_icon'>
          <i className='fa fa-bars'></i>
          </div>
         <ul className='menu_list'>{Menulist}</ul> 
      </nav>
  )
}

export default NavBar;