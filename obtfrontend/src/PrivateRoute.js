import React from 'react';
import { Route , Redirect } from 'react-router-dom';

export default ({component:Component, auth, ...rest})=>{
  return (
    <Route
      {...rest}
      render={
        ( props ) => {
          console.log(auth);
          return (auth.logged) ? ( <Component {...props} auth={auth} />) : (<Redirect to={{pathname:"/", state:{ from: props.location}}} />)
        }
      }
    />
  );
}
