import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import { UserModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import adminService from "../../../Services/AdministratorService";
import notificationService from "../../../Services/NotificationService";
import "./AddCompany.css";

function AddCompany(): JSX.Element {

    const{register, handleSubmit, formState: { errors, isValid }, reset} = useForm<CompanyModel>({
        mode: "onTouched"
    });
    const navigate= useNavigate();
    const [user, setUser] = useState<UserModel>();
    
    useEffect(()=>{
    setUser(authStore.getState().user);
    authStore.subscribe(()=> { 
        setUser(authStore.getState().user);
        //console.log("clientType from addCompany " +user.clientType==='ADMINISTRATOR');
        console.log("user from addCompany " +user);
    })
    }, [user]);

    function send(company: CompanyModel){
        adminService.addCompany(company)
        .then(()=>{
        notificationService.success("Company added!")
        navigate("/adminMenu")
        })
        .catch((err=> {notificationService.error(err); reset()}));
    }

    return (
        <div className="AddCompany Box2">
             { user?.clientType==='ADMINISTRATOR' ? 
            <>
			<h2>Add New Company</h2>
			<form onSubmit={handleSubmit(send)}>
                <TextField className="Input" label="Name" type="text" variant="outlined" {...register("name", { 
                    required: { value: true, message: 'Company name must be between 2 and 45 characters' },
                    minLength:{ value: 2, message: 'At least 2 characters' },  
                    maxLength: { value: 45, message: 'Your name is too long' } })}/><br/>
                <span>{errors.name?.message}</span>
                <br/><br/>

                <TextField className="Input" label="email" type="email" variant="outlined" {...register("email",{ 
                    required: { value: true, message: 'Email required' }, 
                    pattern: { value: /^\S+@\S+$/i , message: "Invalid email" } })}/><br/>
                <span>{errors.email?.message}</span>
                <br/><br/>

                <TextField className="Input" label="password" type="password" variant="outlined" {...register("password", { 
                     required: { value: true, message: 'Password is missing' }, 
                     minLength:{ value: 4, message: 'At least 4 characters' }, 
                     maxLength: { value: 8, message: 'Your password is too long' }})}/><br/>
                 <span>{errors.password?.message}</span>
                <br/><br/>

                <TextField className="Input" label="Client status" type="clientStatus" {...register("clientStatus")}/><br/><br/>
                <Button type = "submit" variant="outlined" disabled={!isValid}>Add</Button>
            </form></>
            :<>
             <div className="parent"><div className="child">You are logged out already. Please login <Link to={"/login"}>here.</Link></div></div>
            </>}
        </div>
    );
}

export default AddCompany;
