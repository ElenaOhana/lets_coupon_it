import { Button, TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ClientStatus, CompanyModel } from "../../../Models/CompanyModel";
import { CouponModel } from "../../../Models/CouponModel";
import { UserModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import "./AddCoupon.css";

function AddCoupon(): JSX.Element {
    const{register, handleSubmit, formState: { errors, isValid }, reset} = useForm<CouponModel>({
        mode: "onTouched"
    });

    function setToday(){
        return moment(new Date(Date.now())).format('YYYY-MM-DDThh:mm');//There is a time!
    }

    const[startDate, setStartDate] = useState<string|number>();
    const[endDate, setEndDate] =  useState<string|number>();

    const[startDateFormat, setStartDateFormat] = useState('');
    const[endDateFormat, setEndDateFormat] = useState('');

    const[disable, setDisable] = useState(true);

    const handleStartDate= (e:any) =>{
        const getStartDateValue = e.target.value;
        setStartDate(getStartDateValue);
        const formatArr = getStartDateValue.split('-');
        const year = formatArr[0];
        const month= formatArr[1];
        const dayAndTime= formatArr[2];
        const dayAndTimeArr = dayAndTime.split('T');
        const day = dayAndTimeArr[0];
        const time = dayAndTimeArr[1];
        const setStartDateFormatString= month+"/"+day+"/"+year+" "+time;
        setStartDateFormat(setStartDateFormatString);     
        setDisable(false);
    }
    const handleEndDate= (e:any) =>{
        const getEndDateValue = e.target.value;
        setEndDate(getEndDateValue);
        const formatArr = getEndDateValue.split('-');
        const year = formatArr[0];
        const month= formatArr[1];
        const dayAndTime= formatArr[2];
        const dayAndTimeArr = dayAndTime.split('T');
        const day = dayAndTimeArr[0];
        const time = dayAndTimeArr[1];
        const setEndDateFormatString= month+"/"+day+"/"+year+" "+time;
        setEndDateFormat(setEndDateFormatString);   
    }
    const navigate= useNavigate(); 

    const[user, setUser] = useState<UserModel>();

    useEffect(()=>{   
        setUser(authStore.getState().user);//setUser from useState()!! First state

        authStore.subscribe(()=> { // subscribe to changes of global state
            setUser(authStore.getState().user); //Like I override my local state with The global state.
        })
    }, [startDate, endDate, disable])

    function send(coupon: CouponModel){
        const company = new CompanyModel(user.id, user.name, user.email, "", ClientStatus.ACTIVE);
        coupon.company = company;
        coupon.image = "https://picsum.photos/200";

        companyService.addCoupon(coupon)
 
        .then(()=>{
            notificationService.success("Coupon added successfully!")
            navigate("/companyMenu"); 
        })
        .catch((err=> {notificationService.error(err); console.log(coupon); reset()}));
    } 
    
    return (
        <div className="AddCoupon">
           {/*  {  user?.clientType==='COMPANY' ?   */}
           {  user?.clientType.toString() ==='COMPANY' ?  
            <>
            <div className="Box2">
			<h2>Add New Coupon</h2>
			<form onSubmit={handleSubmit(send)}>

            <label htmlFor=""> Start Date: {startDateFormat}</label> <br/>
                <input className="InputDateTimeLocal" type="datetime-local" onInput={(e)=> handleStartDate(e)}  min={setToday()} max={endDate} {...register("startDate", {
                    required: {value: true, message: "Coupon StartDate must be present"}})}/><br/>
                    <span>{errors.startDate?.message}</span>
                <br/><br/>

                <label htmlFor=""> End Date: {endDateFormat} </label> <br/>
                <input className="InputDateTimeLocal" type="datetime-local" disabled={disable} onInput={(e)=> handleEndDate(e)} min={startDate} {...register("endDate", { 
                    required: {value: true, message: "Coupon EndDate must be present"}})}/><br/>
                    <span>{errors.endDate?.message}</span>
                <br/><br/>

                <TextField className="Input" label="Title" type="text" {...register("title", {
                required: {value: true, message: "Coupon title must be between 2 and 45 characters"},
                minLength:{ value: 2, message: 'The Title is too short' }, 
                maxLength: { value: 45, message: 'The Title is too long' }})}/><br/>
                <span>{errors.title?.message}</span>
                <br/><br/>
                <TextField className="Input" label="Description" type="text" {...register("description", {
                required: {value: true, message: "Coupon Description can be long"}})}/><br/>
                <span>{errors.description?.message}</span><br/><br/>

                <TextField className="Input" label="Amount" type="number" inputProps={{ min: 1}} {...register("amount", {
                    required: {value: true, message: "Coupon amount must be present and be more than 0"}})}/><br/>
                    <span>{errors.amount?.message}</span><br/><br/>

                <TextField className="Input" label="Price" type="number" inputProps={{step: "any", min: 0.1}} {...register("price", {
                    required: {value: true, message: "Coupon price must present"}})}/><br/>
                    <span>{errors.price?.message}</span><br/><br/>

                <TextField className="Input" label="Coupon Status" type="couponStatus" {...register("couponStatus", {
                    required: {value: true, message: "CouponStatus must be ABLE if it is a new Coupon"}})}/><br/>
                    <span>{errors.couponStatus?.message}</span><br/><br/>
            
                <select className="InputSelect" id="type" name="type"  {...register("category.id")}>
                    <option value="default">Please select Category:</option>
                    <option value="1">Shopping</option>
                    <option value="2">Sport</option>
                    <option value="3">PC</option>
                    <option value="4">Traveling</option>
                </select>
                <br/><br/>

                <Button disabled={!isValid} type = "submit" variant="outlined" >Add Coupon</Button>
            </form>
            </div>
        </>:
        <><div className="parent"><div className="child">You are logged out already. Please login <Link to={"/login"}>here.</Link></div></div></>
        }
        </div>
    );
}

export default AddCoupon;


