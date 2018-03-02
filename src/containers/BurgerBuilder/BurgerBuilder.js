import React, { Component } from "react";
import axios from "../../axios-orders";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";

import * as actionCreators from "../../store/actions";

class BurgerBuilder extends Component {
	state = {
		purchasing: false
	}

	componentWillMount() {
		this.props.onInitIngredients();
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients).map(igKey => {
			return ingredients[igKey]
		}).reduce((total, el) => {
			return total + el;
		}, 0);
		return sum > 0;
	}

	purchaseHandler = () => {
		if(this.props.isAuth) {
			this.setState({ purchasing: true });
		} else {
			this.props.onSetAuthRedirectPath("/checkout");
			this.props.history.push("/auth");
		}
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	}

	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push("/checkout");
	}

	render() {
		const disabledInfo = { ...this.props.ingredients };
		for(let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0; //return true or false
		}
		let burger = this.props.error 
			? <p>Ingredients can't be loaded!</p> 
			: <Spinner/>;
		let ordersummary = null;
		if(this.props.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ingredients} />
					<BuildControls 
						price={this.props.totalPrice}
						ingredientAdded={this.props.onAddIngredient} 
						ingredientRemoved={this.props.onRemoveIngredient} 
						disabled={disabledInfo} 
						purchaseable={this.updatePurchaseState(this.props.ingredients)} 
						ordered={this.purchaseHandler}
						isAuth={this.props.isAuth} />
				</Aux>
			);
			ordersummary = <OrderSummary 
				ingredients={this.props.ingredients}
				cancel={this.purchaseCancelHandler} 
				continue={this.purchaseContinueHandler}
				totalPrice={this.props.totalPrice} />;
		}
		return (
			<Aux>
				<Modal 
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}>
					{ordersummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuth: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAddIngredient: (ingredient) => dispatch(actionCreators.addIngredient(ingredient)),
		onRemoveIngredient: (ingredient) => dispatch(actionCreators.removeIngredient(ingredient)),
		onInitIngredients: () => dispatch(actionCreators.initIngredients()),
		onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));