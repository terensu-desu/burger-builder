import React, { Component } from "react";
import axios from "../../axios-orders";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchaseable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount() {
		axios.get("/ingredients.json")
			.then(res => {
				this.setState({ingredients: res.data});
			})
			.catch(err => {
				this.setState({error: true});
			});
	}

	addIngredientHandle = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandle = (type) => {
		const oldCount = this.state.ingredients[type];
		if(oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		});
		this.updatePurchaseState(updatedIngredients);
	}

	updatePurchaseState = (updatedIngredients) => {
		const ingredients = {
			...updatedIngredients
		};
		const sum = Object.keys(ingredients).map(igKey => {
			return ingredients[igKey]
		}).reduce((total, el) => {
			return total + el;
		}, 0);
		this.setState({ purchaseable: sum > 0 });
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	}

	purchaseContinueHandler = () => {
			const queryParams = [];
			for(let i in this.state.ingredients) {
				queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
			}
			queryParams.push("price=" + this.state.totalPrice);
			const queryString = queryParams.join("&");
			this.props.history.push({
				pathname: "/checkout",
				search: "?" + queryString,
			});
	}

	render() {
		const disabledInfo = { ...this.state.ingredients };
		for(let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0; //return true or false
		}
		let burger = this.state.error 
			? <p>Ingredients can't be loaded!</p> 
			: <Spinner/>;
		let ordersummary = null;
		if(this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls 
						price={this.state.totalPrice}
						ingredientAdded={this.addIngredientHandle} 
						ingredientRemoved={this.removeIngredientHandle} 
						disabled={disabledInfo} 
						purchaseable={this.state.purchaseable} 
						ordered={this.purchaseHandler} />
				</Aux>
			);
			ordersummary = <OrderSummary 
				ingredients={this.state.ingredients}
				cancel={this.purchaseCancelHandler} 
				continue={this.purchaseContinueHandler}
				totalPrice={this.state.totalPrice} />;
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

export default withErrorHandler(BurgerBuilder, axios);