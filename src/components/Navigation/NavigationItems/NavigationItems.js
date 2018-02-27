import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItems.css";

const navigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<li className={classes.NavigationItem}>
			<NavLink to="/" exact activeClassName={classes.active}>
				Burger Builder
			</NavLink>
		</li>
		<li className={classes.NavigationItem}>
			<NavLink to="/orders" activeClassName={classes.active}>
				Orders
			</NavLink>
		</li>
	</ul>
)

export default navigationItems;