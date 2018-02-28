import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.css";

class Layout extends Component {
	state = {
		showSideDrawer: false
	}

	sideDrawerToggleHandler = () => {
		this.setState(prevState => { 
			return {showSideDrawer: !prevState.showSideDrawer}
		});
	}

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	}

	render() {
		return (
			<Aux>
				<Toolbar toggleSideDrawer={this.sideDrawerToggleHandler} />
				<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		)
	}
}

export default Layout;