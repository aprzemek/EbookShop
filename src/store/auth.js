import Axios from "axios";

const loginUrl = "https://localhost:5001/api/auth";

export default {
    namespaced: true,
    state: {
        authenticated: false
    },
    mutations: {
        setAuthenticated(state) {
            state.authenticated = true;
        }
    },
    actions: {
        async authenticate(context, credentials) {
            let response = await Axios.post(loginUrl, credentials);
            if (response.data.success == true) {
                context.commit("setAuthenticated");
            }
        }
    },
};
