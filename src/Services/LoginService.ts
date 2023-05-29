import axios from "axios";
import appConfig from "../Utils/Config";
import { ClientType, CredentialsModel } from "../Models/CredentialsModel";
import { authStore, loginAction, logoutAction } from "../Redux/AuthState";

class LoginService{
    
    public async login(cred:CredentialsModel, type: ClientType){
        const response = axios.post<string>(appConfig.authUrl +"login/" +type, cred);
        /* const token = (await response).data; */
        const token = (await response).data;
        authStore.dispatch(loginAction(token));//Write to authStore
        //console.log(token);
    }

    public async logout(){
        authStore.dispatch(logoutAction());
    }


    // blank for register in future
   /*  public async register(userModel:UserModel){

    } */
}

const loginService = new LoginService();
export default loginService;