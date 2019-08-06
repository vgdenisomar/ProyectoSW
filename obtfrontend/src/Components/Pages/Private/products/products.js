import React, { Component } from 'react';
import './products.css'
import { Link } from 'react-router-dom';
import { IoIosAdd, IoIosCart, IoIosSync, IoMdAddCircle } from 'react-icons/io';
import { paxios } from '../../../../Utilities';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
/*
  module.exports = class Login .....
*/
export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      things: [],
      hasMore: true,
      page: 1,
      intervalIsSet: false,
      itemsToLoad: 10
    }
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 2000);
      this.setState({ intervalIsSet: interval });
    }
  }

  
  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Notificacion",
      message: "Producto Agregado!",
      type: "success",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }
  getDataFromDb = () => {
    const uri = `/api/Products`;
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

  register = (codProd, nombre_Product, proveedor, Precio_Oferta) => {
    paxios.post('/api/car', { codProd, nombre_Product, proveedor, Precio_Oferta})
      .then(({ data }) => {
        console.log("agregado");
        this.addNotification();
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Error al crear nuevo Thing" });
      })
  }

  render() {
    const { things } = this.state;
    return (
      <section>
        <h1>Sustento
            <Link to="detailcar">
            <IoIosCart size="1.2em" />
          </Link>
        </h1>
        <section className="overr">
          {things.length <= 0
            ? 'Cargando'
            : things.map((dat) => (
              <div className="thingItem" key={dat._id}>
                <img className="imagen" src={dat.imagen}></img>
                <div className="thingItem2" key={dat._id}>
                <ReactNotification ref={this.notificationDOMRef} />
                  <span className="iconoadd"><IoIosAdd className="iconoadd2" onClick={this.register.bind(this, dat._id, dat.nombre_Product,dat.by,dat.Precio_Oferta)} size="2em" /></span>

                  <div className="span">
                    <span> {dat.nombre_Product}</span>
                  </div>
                  
                  <div className="span">
                    <span> {dat.Descripcion}</span>
                  </div>


                  <div className="span">
                    <span>Precio Original: {dat.Precio_Original}</span>
                  </div>

                  <div className="span">
                    <span>Precio Oferta: {dat.Precio_Oferta}</span>
                  </div>

                  <div className="span">
                    <span>Cantidad: {dat.Cantidad_Producto}</span>
                  </div>

                  <div className="span">
                    <span>Descripcion: {dat.descripcion}</span>
                  </div>




                </div>
              </div>
            ))}
        </section>

      </section>
    );
  }
}