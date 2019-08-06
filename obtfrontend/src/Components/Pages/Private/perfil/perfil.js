import React, { Component } from 'react';
import { IoIosLogOut } from 'react-icons/io';
import Button from '../../../Common/Btns/Buttons';
import { paxios } from '../../../../Utilities';
/*
  module.exports = class Login .....
*/
export default class Login extends Component{

  
  constructor() {
    super();
    this.state = {
      things: [],
      hasMore: true,
      page: 1,
      intervalIsSet: false,
      itemsToLoad: 10
    }
  }
    logout(e){
        localStorage.clear();
        window.location.href = '/';
    }

    
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 2000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }
  getDataFromDb = () => {
    const uri = `/api/products/perfil`;
    paxios.get(uri)
      .then(
        ({ data }) => {
          console.log(data);
          this.setState(
            {
              things: data
            }
          )
        })
  };
    render(){
      const { things } = this.state;
        return (
          <section>
            <h1>Sustento</h1>
            {things.length <= 0
                        ? 'Cargando'
                        : things.map((dat) => (
                            <div key={dat._id}>
                                <h3>!Hola de nuevo {dat.name}!</h3>
                                <div className="imgqr" >
                                  <img src={dat.qr}></img>
                                </div>
                                
                            </div>
                          
                        ))}
            <div>&nbsp;

            </div>
            {(this.props.auth.logged) ? (<div className="half"><Button customClass="primary" onClick={this.logout}><IoIosLogOut/>&nbsp;Logout</Button></div>):null}
          </section>
        );
}
}