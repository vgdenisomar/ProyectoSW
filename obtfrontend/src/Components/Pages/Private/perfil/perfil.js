import React, { Component } from 'react';
import { IoIosLogOut } from 'react-icons/io';
import Button from '../../../Common/Btns/Buttons';
/*
  module.exports = class Login .....
*/
export default class Login extends Component{
    logout(e){
        localStorage.clear();
        window.location.href = '/';
    }
    render(){
        return (
          <section>
            <h1>Sustento</h1>
            <div>&nbsp;</div>
            {(this.props.auth.logged) ? (<div className="half"><Button customClass="primary" onClick={this.logout}><IoIosLogOut/>&nbsp;Logout</Button></div>):null}
          </section>
        );
}
}