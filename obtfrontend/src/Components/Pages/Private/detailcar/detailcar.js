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
      subtotal:0,
      isv:0,
      total:0,
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
        const { things } = this.state;
        var a=0,b=0,c=0,d=0;
        things.map((dat)=>{
          b=parseInt(dat.precio)*parseInt(dat.total);
          a+=(b);
          c=parseFloat(a*0.15).toFixed(2); 
          d=(parseFloat(a) + parseFloat(c)).toFixed(2);
          this.setState({
            subtotal:a,
            isv:c,
            total:d
          })
        })

      })
  };

  pedido=()=>{
    paxios.post(`/api/pedidos`)
    .then(({ data }) => {
      console.log("Enviado");
      this.setState({
        subtotal:0,
        isv:0,
        total:0
      })
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
          <section className="overr2">
            <div className="thingItem_man2">
              <span>Nombre</span>
              <span>Cantidad</span>
              <span>Precio</span>
              <span></span>
            </div>
          {things.length <= 0
          ? 'Seleccione un producto para realizar su compra'
          : things.map((dat)=> (
              <div className="thingItem_man" key={dat._id}>
                <span className="spandetail"> {dat.nombre_Product}</span>
                <span className=""> {dat.total}</span>
                <span className=""> {dat.precio}</span>
                <MdDelete onClick={this.delete.bind(this,dat.codProd)} size="2em"/>
              </div>
            ))}
            <div className="thingItem_man2">
                <span> Sub Total:</span>
                <span> {this.state.subtotal} </span>
           </div>

           <div className="thingItem_man2">
                <span> ISV (15%):</span>
                <span> {this.state.isv} </span>
           </div>

           <div className="thingItem_man3">
                <span>Total a Pagar:</span>
                <span> {this.state.total} </span>
           </div>

          </section>

        </section>
      );
}
}
