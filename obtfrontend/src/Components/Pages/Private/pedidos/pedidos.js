import React, { Component } from 'react';
import '../products/products.css'
import { Link } from 'react-router-dom';
import { IoIosCloseCircleOutline, IoIosInformationCircleOutline, IoIosCheckmarkCircleOutline, IoIosExit } from 'react-icons/io';
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
    const uri = `/api/pedidos`;
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
  logout(e){
    localStorage.clear();
    window.location.href = '/';
}

  aceptar=(id)=>{
    paxios.put(`/api/pedidos/aceptar`,{id})
    .then(({ data }) => {
      console.log("Enviado");
    })
    .catch((error) => {
      console.log(error);
      this.setState({ error: "Error al crear nuevo Thing" });
    })
  }

  cancelar=(id)=>{
    paxios.put(`/api/pedidos/cancelar`,{id})
    .then(({ data }) => {
      console.log("Enviado");
    })
    .catch((error) => {
      console.log(error);
      this.setState({ error: "Error al crear nuevo Thing" });
    })
  }


    render(){
        const { things } = this.state;
        return (
          <section>
            <h1>Sustento
            <Link>
            <IoIosExit onClick={this.logout} size="1.2em" />
          </Link>
            </h1>
            <section className="overr2">
          {things.length <= 0
            ? 'No tiene ningun pedido'
            : things.map((dat) => (
              <div className="thingItem_man" key={dat._id}>
              <span>Nuevo pedido numero {dat.name}</span>
              <span className="updateThing">
                <Link to={`/detallePedido/${dat._id}`}>
                  <IoIosInformationCircleOutline size="2em"/>
                </Link>
              </span>
              <span className="updateThing">
                  <IoIosCheckmarkCircleOutline className="iconoadd2" onClick={this.aceptar.bind(this, dat._id)}size="2em"/>
              </span>
              <span className="updateThing">
                  <IoIosCloseCircleOutline  className="iconoadd2" onClick={this.cancelar.bind(this, dat._id)} size="2em"/>
              </span>
            </div>


            ))}
        </section>
          </section>
        );
}
}
