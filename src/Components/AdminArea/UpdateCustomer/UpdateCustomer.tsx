import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CustomerModel } from "../../../Models/CustomerModel";
import { UserModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import adminService from "../../../Services/AdministratorService";
import notificationService from "../../../Services/NotificationService";
import "./UpdateCustomer.css";

function UpdateCustomer(): JSX.Element {
    const [user, setUser] = useState<UserModel>();
    const{register, handleSubmit, formState: { errors, isValid }, reset} = useForm<CustomerModel>({
        mode: "onTouched"
    });
    const[customer, setCustomer] = useState<CustomerModel>(null);
    const navigate= useNavigate();
    const{customerId} =useParams();
    const customerIdToNumber: number= +customerId;

    useEffect(()=>{
        setUser(authStore.getState().user);

        authStore.subscribe(()=> { 
            setUser(authStore.getState().user);
        })
        //Getting customerById for reach it's firstName & lastName for interpolation in validation
        adminService.getCustomer(customerIdToNumber)
        .then((customer) => {setCustomer(customer); })
        .catch(err => notificationService.error(err));
    }, [customerIdToNumber]);

    function send(customer: CustomerModel){
        customer.id = customerIdToNumber;
        adminService.updateCustomerById(customerIdToNumber, customer)
        .then(()=>{
        notificationService.success("Customer updated!")
        navigate("/adminMenu")
        })
        .catch((err=> {notificationService.error(err); reset()}));
    }

    return (
        <div className="UpdateCustomer Box2">
            { (user?.clientType==='ADMINISTRATOR' && customer) ? 
            <>
			<h2>Update Customer</h2>
			<form onSubmit={handleSubmit(send)}>
                <TextField className="Input" label={customer.firstName} type="name"  variant="outlined"{...register("firstName", { 
                    required: { value: true, message: 'The firsName is missing' }, })}/><br/>
                <span>{errors.firstName?.message}</span>
                <br/><br/>

                <TextField className="Input" label={customer.lastName} type="name"  variant="outlined"{...register("lastName", { 
                    required: { value: true, message: 'The lastName is missing' }, })}/><br/>
                <span>{errors.lastName?.message}</span>
                <br/><br/>

                <TextField className="Input" label={customer.email} type="email" variant="outlined" {...register("email", { 
                    required: { value: true, message: 'You should not change the email' }, 
                    maxLength: { value: customer.email.length, message: 'You have changed the email' }, 
                    pattern:{ value: /^\S+@\S+$/i , message: "Invalid email"}})}/><br/>
                <span>{errors.email?.message}</span>
                <br/><br/>

                <TextField className="Input" label="Password" type="password" variant="outlined" {...register("password", { 
                    required: { value: true, message: 'Password is missing' }, 
                    minLength:{ value: 4, message: 'At least 4 characters' }, 
                    maxLength: { value: 8, message: 'Your password is too long' }})}/><br/>
                <span>{errors.password?.message}</span><br/><br/>

                <Button type = "submit" variant="outlined" disabled={!isValid}>Update</Button>
            </form>
            </>
            :<>
            <div className="parent"><div className="child">You are logged out already. Please login <Link to={"/login"}>here.</Link></div></div>
            </>
            }
        </div>
    );
}

export default UpdateCustomer;
