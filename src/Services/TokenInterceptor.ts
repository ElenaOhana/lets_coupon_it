import axios from "axios";
import {authStore} from "../Redux/AuthState";

class Interceptors{ // Intercept = ליירט
    public createInterceptors(){
        axios.interceptors.request.use( request => { //There is interceptors.response ALSO!- To check something before approve response.
            if(authStore.getState().token){//If there is a token in our global store- add it to the request.
                request.headers = { 
                    authorization: "Bearer " + authStore.getState().token //Convention
                }
            }
            return request;
        })
    }
}

export const interceptors = new Interceptors();