import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/logout" component={Logout} />
            <Route path="/orders" component={Orders} />
            <Route exact path="/" component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
