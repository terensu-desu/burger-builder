import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

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
				<Toolbar 
					toggleSideDrawer={this.sideDrawerToggleHandler} 
					isAuth={this.props.isAuthenticated} />
				<SideDrawer 
					open={this.state.showSideDrawer} 
					closed={this.sideDrawerClosedHandler} 
					isAuth={this.props.isAuthenticated} />
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		)
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

export default withRouter(connect(mapStateToProps)(Layout));