import React, { Component } from 'react';
import './products.css'
import {Link} from 'react-router-dom';
import { IoIosAdd, IoIosSync, IoMdAddCircle } from 'react-icons/io';
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
    const uri = `/api/things`;
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

    render(){
      const { things } = this.state;
        return (
          <section>
            <h1>Sustento</h1>
            {things.length <= 0
            ? 'NO DB ENTRIES YET'
            : things.map((dat) => (
                <div className="thingItem" key={dat._id}>
                  <span> {dat.descripcion}</span>
                  <Link to={`/detail/${dat._id}`}>
            <IoIosAdd size="2em"/>
          </Link>
                </div>
              ))}
          </section>
        );
}
}