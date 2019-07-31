// ES6
// ES5 var React = require('react');
// var Component = React.Component;
import React, { Component } from 'react';
import Button from '../../../Common/Btns/Buttons';
import Campo from '../../../Common/Campo/Campo';
import { paxios } from '../../../../Utilities';

/*
  module.exports = class Login .....
*/
export default class DetailUpdate extends Component {
  constructor() {
    super();
    //definición del estado inicial
    this.state = {
      descripcion: '',
      error: false
    };
    //Para el autobinding
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSaveBtnClick = this.onSaveBtnClick.bind(this);
  }
  onChangeHandler(e){
    const {name, value} = e.target;
    //validar
    this.setState({...this.state,[name]:value});
  }
  onSaveBtnClick(e){
    const {nombre_Product,descripcion,Precio_Original,Precio_Oferta,Cantidad_Producto,Fecha_Vencimiento_Prod} = this.state;
    paxios.post('/api/Products', {nombre_Product,descripcion,Precio_Original,Precio_Oferta,Cantidad_Producto,Fecha_Vencimiento_Prod })
    .then(({data})=>{
      this.props.history.push("/mantenimiento");
    })
    .catch((error)=>{
      console.log(error);
      this.setState({error:"Error al Obtener el Producto. Intente nuevamente."})
    })
  }

  render(){
    return (
      <section>
      <h1>{this.props.match.params.id} </h1>
        <section className="main fix640">
        <Campo
            caption="Nombre Producto"
            value={this.state.nombre_Product}
            name="name"
            onChange={this.onChangeHandler}
          />
         <Campo
          caption="Descripcion del Producto"
          value={this.state.descripcion}
          name="descripcion del producto"
          onChange={this.onChangeHandler}
         />
          <Campo
            caption="Precio Original"
            value={this.state.Precio_Original}
            name="precio original"
            onChange={this.onChangeHandler}
          />
          <Campo
           caption="Precio de Oferta"
           value={this.state.Precio_Oferta}
           name="precio de oferta"
           onChange={this.onChangeHandler}
          />
          <Campo
           caption="Cantidad_Producto"
           value={this.state.Cantidad_Producto}
           name="cantidad del producto"
           onChange={this.onChangeHandler}
          />
          <Campo
           caption="Fecha de Vencimiento"
           type="Date"
           value={this.state.Fecha_Vencimiento_Prod}
           name="Fecha de Vencimiento"
           onChange={this.onChangeHandler}
          />
          {(this.state.error && true)?(<div className="error">{this.state.error}</div>):null}
          <section className="action">
              <Button
                caption="Modificar Producto"
                onClick={this.onSaveBtnClick}
                customClass="primary"
              />
          </section>
        </section>
      </section>
    );
  }
}
