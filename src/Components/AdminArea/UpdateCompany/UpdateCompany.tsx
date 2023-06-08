import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import { UserModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import adminService from "../../../Services/AdministratorService";
import notificationService from "../../../Services/NotificationService";
import "./UpdateCompany.css";

function UpdateCompany(): JSX.Element {
    const [user, setUser] = useState<UserModel>();
    const{register, handleSubmit, formState: { errors, isValid }, reset} = useForm<CompanyModel>({
        mode: "onTouched"
    });
    const[company, setCompany] = useState<CompanyModel>(null);
    const navigate= useNavigate();
    const{companyId} =useParams();
    const companyIdToNumber: number= +companyId;

    useEffect(()=>{
        setUser(authStore.getState().user);

        authStore.subscribe(()=> { 
            setUser(authStore.getState().user);
        })
        //Getting companyById for reach it's name for interpolation in validation
        adminService.getCompany(companyIdToNumber)
        .then((company) => {setCompany(company); })
        .catch(err => notificationService.error(err));
    }, [companyIdToNumber]);

    function send(company: CompanyModel){
        company.id = companyIdToNumber;
        adminService.updateCompanyById(companyIdToNumber, company)
        .then(()=>{
        notificationService.success("Company updated!")
        navigate("/adminMenu")
        })
        .catch((err=> {notificationService.error(err); reset()}));
    }

    return (
        <div className="UpdateCompany Box2">
          {/*   { (user?.clientType==='ADMINISTRATOR' && company) ?  */}
            { (user?.clientType.toString() ==='ADMINISTRATOR' && company) ? 
            <>
			<h2>Update Company</h2>
			<form onSubmit={handleSubmit(send)}>
                <TextField className="Input" label={company.name} type="name"  variant="outlined"{...register("name", { 
                    required: { value: true, message: 'You should not change the name' }, 
                    maxLength: { value: company.name.length, message: 'You have changed the name' } })}/><br/>
                <span>{errors.name?.message}</span>
                <br/><br/>

                <TextField className="Input" label="Email" type="email" variant="outlined" {...register("email", { 
                    required: { value: true, message: "Email is missing" },
                    pattern: { value: /^\S+@\S+$/i , message: "Invalid email" } })}/><br/>
                <span>{errors.email?.message}</span>
                <br />

                <TextField className="Input" label="Password" type="password" variant="outlined" {...register("password", { 
                    required: { value: true, message: 'Password is missing' }, 
                    minLength:{ value: 4, message: 'At least 4 characters' }, 
                    maxLength: { value: 8, message: 'Your password is too long' }})}/><br/>
                <span>{errors.password?.message}</span><br/><br/>

                <Button type = "submit" /* onChange={(e)=>{ setUsername(e.currentTarget.value); }} */ variant="outlined" disabled={!isValid}>Update</Button>
            </form>
            </>
            :<>
            <div className="parent"><div className="child">You are logged out already. Please login <Link to={"/login"}>here.</Link></div></div>
            </>
            }
        </div>
    );
}

export default UpdateCompany;
