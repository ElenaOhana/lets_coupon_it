import { useForm } from "react-hook-form";
import { ClientType, UserModel } from "../../../Models/UserModel";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import { authStore } from "../../../Redux/AuthState";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";


function Register(): JSX.Element {

    const{register, handleSubmit,  formState: { errors, isValid }} = useForm<UserModel>({
        mode: "onTouched"
    });
    const navigate = useNavigate();

    const[type, setType] = useState<ClientType>();

    function send(user: UserModel){
        const userToJSON = JSON.stringify(user);
        console.log(userToJSON);
        console.log(type);
        if(type.toString() === 'CUSTOMER'){
            const customer = new UserModel(0, user.name, null, user.lastName, user.email, user.password );
            customer.clientType =type;
            console.log(JSON.stringify(customer));
            authService.register(customer, type)
            .then(()=>{
                //successful registration!
                const userCache = authStore.getState().user;//Be sure that there is the cache.
                notificationService.success("Welcome " + userCache.firstName + " " + userCache.lastName);
                navigate("/home")
            })
            .catch(err=> notificationService.error(err));
        }else if(type.toString() === 'COMPANY'){
            const company = new UserModel(0, user.name, null, null, user.email, user.password);
            company.clientType =type;
            console.log(JSON.stringify(company));
            authService.register(company, type)
            .then(()=>{
                //successful registration!
                const userCache = authStore.getState().user;//Be sure that there is the cache.
                notificationService.success("Welcome " + userCache.name);
                navigate("/home")
            })
            .catch(err=> notificationService.error(err));
        }
    }

    const handleChoice = (event:any) => {
        const t =event.target.value;
        setType(t);   
    }

    return (
        <div className="Register">
            <h1>Who are you?</h1>

            <select id="type" onChange={handleChoice}>
                    <option value="default">Who are you?</option>
                    <option value="COMPANY">COMPANY</option>
                    <option value="CUSTOMER">CUSTOMER</option>
                </select><br/>
               
                { type?.toString() ==='CUSTOMER' ? 
            <>
			<form onSubmit={handleSubmit(send)}>
                <TextField label="Name" {...register("name", { 
                    required: { value: true, message: 'Company name must be between 2 and 45 characters' },
                    minLength:{ value: 2, message: 'At least 2 characters' },  
                    maxLength: { value: 45, message: 'Your name is too long' } })}/><br/>
                    <span>{errors.firstName?.message}</span>
                    <br/><br/>

                <TextField label="Last Name"  {...register("lastName", { 
                    required: { value: true, message: 'Company name must be between 2 and 45 characters' },
                    minLength:{ value: 2, message: 'At least 2 characters' },  
                    maxLength: { value: 45, message: 'Your name is too long' } })}/><br/>
                    <span>{errors.lastName?.message}</span>
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

                <Button type = "submit" variant="outlined" disabled={!isValid}>Sign Up</Button>
            </form>
            </>:<></>
            }
            { type?.toString() ==='COMPANY' ? 
            <>
            <form onSubmit={handleSubmit(send)}>
                <TextField label="Name" {...register("name", { 
                    required: { value: true, message: 'Company name must be between 2 and 45 characters' },
                    minLength:{ value: 2, message: 'At least 2 characters' },  
                    maxLength: { value: 45, message: 'Your name is too long' } })}/><br/>
                    <span>{errors.firstName?.message}</span>
                    <br/><br/>


                <TextField className="Input" label="Email" type="email" variant="outlined" {...register("email",{ 
                    required: { value: true, message: 'Email required' }, 
                    pattern: { value: /^\S+@\S+$/i , message: "Invalid email" } })}/><br/>
                    <span>{errors.email?.message}</span>
                    <br/><br/>

                <TextField className="Input" label="Password" type="password" variant="outlined" {...register("password", { 
                    required: { value: true, message: 'Password is missing' }, 
                    minLength:{ value: 4, message: 'At least 4 characters' }, 
                    maxLength: { value: 8, message: 'Your password is too long' }})}/><br/>
                    <span>{errors.password?.message}</span>
                    <br/><br/>

                <Button type = "submit" variant="outlined" disabled={!isValid}>Sign Up</Button>
            </form>
            </>:<>
            </>
            }
        </div>
    );
}

export default Register;
