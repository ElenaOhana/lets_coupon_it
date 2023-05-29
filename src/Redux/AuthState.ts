import jwtDecode from "jwt-decode";
import {createStore} from "redux";
import notificationService from "../Services/NotificationService";
import { AdministratorModel } from "../Models/AdministratorModel";
import { CompanyModel } from "../Models/CompanyModel";
import { CustomerModel } from "../Models/CustomerModel";
import { UserModel } from "../Models/UserModel";

export class AuthState{
    public token: string;
    public userAdmin: AdministratorModel;
    public userCompany: CompanyModel;
    public userCustomer: CustomerModel;
    public user: UserModel;

    constructor(){
        const storedToken = localStorage.getItem("token");
        if(storedToken){
           try{
                this.token = storedToken;
                this.user =  {...jwtDecode(storedToken )};
        
                //  DOES NOT NEED
                /* if(this.userAdmin = {...jwtDecode(storedToken)}){
                    this.userAdmin = {...jwtDecode(storedToken)};
                    console.log("FROM AUTHSTORE userAdmin: ", this.userAdmin);
                }
                if(this.userCompany = {...jwtDecode(storedToken)}){
                    this.userCompany = {...jwtDecode(storedToken)};
                    console.log("FROM AUTHSTORE userCompany: ", this.userCompany);
                }
                if(this.userCustomer = {...jwtDecode(storedToken)}){
                    this.userCustomer = {...jwtDecode(storedToken)};
                    console.log("FROM AUTHSTORE userCustomer: ", this.userCustomer);
                } *///  DOES NOT NEED

           } catch(err: any){
                notificationService.error("error decoding token!")
            }
        }
    }
}

export enum AuthActionTypes{
    Login,
    Logout
    /* Register, */
}

export interface AuthAction{
    type: AuthActionTypes,
    payload?: any
}

export function loginAction(token: string){
    return {type: AuthActionTypes.Login, payload: token}
}
export function logoutAction(){
    return {type: AuthActionTypes.Logout}
}
/* export function registerAction(token:string){
    return {type: AuthActionTypes.Register, payload: token}
}
 */

export function reducer(currentState = new AuthState(), action:AuthAction){
    const newState ={...currentState};

    switch(action.type){
        case AuthActionTypes.Login:
            newState.token = action.payload;
            newState.user = jwtDecode(newState.token);
            localStorage.setItem("token", newState.token);

            //  DOES NOT NEED
            /* if( newState.userAdmin = jwtDecode(newState.token)){
                newState.userAdmin = jwtDecode(newState.token);
            }
            if(newState.userCompany = {...jwtDecode(newState.token)}){
                newState.userCompany = {...jwtDecode(newState.token)};
            }
            if(newState.userCustomer = {...jwtDecode(newState.token)}){
                newState.userCustomer = {...jwtDecode(newState.token)};
            } *///  DOES NOT NEED
        break;

        case AuthActionTypes.Logout:
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token");

            //  DOES NOT NEED
          /*   newState.userAdmin = null;
            newState.userCompany = null;
            newState.userCustomer = null; */
            //  DOES NOT NEED

        break;

        /*  case AuthActionTypes.Register: // payload is token!
                newState.token = action.payload;
                newState.user = jwtDecode(newState.token);
                localStorage.setItem("token", newState.token);
        break; */
    }
    return newState;
}

export const authStore = createStore(reducer);


