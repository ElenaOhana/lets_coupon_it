import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import adminService from "../../../Services/AdministratorService";
import notificationService from "../../../Services/NotificationService";
import "./CompanyDetails.css";
import { Divider, Typography } from "@mui/material";

function CompanyDetails(): JSX.Element {

    const[company, setCompany] = useState<CompanyModel>(null);

    const {companyId} = useParams();

    const companyIdToNumber: number= +companyId;
    
    useEffect(() =>{
        adminService.getCompany(companyIdToNumber)
        .then((company) => {setCompany(company); })
        .catch(err => notificationService.error(err));
    })

    return (
        <div className="CompanyDetails Box">
			<h1> CompanyDetails:</h1>
            <br/>
            { company && 
            <>
                    <Divider variant="middle"/>
                    <Typography align="center" variant="h4">company Id:{company.id}</Typography>            
                    <Divider variant="middle"/> 
                    <br/>
                    <Divider variant="middle"/>
                    <Typography align="center" variant="h4">Name: {company.name}</Typography>                 
                    <Divider variant="middle"/>
                    <br/>
                    <Divider variant="middle"/> 
                    <Typography align="center" variant="h4">Email: {company.email}</Typography>            
                    <Divider variant="middle"/>    
                    <br/>      
                    <Divider variant="middle"/> 
                    <Typography align="center" variant="h4">The ClientStatus: {company.clientStatus}</Typography>
                    <Divider variant="middle"/>
            </>
            }
        </div>
    );
}

export default CompanyDetails;
