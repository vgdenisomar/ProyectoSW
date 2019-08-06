import React, { Component } from 'react';
import '../products/products.css'
import { Link } from 'react-router-dom';
import { IoIosCloseCircleOutline, IoIosInformationCircleOutline, IoIosSync, IoMdAddCircle } from 'react-icons/io';
import { paxios } from '../../../../Utilities';
import Button from '../../../Common/Btns/Buttons';

import '../../../../index.css'
/*
  module.exports = class Login .....
*/
export default class Login extends Component {


    constructor() {
        super();
        this.state = {
            token: '',
            things: [],
            hasMore: true,
            page: 1,
            intervalIsSet: false,
            itemsToLoad: 10
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }


    onChangeHandler(e) {
        const { name, value } = e.target;
        //validar
        this.setState({ ...this.state, [name]: value });
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
        const { match: { params } } = this.props;
        const uri = `/api/pedidos/detalle/${params.id}`;
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

    pagar = () => {
        const { token } = this.state;
        const { match: { params } } = this.props;
        const id = params.id;
        fetch('http://sustento.000webhostapp.com/comprobar2.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                codigo: token,
                secret: "HS4OI2GFLJ54EJ7X"
            })

        })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson === 'Data Matched') {

            paxios.put(`/api/pedidos/pagar`, { id })
            .then(({ data }) => {
                console.log("Pagado");
                this.props.history.push("/entregar");
            })
            .catch((error) => {
                console.log(error);
                this.setState({ error: "Error al crear nuevo Thing" });
            })
          }
          else{
              console.log("error");
          }
        })
        .catch((error)=>{
        console.error(error);
        
    })

}

    render() {
        const { things } = this.state;
        return (
            <section>
                <h1>Factura</h1>
                <section className="main fix640" className="overr2">
                    {things.length <= 0
                        ? 'Cargando'
                        : things.map((dat) => (
                            <div className="thingItem_man" key={dat._id}>
                                <span>{dat.nombre_Product}</span>
                            </div>

                        ))}
                    <input onChange={this.onChangeHandler} value={this.state.token} className="codigo" name="token" maxLength="6" placeholder="Codigo"></input>
                    <Button
                        caption="Pagar"
                        onClick={this.pagar}
                        customClass="primary"
                    />
                </section>
            </section>
        );
    }
}
