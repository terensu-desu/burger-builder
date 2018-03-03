import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import asyncComponent from "./hoc/asyncComponent";
import * as actionCreators from "./store/actions/";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout")
});
const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders")
});
const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth")
});

class App extends Component {
  componentWillMount() {
    this.props.onAuthCheckState();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route exact path="/" component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/logout" component={Logout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/auth" component={asyncAuth} />
          <Route exact path="/" component={BurgerBuilder}/>
          <Redirect to="/" />
        </Switch>
      );
    };
    return (
      <Router>
        <Layout>
          {routes}
        </Layout>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckState: () => dispatch(actionCreators.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
