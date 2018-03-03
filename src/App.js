import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import * as actionCreators from "./store/actions/";

class App extends Component {
  componentWillMount() {
    this.props.onAuthCheckState();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route exact path="/" component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/logout" component={Logout} />
          <Route path="/orders" component={Orders} />
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
