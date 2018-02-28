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

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount() {
		/*axios.get("/ingredients.json")
			.then(res => {
				this.setState({ingredients: res.data});
			})
			.catch(err => {
				this.setState({error: true});
			});*/
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
		this.setState({ purchasing: true });
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	}

	purchaseContinueHandler = () => {
		this.props.history.push("/checkout");
	}

	render() {
		const disabledInfo = { ...this.props.ingredients };
		for(let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0; //return true or false
		}
		let burger = this.state.error 
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
						ordered={this.purchaseHandler} />
				</Aux>
			);
			ordersummary = <OrderSummary 
				ingredients={this.props.ingredients}
				cancel={this.purchaseCancelHandler} 
				continue={this.purchaseContinueHandler}
				totalPrice={this.props.totalPrice} />;
		}
		if(this.state.loading) {
			ordersummary = <Spinner />
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
		ingredients: state.ingredients,
		totalPrice: state.totalPrice
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAddIngredient: (ingredient) => dispatch({type: "ADD_INGREDIENT", ingredient: ingredient}),
		onRemoveIngredient: (ingredient) => dispatch({type: "REMOVE_INGREDIENT", ingredient: ingredient})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));