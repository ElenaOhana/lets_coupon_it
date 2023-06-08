import axios from "axios";
import appConfig from "../Utils/Config";
import { ClientType, CredentialsModel } from "../Models/CredentialsModel";
import { authStore, loginAction, logoutAction, registerAction } from "../Redux/AuthState";
import { UserModel } from "../Models/UserModel";

class AuthService{
    
    public async login(cred:CredentialsModel, type: ClientType){
        const response = axios.post<string>(appConfig.authUrl +"login/" +type, cred);
        /* const token = (await response).data; */
        const token = (await response).data;
        authStore.dispatch(loginAction(token));//Write to authStore
        //console.log(token);
    }

    public async register(userModel:UserModel, type: ClientType){
        const response = axios.post<string>(appConfig.authUrl + "register/"+type, userModel);
        const token = (await response).data;
        authStore.dispatch(registerAction(token));// dispatch() - Write to state(AddCat Component)
    }

    public async logout(){
        authStore.dispatch(logoutAction());
    }

}

const authService = new AuthService();
export default authService;