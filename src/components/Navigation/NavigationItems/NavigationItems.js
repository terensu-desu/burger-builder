import React from "react";

import classes from "./NavigationItems.css";

const navigationItems = (props) => {
	const home = true;
	return (
		<ul className={classes.NavigationItems}>
			<li className={classes.NavigationItem}>
				<a 
					href="/"
					className="active">
						Burger Builder
					</a>
			</li>
			<li className={classes.NavigationItem}>
				<a 
					href="/"
					className={home ? null : "active"}>
						Checkout
					</a>
			</li>
		</ul>
	)
};

export default navigationItems;