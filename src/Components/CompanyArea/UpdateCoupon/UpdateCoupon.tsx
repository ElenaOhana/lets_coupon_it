import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClientStatus, CompanyModel } from "../../../Models/CompanyModel";
import { CouponModel } from "../../../Models/CouponModel";
import { UserModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import moment from "moment";
import "./UpdateCoupon.css";

function UpdateCoupon(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const{register, handleSubmit, formState: { errors, isValid }, reset} = useForm<CouponModel>({
        mode: "onTouched"
    });
    const[coupon, setCoupon] = useState<CouponModel>(null);
    const navigate= useNavigate();
    const{couponId} =useParams();
    const couponIdToNumber: number= +couponId;

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

    useEffect(()=>{
        setUser(authStore.getState().user);

        authStore.subscribe(()=> { 
            setUser(authStore.getState().user);
        })
        
        //Getting couponById for reach it's title for interpolation in validation
        companyService.getOneCoupon(couponIdToNumber)
        .then((coupon) => {setCoupon(coupon); })
        .catch(err => notificationService.error(err));
    }, [couponIdToNumber]);

    function send(coupon: CouponModel){
        coupon.id = couponIdToNumber;
        const company = new CompanyModel(user.id, user.name, user.email, "", ClientStatus.ACTIVE);
        coupon.company = company;

        companyService.updateCoupon(couponIdToNumber, coupon)
        .then(()=>{
        notificationService.success("Coupon updated!")
        navigate("/companyMenu")
        })
        .catch((err=> {notificationService.error(err); reset()}));
    }

    return (
        <div className="UpdateCoupon">
            { (user?.clientType==='COMPANY' && coupon) ? 
            <>
            <div className="Box2">
			<h2>Update Coupon</h2>
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

                <TextField className="Input" label="Title" type="title"  variant="outlined"{...register("title", { 
                    required: { value: true, message: 'The title must be present and be between 2 and 45 characters' }, 
                    minLength: { value: 2, message: 'Coupon title must be more than 1 character'},
                    maxLength: { value: 45, message: 'The Title is too long' } })}/><br/>
                <span>{errors.title?.message}</span>
                <br/><br/>

                <TextField className="Input" label="Description" type="description" variant="outlined" {...register("description", { 
                    required: { value: true, message: "Coupon Description can be long" }})}/><br/>
                <span>{errors.description?.message}</span>
                <br />

                <TextField className="Input" label="Amount" type="number" inputProps={{ min: 1}} {...register("amount", {
                required: {value: true, message: "Coupon amount must be present and be more than 0"}})}/><br/>
                <span>{errors.amount?.message}</span><br/><br/>

                <TextField className="Input" label="Price" type="number" inputProps={{step: "any", min: 0.1}} {...register("price", {
                    required: {value: true, message: "Coupon price must present"}})}/><br/>
                    <span>{errors.price?.message}</span><br/><br/>

                    <select className="InputSelect" id="type" name="type"  {...register("category.id")}>
                    <option value="default">Please select Category:</option>
                    <option value="1">Shopping</option>
                    <option value="2">Sport</option>
                    <option value="3">PC</option>
                    <option value="4">Traveling</option>
                </select>
                <br/><br/>

                <Button type = "submit" variant="outlined" disabled={!isValid}>Update</Button>
            </form>
            </div>
            </>
            :<>
            <div className="parent"><div className="child">You are logged out already. Please login <Link to={"/login"}>here.</Link></div></div>
            </>
            }
        </div>
    );
}

export default UpdateCoupon;
