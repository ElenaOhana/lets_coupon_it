import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CompanyModel } from "../../../Models/CompanyModel";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {

    const[company, setCompany] = useState<CompanyModel>(null);

    useEffect(() =>{
        companyService.getCompanyDetails()
        .then((company) => {setCompany(company);})
        .catch(err => notificationService.error(err));
    }, [])

    return (
        <div className="CompanyDetails">
            { company && 
            <>
                    <Typography align="center" variant="h5">Company Details:</Typography> 
                    <br />
                    <Divider variant="middle"/>
                    <Divider variant="middle"/>
                    <Typography align="center" >Company id is: {company.id}</Typography>            
                    <Divider variant="middle"/> 
                    
                    <Divider variant="middle"/>
                    <Typography align="center" >Name: {company.name}</Typography>                 
                    <Divider variant="middle"/>

                    <Divider variant="middle"/> 
                    <Typography align="center" >Email: {company.email}</Typography>            
                    <Divider variant="middle"/>    
                 
                    <Divider variant="middle"/> 
                    <Typography align="center" >The ClientStatus: {company.clientStatus}</Typography>
                    <Divider variant="middle"/>
            </>
            }
        </div>
    );
}

export default CompanyDetails;
