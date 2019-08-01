import React, { Component } from 'react';
import '../products/products.css'
import { Link } from 'react-router-dom';
import { IoIosAdd, IoIosCart, IoIosSync, IoMdAddCircle, IoIosInformationCircleOutline} from 'react-icons/io';
import { paxios } from '../../../../Utilities';
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

  register = (codProd, nombre_Product) => {
    paxios.post('/api/car', { codProd, nombre_Product })
      .then(({ data }) => {
        console.log("agregado");
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
            <Link to="prdadd">
            <IoIosAdd size="1.2em" />
          </Link>
        </h1>
        <section className="overr">
          {things.length <= 0
            ? 'Cargando'
            : things.map((dat) => (
              <div className="thingItem_man" key={dat._id}>
              <span> {dat.nombre_Product}</span>
              <span className="updateThing">
                <Link to={`/prdUpdate/${dat._id}`}>
                  <IoIosInformationCircleOutline size="2em"/>
                </Link>
              </span>
            </div>

            ))}
        </section>

      </section>
    );
  }
}
