import { Button, TextField } from '@mui/material';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CategoryModel } from '../../../Models/CategoryModel';
import { ClientStatus, CompanyModel } from '../../../Models/CompanyModel';
import { CouponModel } from "../../../Models/CouponModel";
import { CustomerModel } from '../../../Models/CustomerModel';
import { CustomerPurchaseModel } from "../../../Models/CustomerPurchaseModel";
import { UserModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import couponService from "../../../Services/CouponService";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import Home from '../../HomeArea/Home/Home';
import CouponCardForCustomer from '../CouponCardForCustomer/CouponCardForCustomer';
import "./AddCustomerPurchase.css";

function AddCustomerPurchase(): JSX.Element {
    const [user, setUser] = useState<UserModel>();
    const [coupon, setCoupon] = useState<CouponModel>();
    const [customer, setCustomer] = useState<CustomerModel>();
    const navigate= useNavigate();

    const { couponId } = useParams();
    const couponIdToNumber: number = +couponId;

    const { register, handleSubmit, formState: { isValid }, reset } = useForm<CustomerPurchaseModel>({
        mode: "onTouched"
    });

    useEffect(() => {
        setUser(authStore.getState().user);

        //Getting couponById for fill it's data in TextView
        couponService.getCouponByIdForAll(couponIdToNumber)
            .then((coupon) => { setCoupon(coupon); })
            .catch(err => notificationService.error(err));

        customerService.getCustomerDetails()
            .then((customer) => { setCustomer(customer); })
            .catch(err => notificationService.error(err));
    }, [couponIdToNumber])

    function send(customerPurchase: CustomerPurchaseModel){
        const couponForCP = new CouponModel(couponIdToNumber, new CompanyModel(0, "","","", ClientStatus.ACTIVE), new CategoryModel(0,""), coupon.title,
            coupon.description, coupon.startDate, coupon.endDate, coupon.amount, coupon.price, coupon.image, coupon.couponStatus);
            customerPurchase.coupon = couponForCP;
            customerPurchase.customer.id = user.id;
            customerPurchase.customer.firstName = user.firstName;
            customerPurchase.customerName = user.firstName;
            customerPurchase.customer.lastName = user.lastName;

        customerService.purchaseCoupon(customerPurchase)
        .then(()=>{
            notificationService.success("Your purchase added successfully!")
            navigate("/getCustomerCoupons")
        })
        .catch((err=> {notificationService.error(err); reset()}));
    }

    return (
        <div className="AddCustomerPurchase">
          {/*   {user?.clientType === 'CUSTOMER' && coupon && customer? */}
            {user?.clientType.toString() === 'CUSTOMER' && coupon && customer?
                <>
                    <h2>AddCustomerPurchase</h2>
                    <div className="ContainerCouponAndCustomer">
                        <div className="ContainerCouponInfo">
                            <div className="Box">
                                <h3>Coupon info:</h3>
                                <CouponCardForCustomer coupon={coupon}></CouponCardForCustomer>
                            </div>
                        </div>
                        <div className="ContainerCustomer">
                            <div className="Box">
                                <h3>Your info:</h3>
                                <form onSubmit={handleSubmit(send)}>
                                    {/* <TextField className="Input" label="First name" type="text" {...register("customerName", {
                                        required: { value: true, message: 'First name must be present' },
                                    })} /><br />
                                    
                                   <br/><br />

                                    <TextField className="Input" label="Last name" type="text" {...register("customer.lastName", {
                                        required: { value: true, message: 'Last name must be present' },
                                    })} /><br/>
                                    
                                   <br/><br /> */}

                                    <TextField className="Input" label="Email" type="email" {...register("customer.email", {
                                        required: { value: true, message: 'Email required' },
                                        maxLength: { value: user.email.length, message: 'You have changed the email' }, 
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                                    })} /><br />
                                   {/*  <span>{errors.customer.email?.message}</span> */}
                                    <br/><br/>

                                    <TextField className="Input" label="Password" type="password" {...register("customer.password", {
                                        required: { value: true, message: 'Password is missing' },
                                        minLength:{ value: 4, message: 'At least 4 characters' }, 
                                        maxLength: { value: 8, message: 'Your password is too long' }})}/><br />
                                    {/* <span>{errors.customer.password?.message}</span> */}
                                    <br/><br/>
                                    <Button type="submit" variant="outlined" disabled={!isValid}>Add</Button>
                                </form>
                            </div>
                        </div>
                    </div>

                </> : <>
                    {!user ? <>
                        <div className="parent"><div className="child">You are logged out already. Please login <Link to={"/login"}>here.</Link></div></div>
                    </> : <><Home /></>}
                </>}
        </div>
    );
}

export default AddCustomerPurchase;
