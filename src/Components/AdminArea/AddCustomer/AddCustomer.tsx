import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../Models/CustomerModel";
import { UserModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import adminService from "../../../Services/AdministratorService";
import notificationService from "../../../Services/NotificationService";
import "./AddCustomer.css";

function AddCustomer(): JSX.Element {
    const{register, handleSubmit, formState: { errors, isValid }, reset} = useForm<CustomerModel>({
        mode: "onTouched"
    });
    const navigate= useNavigate();
    
    const [user, setUser] = useState<UserModel>();
    
    useEffect(()=>{
        setUser(authStore.getState().user);

        authStore.subscribe(()=> { 
            setUser(authStore.getState().user);
            console.log("user from addCompany " +user);
        })
    }, [user]);

    function send(customer: CustomerModel){
        adminService.addCustomer(customer)
        .then(()=>{
            notificationService.success("Customer added!")
            navigate("/adminMenu")
        })
        .catch((err=> {notificationService.error(err); reset()}));
    }

    return (
        <div className="AddCustomer ">
        
            {/* {user?.clientType==='ADMINISTRATOR' ? */}
            {user?.clientType.toString() === 'ADMINISTRATOR' ? 
            <>
            <div className="Box2">
			<h2>Add New Customer</h2>
			<form onSubmit={handleSubmit(send)}>
                <TextField className="Input" label="First name" type="text" {...register("firstName", { 
                    required: { value: true, message: 'Customer first name must be between 2 and 45 characters' },
                    minLength:{ value: 2, message: 'At least 2 characters' },  
                    maxLength: { value: 45, message: 'Your first name is too long' } })}/><br/>
                <span>{errors.firstName?.message}</span><br/><br/>

                <TextField className="Input" label="Last name" type="text" {...register("lastName", { 
                    required: { value: true, message: 'Customer last name must be between 2 and 45 characters' },
                    minLength:{ value: 2, message: 'At least 2 characters' },  
                    maxLength: { value: 45, message: 'Your last name is too long' } })}/><br/>
                <span>{errors.lastName?.message}</span><br/><br/>

                <TextField className="Input" label="Email" type="email" {...register("email",{ 
                    required: { value: true, message: 'Email required' }, 
                    pattern: { value: /^\S+@\S+$/i , message: "Invalid email" } })}/><br/>
                <span>{errors.email?.message}</span>
                <br/><br/>


                <TextField className="Input" label="Password" type="password" {...register("password", { 
                     required: { value: true, message: 'Password is missing' }, 
                     minLength:{ value: 4, message: 'At least 4 characters' }, 
                     maxLength: { value: 8, message: 'Your password is too long' }})}/><br/>
                 <span>{errors.password?.message}</span>
                <br/><br/>

                <TextField className="Input" label="Client status" type="clientStatus" {...register("clientStatus")}/><br/><br/>
                <Button type = "submit" variant="outlined" disabled={!isValid}>Add</Button>
            </form>
            </div>
            </>:<>
            <div className="parent"><div className="child">You are logged out already. Please login <Link to={"/login"}>here.</Link></div></div>
            </>}
        </div>
    );
}

export default AddCustomer;
