import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItems.css";

const navigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<li className={classes.NavigationItem} onClick={props.closeDrawer}>
			<NavLink to="/" exact activeClassName={classes.active}>
				Burger Builder
			</NavLink>
		</li>
		{props.isAuth
		?	<li className={classes.NavigationItem} onClick={props.closeDrawer}>
				<NavLink to="/orders" activeClassName={classes.active}>
					Orders
				</NavLink>
			</li>
		: null
		}
		{!props.isAuth
		?	<li className={classes.NavigationItem} onClick={props.closeDrawer}>
				<NavLink to="/auth" activeClassName={classes.active}>
					Signup/Login
				</NavLink>
			</li>
		:	<li className={classes.NavigationItem} onClick={props.closeDrawer}>
				<NavLink to="/logout" activeClassName={classes.active}>
					Logout
				</NavLink>
			</li>
		}
	</ul>
)

export default navigationItems;