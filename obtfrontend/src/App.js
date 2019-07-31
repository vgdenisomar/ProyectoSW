import React , {Component} from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { setJWT, setUnAuthHandler, getLocalStorage, setLocalStorage, removeLocalStorage } from './Utilities';
import PrivateRoute from './PrivateRoute';

import NavBar from './Components/Common/NavBar/NavBar';
import Home from './Components/Pages/Public/Home/Home';
import Login from './Components/Pages/Public/Login/Login';
import Sigin from './Components/Pages/Public/Signin/Sigin';
import { AnimatedSwitch } from 'react-router-transition';
import { pageTransitions as transition, mapGlideStyles as mapStyles } from './Transition';
import LoginProveedores from './Components/Pages/Public/LoginProveedores/LoginProveedores';

import Dashboard from  './Components/Pages/Private/Dashboard/Dashboard';
import products from './Components/Pages/Private/products/products';
import donaciones from './Components/Pages/Private/donaciones/donaciones';
import perfil from './Components/Pages/Private/perfil/perfil';
import pedidos from './Components/Pages/Private/pedidos/pedidos';
import entregar from './Components/Pages/Private/entregar/entregar';
import mantenimiento from './Components/Pages/Private/mantenimiento/mantenimiento';
import detailcar from './Components/Pages/Private/detailcar/detailcar';
import prdAdd from './Components/Pages/PrivateRoute/MantenimientosProd/PrdAdd';


class App extends Component {
  constructor(){
    super();
    // verificar los datos de local storage
    this.state =  {
      "auth":( JSON.parse(getLocalStorage('auth')) ||
      {
        logged: false,
        token: false,
        user: {}
      })
    };
    this.setAuth = this.setAuth.bind(this);
    this.setUnAuth = this.setUnAuth.bind(this);

    setJWT(this.state.auth.token);
    setUnAuthHandler(this.setUnAuth);
  } // constructor


  setUnAuth(error){
    this.setAuth(false,{});
  }

  setAuth(token, user){
    setJWT(token);
    let _auth = {
      logged: token && true,
      token: token,
      user: user
    };
    setLocalStorage('auth', JSON.stringify(_auth));
    this.setState({
      auth: _auth
    });
  }

  render(){
    console.log(this.state.auth);
    return (
      <Router>
        <section className="container">
          <AnimatedSwitch
            {... transition}
            mapStyles={mapStyles}
            className="switch-wrapper"
          >
                      <Route path="/" exact render={ (props)=>(<Login {...props} auth={this.state.auth} setAuth={this.setAuth} />) } />
          <Route path="/signin"  component={Sigin} />
          <Route path="/loginproveedores"  component={LoginProveedores} />
          <PrivateRoute path="/main" auth={this.state.auth} component={Dashboard} />
          <PrivateRoute path="/productos" auth={this.state.auth} component={products} />
          <PrivateRoute path="/donaciones" auth={this.state.auth} component={donaciones} />
          <PrivateRoute path="/perfil" auth={this.state.auth}  component={perfil} />
          <PrivateRoute path="/pedidos" auth={this.state.auth}  component={pedidos} />
          <PrivateRoute path="/entregar" auth={this.state.auth}  component={entregar} />
          <PrivateRoute path="/mantenimiento" auth={this.state.auth}  component={mantenimiento} />
          <PrivateRoute path="/detailcar" auth={this.state.auth}  component={detailcar} />
          <PrivateRoute path="/PrdAdd" auth={this.state.auth}  component={prdAdd} />

            </AnimatedSwitch>
          <NavBar auth={this.state.auth} />
        </section>
      </Router>
    );
  }
}

export default App;
