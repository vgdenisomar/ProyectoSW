import React, { Component } from 'react';
import '../products/products.css'
import {Link} from 'react-router-dom';
import { IoIosAdd,IoIosCart, IoIosSync, IoMdAddCircle } from 'react-icons/io';
import { paxios } from '../../../../Utilities';
import {MdDelete } from "react-icons/md";
/*
  module.exports = class Login .....
*/
export default class Login extends Component{

  constructor(){
    super();
    this.state={
      things:[],
      hasMore:true,
      page:1,
      intervalIsSet: false,
      itemsToLoad:10
    }}
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
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
    const uri = `/api/car`;
    paxios.get(uri)
    .then(
      ({data})=>{
        console.log(data);
        this.setState(
          {
            things:data
          }
        )
      })
  };
  
  pedido=()=>{
    paxios.post(`/api/pedidos`)
    .then(({ data }) => {
      console.log("Enviado");
    })
    .catch((error) => {
      console.log(error);
      this.setState({ error: "Error al crear nuevo Thing" });
    })
  }

  delete=(codProd)=>{
    console.log(codProd);
    paxios.delete(`/api/car/${codProd}`)
    .then(({ data }) => {
      console.log("eliminado");
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
          <Link className="linke" to="detailcar">
            <button className="buttonpagar" onClick={this.pedido}>Hacer pedido</button>
          </Link>
          </h1>
          <section className="overr">
          {things.length <= 0
          ? 'Seleccione un producto para realizar su compra'
          : things.map((dat) => (
              <div className="thingItem" key={dat._id}>
                <span> {dat.nombre_Product}</span>
                <MdDelete onClick={this.delete.bind(this,dat.codProd)} size="2em"/>
              </div>
            ))}
          </section>
         
        </section>
      );
}
}