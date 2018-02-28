// import * as actionTypes from "./actions";

const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0
	},
	totalPrice: 4
};

const INGREDIENTS_PRICING = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case "ADD_INGREDIENT":
			return {
				...state,
				ingredients: { 
					...state.ingredients,
					[action.ingredient]: state.ingredients[action.ingredient] + 1
				},				
				totalPrice: state.totalPrice + INGREDIENTS_PRICING[action.ingredient]
			};
		case "REMOVE_INGREDIENT":
			return {
				...state,
				ingredients: { 
					...state.ingredients,
					[action.ingredient]: state.ingredients[action.ingredient] - 1
				},				
				totalPrice: state.totalPrice + INGREDIENTS_PRICING[action.ingredient]
			};
		default:
			return state;
	}
}

export default reducer;