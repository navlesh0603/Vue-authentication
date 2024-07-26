import SignupValidations from "@/services/SignupValidations";
import { LOGIN_ACTION, SET_USER_TOKEN_DATA_MUTATION, SIGNUP_ACTION } from "@/store/storeconstants";
import axios from 'axios'; // Import axios

export default {
    async [LOGIN_ACTION](context, payload){
        const axiosInstance = axios.create();

        let postData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
        };

        let response = '';

        try {
            const response = await axiosInstance.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHipIYuiEzcO4fgY4oQRcRFu1_Hksdb6k', postData);
            console.log(response);
        } catch (err) {
            let errorMessage = SignupValidations.getErrorMessageFromCode(
                err.response.data.error.errors[0].message,
            );
            throw errorMessage;
        }

        if (response.status === 200) {
            context.commit(SET_USER_TOKEN_DATA_MUTATION, {
                email: response.data.email,
                token: response.data.idToken,
                refreshToken: response.data.refreshToken,
                expiresIn: response.data.expiresIn,
                userId: response.data.localId,
            });
        }

    },
    async [SIGNUP_ACTION](context, payload) {
        const axiosInstance = axios.create(); // Create an Axios instance

        let postData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
        };

        let response = '';

        try {
            response = await axiosInstance.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHipIYuiEzcO4fgY4oQRcRFu1_Hksdb6k', postData);
            console.log(response);
        } catch (err) {
            let errorMessage = SignupValidations.getErrorMessageFromCode(
                err.response.data.error.errors[0].message,
            );
            throw errorMessage;
        }

        if (response.status === 200) {
            context.commit(SET_USER_TOKEN_DATA_MUTATION, {
                email: response.data.email,
                token: response.data.idToken,
                refreshToken: response.data.refreshToken,
                expiresIn: response.data.expiresIn,
                userId: response.data.localId,
            });
        }
    },
};


