import React, { Component } from 'react';
import './products.css'
import {Link} from 'react-router-dom';
import { IoIosAdd,IoIosCart, IoIosSync, IoMdAddCircle } from 'react-icons/io';
import { paxios } from '../../../../Utilities';
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
    const uri = `/api/Products`;
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

  register=(codProd,nombre_Product)=>{
    paxios.post('/api/car', { codProd, nombre_Product })
      .then(({ data }) => {
        console.log("agregado");
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
            <Link to="detailcar">
              <IoIosCart size="1.2em"/>
            </Link>
            </h1>
            {things.length <= 0
            ? 'Cargando'
            : things.map((dat) => (
                <div className="thingItem" key={dat._id}>
                  <span> {dat.nombre_Product}</span>
                    <IoIosAdd onClick={this.register.bind(this,dat._id, dat.nombre_Product)} size="2em"/>
                </div>
              ))}
          </section>
        );
}
}