import * as actionTypes from "../actions/actionTypes";

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
	building: false
};

const INGREDIENTS_PRICING = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: { 
					...state.ingredients,
					[action.ingredient]: state.ingredients[action.ingredient] + 1
				},
				totalPrice: state.totalPrice + INGREDIENTS_PRICING[action.ingredient],
				building: true
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: { 
					...state.ingredients,
					[action.ingredient]: state.ingredients[action.ingredient] - 1
				},				
				totalPrice: state.totalPrice + INGREDIENTS_PRICING[action.ingredient],
				building: true
			};
		case actionTypes.SET_INGREDIENTS:
			return {
				...state,
				ingredients: {
					salad: action.ingredients.salad,
					bacon: action.ingredients.bacon,
					cheese: action.ingredients.cheese,
					meat: action.ingredients.meat
				},
				totalPrice: 4,
				error: false,
				building: false
			};
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true
			};
		default:
			return state;
	}
};

export default reducer;