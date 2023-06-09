import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import BaseModalWrapper from "../../HomeArea/ModalPopup/BaseModalWrapper";
import Blessing from "../Blessing/Blessing";
import authService from "../../../Services/AuthService";
import "./Header.css";

function Header(): JSX.Element {

    const[isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () =>{
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    const [user, setUser] = useState<UserModel>();

useEffect(() => {
    setUser(authStore.getState().user);

    authStore.subscribe(()=>{
        setUser(authStore.getState().user);
    })
}, [])


function logout(){
    authService.logout();
}

return (
        <div className="Header">
            <>
                <div>
                    <>
                    {console.log("PRINT FROM HEADER -HWO IS THE USER?: " + user)}
                    { !user &&
                        <>
                        <span className="Title1">
                            <h2>Lets coupon it..</h2>
                        </span>
                        <div className="Auth">
                            <span className="Login">
                                <Link to={"/login"}><button onClick={toggleModal}>Login here</button>
                                <BaseModalWrapper isModalVisible={isModalVisible} onBackdropClick={toggleModal}/></Link>
                            </span>
                            <span className="Register">
                                <Link to={"/register"}><button>SignUp</button></Link>
                            </span>
                        </div>
                        </>
                    }
                    { user &&
                        <>
                        <span className="Blessing">
                            <Blessing user = {
                                user
                            }/>
                        </span>

                        <span className="Title">
                            <h2>Lets coupon it..</h2>
                        </span>
                        
                        <span className="Logout">
                            <Link to="" onClick={logout}><button>Logout</button></Link>
                        </span>
                        </>
                    }
                    </>
                </div>
            </>

        </div>
    );
}

export default Header;

//TODO
/* function getRightUser(): any{
    const storedToken = localStorage.getItem("token");
    const objectUser: any = {...jwtDecode(storedToken)};
    if(objectUser.clientType == "ADMINISTRATOR"){
        return {objectUser: AdministratorModel}
    }
    if(objectUser.clientType == "COMPANY"){
        return {objectUser: CompanyModel}
    }
    if(objectUser.clientType == "CUSTOMER"){
        return {objectUser: CustomerModel}
    }
    return objectUser;
} */