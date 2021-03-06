import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import asyncComponent from './hoc/asyncComponent/asycComponent'
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Orders = React.lazy(()=> import('./containers/Orders/Orders'));
const Auth = React.lazy(()=> import('./containers/Auth/Auth'));
const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout')
})

class App extends Component {
  componentDidMount (){
    this.props.onTryAutoSignUp();
  };

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" render={()=>(
            <Suspense fallback={<div>Loading...</div>}>
              <Auth/>
            </Suspense>
          )} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )
    if(this.props.isAuthenticated){
      routes =(
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" render={()=>(
            <Suspense fallback={<div>Loading...</div>}>
              <Orders/>
            </Suspense>
          )} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" render={()=>(
            <Suspense fallback={<div>Loading...</div>}>
              <Auth/>
            </Suspense>
          )} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
};
const mapStateToProps = state =>{
  return{
    isAuthenticated : state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onTryAutoSignUp : ()=> dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
