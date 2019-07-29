import React from 'react';
import { NavLink } from 'react-router-dom';
// https://react-icons.netlify.com/
import { IoIosLogIn, IoIosHome, IoIosKey, IoIosToday, IoIosList, IoIosDoneAll, IoIosPerson } from 'react-icons/io';
import './NavBar.css';

const NavItem = ({ to, children, ...rest }) => {
  return (
    <NavLink activeClassName="activeNav" className="iconotamaño" to={to}>{children}</NavLink>
  );
};

export default ({auth, unSetAuth})=>{
  console.log(auth);
  if(!auth.logged) {
    return (
      false
    )
  }
  else if(auth.user.user){
    return(
      <nav>
      <NavItem to="/pedidos"  activeClassName="active"><IoIosList/>Pedidos</NavItem>
      <NavItem to="/entregar"  activeClassName="active"><IoIosPerson/>Por entregar</NavItem>
      <NavItem to="/mantenimiento" activeClassName="active"><IoIosDoneAll />Productos</NavItem>
    </nav>
    )
  }
  else{
    return(
      <nav>
      <NavItem to="/productos"  activeClassName="active"><IoIosList/>Productos</NavItem>
      <NavItem to="/donaciones" activeClassName="active"><IoIosDoneAll />Donaciones</NavItem>
      <NavItem to="/perfil"  activeClassName="active"><IoIosPerson/>Perfil</NavItem>
    </nav>
    )
  }
}
