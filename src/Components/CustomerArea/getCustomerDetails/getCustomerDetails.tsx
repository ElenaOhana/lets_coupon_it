import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CustomerModel } from "../../../Models/CustomerModel";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import "./getCustomerDetails.css";

function GetCustomerDetails(): JSX.Element {
    const[customer, setCustomer] = useState<CustomerModel>(null);
    
    useEffect(() => {
        customerService.getCustomerDetails()
        .then((customer) => setCustomer(customer))
        .catch(err=> notificationService.error(err));
    },[])

    return (
        <div className="getCustomerDetails">
             {customer ?
             <>
            <Typography align="center" variant="h5">Customer Details:</Typography> 
                    <br />
                    <Divider variant="middle"/>
                    <Divider variant="middle"/>
                    <Typography align="center" >Customer id is: {customer.id}</Typography>            
                    <Divider variant="middle"/> 
                    
                    <Divider variant="middle"/>
                    <Typography align="center" >First Name: {customer.firstName}</Typography>                 
                    <Divider variant="middle"/>

                    <Divider variant="middle"/>
                    <Typography align="center" >Last Name: {customer.lastName}</Typography>                 
                    <Divider variant="middle"/>

                    <Divider variant="middle"/> 
                    <Typography align="center" >Email: {customer.email}</Typography>            
                    <Divider variant="middle"/>    
                 
                    <Divider variant="middle"/> 
                    <Typography align="center" >ClientStatus: {customer.clientStatus}</Typography>
                    <Divider variant="middle"/>
            </>:<>
            <div className="parent"><div className="child">You are logged out already. Please login <Link to={"/login"}>here.</Link></div></div>
            </>}
        </div>
    );
}

export default GetCustomerDetails;
