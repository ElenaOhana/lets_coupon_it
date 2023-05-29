import { useEffect, useState } from "react";
import Companies from "../../AdminArea/Companies/Companies";
import Customers from "../../AdminArea/Customers/Customers";
import { authStore } from "../../../Redux/AuthState";
import "./AdminMenu.css";
import { Link } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";

//Companies & Customers Components are Tables that show only an ACTIVE clients.
function AdminMenu(): JSX.Element {

const [user, setUser] = useState<UserModel>();

useEffect(()=>{
        setUser(authStore.getState().user);

        authStore.subscribe(()=> { 
            setUser(authStore.getState().user);
        })
}, []);

    return (
        <div className="AdminMenu">
            { user?.clientType==='ADMINISTRATOR' ? 
            <>
            <div className="Box">
            <div className="MenuTitle"><h1>AdminMenu</h1></div>

            <div className="TablesContainer">
                <span className="CompaniesTable">
                <h2>Companies Table</h2>
                <Companies/>
                </span>
                <br/>
                <br/>
                <span className="CustomersTable">
                <h2>Customers Table</h2>
                <Customers/>
                </span>
            </div>
            </div>
            </>:<>
             <div className="parent"><div className="child">You are logged out already. Please login <Link to={"/login"}>here.</Link></div></div>
            </>
            }
        </div>
    );
}

export default AdminMenu;
