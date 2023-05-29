import { NavLink } from "react-router-dom";
import "./Customers.css";
import { useEffect, useState } from "react";
import { CustomerModel } from "../../../Models/CustomerModel";
import adminService from "../../../Services/AdministratorService";
import notificationService from "../../../Services/NotificationService";

function Customers(): JSX.Element {

    const [customers, setCustomers] = useState<CustomerModel[]>([]);
    
    useEffect(()=>{
      adminService.getAllCustomers()
      .then((customers) => setCustomers(customers))
      .catch(err => notificationService.error(err))
    },[])

    function handleDelete(id: number){
      adminService.deleteCustomer(id)
      .then(() => {
        notificationService.success("Customer deleted!")
        const newCustomers = customers.filter(customer => customer.id !== id)
        setCustomers(newCustomers);
      })
      .catch((err=> notificationService.error(err)))
    }

    return (
        <div className="Customers">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Client status</th>
                <th>Email</th>
                <th>
                  Actions <NavLink to="/addCustomer"><button>➕</button></NavLink>
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.firstName}</td>
                  <td>{c.lastName}</td>
                  <td>{c.clientStatus}</td>
                  <td>{c.email}</td>
                  <td>
                    <button onClick={() => handleDelete(c.id)}>🗑️</button>
                    <button><NavLink to={`/updateCustomer/${c.id}`}>✏️</NavLink></button>
                    <button><NavLink to={`/customerDetails/${c.id}`}>🛈</NavLink></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    );
}

export default Customers;
