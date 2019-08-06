// ES6
// ES5 var React = require('react');
// var Component = React.Component;
import React, { Component } from 'react';
import Button from '../../../Common/Btns/Buttons';
import Campo from '../../../Common/Campo/Campo';
import { paxios } from '../../../../Utilities';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
/*
  module.exports = class Login .....
*/
export default class DetailUpdate extends Component {
  constructor() {
    super();
    //definición del estado inicial
    this.state = {
      nombre_Product:'',
      descripcion: '',
      Precio_Original:0,
      Precio_Oferta:0,
      Cantidad_Producto:0,
      imagen:'',
      Fecha_Vencimiento_Prod:Date,
      error: false
    };
    //Para el autobinding
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSaveBtnClick = this.onSaveBtnClick.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }


  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Notificacion",
      message: "Producto Modificado!",
      type: "success",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  componentDidMount(){
  const { match: {params}} = this.props;
  const uri = `/api/Products/${params.id}`;
  paxios.get(uri)
  .then(
    ({data})=>{
      this.setState({...data});
    }
  )
  .catch(
    (err)=>{
      this.setState({error:"No se pudo cargar el Producto"});
    }
  );
}

  onChangeHandler(e){
    const {name, value} = e.target;
    //validar
    this.setState({...this.state,[name]:value});
  }
  onSaveBtnClick(e) {
    const { nombre_Product,descripcion,Precio_Original,Precio_Oferta,Cantidad_Producto,Fecha_Vencimiento_Prod, _id, imagen} = this.state;
    paxios.put(`/api/products/${_id}`, { nombre_Product,descripcion,Precio_Original,Precio_Oferta,Cantidad_Producto,Fecha_Vencimiento_Prod, imagen})
      .then(({ data }) => {
        this.addNotification();
        window.setTimeout(() => {
          this.props.history.push("/mantenimiento");
       }, 1000)
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Error al actualizar el Producto" });
      })
  }

  render(){
    return (
      <section>
      <h1>Modificar Producto </h1>
      <ReactNotification ref={this.notificationDOMRef} />
        <section className="main fix640 overr2 top1">
        <Campo
            caption="Nombre Producto"
            value={this.state.nombre_Product}
            name="nombre_Product"
            onChange={this.onChangeHandler}
          />
         <Campo
          caption="Descripcion del Producto"
          value={this.state.descripcion}
          name="descripcion"
          onChange={this.onChangeHandler}
         />
           <Campo
          caption="URL de imagen"
          value={this.state.imagen}
          name="imagen"
          onChange={this.onChangeHandler}
         />
          <Campo
            caption="Precio Original"
            value={this.state.Precio_Original}
            name="Precio_Original"
            onChange={this.onChangeHandler}
          />
          <Campo
           caption="Precio de Oferta"
           value={this.state.Precio_Oferta}
           name="Precio_Oferta"
           onChange={this.onChangeHandler}
          />
          <Campo
           caption="Cantidad_Producto"
           value={this.state.Cantidad_Producto}
           name="Cantidad_Producto"
           onChange={this.onChangeHandler}
          />
          <Campo
           caption="Fecha de Vencimiento"
           type="Date"
           value={this.state.Fecha_Vencimiento_Prod}
           name="Fecha_Vencimiento_Prod"
           onChange={this.onChangeHandler}
          />
          {(this.state.error && true)?(<div className="error">{this.state.error}</div>):null}
          <section className="action">
              <Button
                caption="Modificar Producto"
                onClick={this.onSaveBtnClick}
                customClass="primary"
              />
              <br></br>

          </section>
        </section>
      </section>
    );
  }
}
