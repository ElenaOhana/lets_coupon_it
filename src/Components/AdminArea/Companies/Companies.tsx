import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import adminService from "../../../Services/AdministratorService";
import notificationService from "../../../Services/NotificationService";
import "./Companies.css";

function Companies(): JSX.Element {

    const[companies, setCompanies] = useState<CompanyModel[]>([]);

    useEffect(()=>{

        adminService.getAllCompanies()
        .then((companies)=>setCompanies(companies))
        .catch(err=> notificationService.error(err));

    },[])

    function handleDelete(id: number){
      adminService.deleteCompany(id)
      .then(() => {
        notificationService.success("Company deleted!")
        const newCompanies = companies.filter(company => company.id !== id)
        setCompanies(newCompanies);
      })
      .catch((err=> notificationService.error(err)))
    }

    return (
      <div className="Companies"> 
			<table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Client status</th>
                <th>
                  Actions <NavLink to="/addCompany"><button>➕</button></NavLink>
                </th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.clientStatus}</td>
                  <td>
                    <button onClick={() => handleDelete(c.id)}>🗑️</button>
                    <button><NavLink key={c.id} to={`/updateCompany/${c.id}`}>✏️</NavLink></button>
                    <button><NavLink key={c.id} to={`/companyDetails/${c.id}`}>🛈</NavLink></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    );
}

export default Companies;
