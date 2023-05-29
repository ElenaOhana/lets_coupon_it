import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomerModel } from "../../../Models/CustomerModel";
import adminService from "../../../Services/AdministratorService";
import notificationService from "../../../Services/NotificationService";
import "./CustomerDetails.css";

function CustomerDetails(): JSX.Element {

    const[customer, setCustomer] = useState<CustomerModel>(null);

    const{customerId} = useParams();

    const customerIdToNumber: number =+ customerId;


    useEffect(() =>{
        adminService.getCustomer(customerIdToNumber)
        .then((customer) => setCustomer(customer))
        .catch((err) => notificationService.error(err));
    }, [customerIdToNumber])

    return (
        <div className="CustomerDetails Box">
			<h1> CustomerDetails:</h1>
            <br/>
            { customer && 
            <>
            <Divider variant="middle"/>
                    <Divider variant="middle"/> 
                    <Typography align="center" variant="h4">customer Id:{customer.id}</Typography>            
                    <Divider variant="middle"/>
                    <br/>
                    <Divider variant="middle"/>
                    <Typography align="center" variant="h4">First name: {customer.firstName}</Typography>                 
                    <Divider variant="middle"/>
                    <br/>
                    <Divider variant="middle"/> 
                    <Typography align="center" variant="h4">Last name: {customer.lastName}</Typography>            
                    <Divider variant="middle"/>    
                    <br/> 
                    <Divider variant="middle"/> 
                    <Typography align="center" variant="h4">Email: {customer.email}</Typography>            
                    <Divider variant="middle"/>    
                    <br/>     
                    <Divider variant="middle"/> 
                    <Typography align="center" variant="h4">The ClientStatus: {customer.clientStatus}</Typography>
                    <Divider variant="middle"/>
            </>
            }
        </div>
    );
}

export default CustomerDetails;
