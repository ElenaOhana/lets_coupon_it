import { CardMedia, Divider, Typography} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import { couponStore } from "../../../Redux/CouponsState";
import couponService from "../../../Services/CouponService";
import notificationService from "../../../Services/NotificationService";
import "./CouponDetails.css";

function CouponDetails(): JSX.Element {

    const[coupon, setCoupon] = useState<CouponModel>(null);

    const {couponId} = useParams();
    
    const couponIdToNumber: number = +couponId;
    
    useEffect(() => {
        couponStore.subscribe(()=> {couponService.getCouponByIdForAll(couponIdToNumber)
            .then((coupon) => setCoupon(coupon))
            .catch(err=> notificationService.error(err))})

        couponService.getCouponByIdForAll(couponIdToNumber)
        .then((coupon) => setCoupon(coupon))
        .catch(err=> notificationService.error(err));
    },[couponIdToNumber])

    return (
        <div className="CouponDetails">
			<h1>Coupon details:</h1>
            <div className="Details">
			{ coupon && 
            <>
                <div className="InnerDetails">
                    <Divider variant="middle"/>
                    <Typography align="center" variant="h4">Title: {coupon.title}</Typography>                 
                    <Divider variant="middle"/>
                    <br/>
                    <Divider variant="middle"/>
                    <Typography align="center" variant="h4">Price: ₪{coupon.price}</Typography>            
                    <Divider variant="middle"/> 
                    <br/>
                    <Divider variant="middle"/> 
                    <Typography align="center" variant="h4">Amount: {coupon.amount}</Typography>            
                    <Divider variant="middle"/>    
                    <br/>      
                    <Divider variant="middle"/> 
                    <Typography align="center" variant="h5">The coupon id: {coupon.id}</Typography>
                    <Divider variant="middle"/>
                </div>
                <br/>
                <div className = "Image-container">
                    <CardMedia
                        component="img"
                        height="390"
                        image={coupon.image}/>
                </div>
            </>
            }
            </div>
        </div>
    );
}

export default CouponDetails;


