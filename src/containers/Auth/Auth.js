import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionCreators from "../../store/actions/";
import classes from "./Auth.css";

class Auth extends Component {
	state = {
		isSignup: true,
		controls: {
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Email address"
				},
				value: "",
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Password"
				},
				value: "",
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false,
			}
		}
	}

	componentDidMount() {
		if(!this.props.building && this.props.authRedirectPath !== "/") {
			this.props.onSetAuthRedirectPath();
		}
	}

	checkValidity(value, rules) {
		let isValid = true;
		if(rules.required) {
			isValid = value.trim() !== "" && isValid;
		}
		if(rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
	  }
		return isValid;
	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true
			}
		};
		this.setState({controls: updatedControls});
	}

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
	}

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return {isSignup: !prevState.isSignup};
		});
	}

	render() {
		const formElementsArray = [];
		for(let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}
		let form = formElementsArray.map(formElement => (
			<Input
				key={formElement.id}
				label={formElement.id}
				elementType={formElement.config.elementType} 
				elementConfig={formElement.config.elementConfig} 
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) => this.inputChangedHandler(event, formElement.id)} />
		))
		if(this.props.loading) {
			form = <Spinner />
		}
		let authRedirect = null;
		if(this.props.isAuth) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />;
		}
		return (
			<div className={classes.Auth}>
				{authRedirect}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success">SUBMIT</Button>
					{this.props.error ? <p>{this.props.error.message}</p> : null}
				</form>
				<Button 
					clicked={this.switchAuthModeHandler} 
					btnType="Danger">
						SWITCH TO {this.state.isSignup 
							? <span style={{color: "blue"}}>SIGNIN</span> 
							: <span style={{color: "salmon"}}>SIGNUP</span>}
				</Button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuth: state.auth.token !== null,
		building: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignup) => dispatch(actionCreators.auth(email, password, isSignup)),
		onSetAuthRedirectPath: () => dispatch(actionCreators.setAuthRedirectPath("/"))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);