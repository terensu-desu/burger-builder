import axios from "axios";

const instance = axios.create({
	baseURL: "https://burger-builder-ef58a.firebaseio.com/"
});

export default instance;