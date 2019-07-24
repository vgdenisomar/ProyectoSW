import React from 'react';
import { Link } from 'react-router-dom';
// https://react-icons.netlify.com/
import { IoIosLogIn, IoIosHome, IoIosKey, IoIosToday, IoIosList, IoIosDoneAll, IoIosPerson } from 'react-icons/io';
import './NavBar.css';

const NavItem = ({ to, children, ...rest }) => {
  return (
    <Link to={to}>{children}</Link>
  );
};

export default ({auth, unSetAuth})=>{
  console.log(auth);
  if(auth.logged) {
    return (
      false
    )
  }
  else{
    return(
      <nav>
      <NavItem to="/"><IoIosList/>&nbsp;Productos</NavItem>
      <NavItem to="/main"><IoIosDoneAll />&nbsp;Donaciones</NavItem>
      <NavItem to="/backlog"><IoIosPerson/>&nbsp;Perfil</NavItem>
    </nav>
    )
  }
}
