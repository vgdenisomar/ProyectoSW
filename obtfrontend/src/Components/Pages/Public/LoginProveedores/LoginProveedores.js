// ES6
// ES5 var React = require('react');
// var Component = React.Component;
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { naxios } from '../../../../Utilities';
import logo from '../image/logoSustento.jpeg'

import '../Login/login.css'

import Button from '../../../Common/Btns/Buttons';
import Campo from '../../../Common/Campo/Campo';
import { IoIosPersonAdd, IoIosConstruct, IoIosPerson, IoIosHome } from 'react-icons/io';

/*
  module.exports = class Login .....
*/
export default class LoginProveedores extends Component{
  constructor(){
    super();
    //definición del estado inicial
    this.state = {
      email:'',
      password:'',
      redirect:false,
      error:null
    };
    //Para el autobinding
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSiginBtnClick = this.onSiginBtnClick.bind(this);
  }

  onChangeHandler(e){
    const {name, value} = e.target;
    //validar
    this.setState({...this.state,[name]:value});
  }
  onSiginBtnClick(e){
    console.log(this.state);
    naxios.post('api/securityPro/login', this.state)
      .then( ( {data , status})=>{
        this.props.setAuth(data.token, data.user);
        this.setState({redirect:true});
        }
      )
      .catch( (err)=> {
          console.log(err)
          this.setState({"error":"Correo o contraseña incorrectas. Intente de Nuevo"})
        }
      )
    ;
  }

  render(){
    console.log(this.props);
    if(this.state.redirect){
      return (
        <Redirect
          to={(this.props.location.state) ? this.props.location.state.from.pathname : '/productos'}
        />
      );
    }
    return (
      <section>
        <h1>Proveedores
        <div>
        <a href="/" aria-current="page" class="btnicon"><IoIosHome/></a>
        </div>
        </h1>
        <img className='logo' src={logo}></img>
        <section className="main fix640">
         <Campo
          caption="Correo Electrónico"
          value={this.state.email}
          name="email"
          onChange={this.onChangeHandler}
         />
          <Campo
            caption="Contraseña"
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.onChangeHandler}
          />
          { (this.state.error && true)? (<div className="error">{this.state.error}</div>):null}
          <section className="action">
              <Button
                caption="Iniciar Sesión"
                onClick={this.onSiginBtnClick}
                customClass="primary"
              />
          </section>
        </section>
      </section>
    );
  }
}