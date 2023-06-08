import { useEffect, useState } from "react";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import "./GetMaxPriceOfCustomer.css";

function GetMaxPriceOfCustomer(): JSX.Element {
    const[max_price, setMax_price] = useState<number>(null);

    useEffect(()=>{
        customerService.findMaxPriceOfCustomer()
        .then((max_price)=>{setMax_price(max_price); console.log("max_price from promise success: ", max_price)} )
        .catch((err=> {/* notificationService.error(err);  */console.log("max_price from promise error: ", max_price)} )
    )},[])

    return (
        <div className="GetMaxPriceOfCompany">
            <p>{max_price && "Max price of your purchases is:"}</p>
			<p>{max_price === null ? "You still have not bought any coupons": max_price + "₪"}</p>
        </div>
    );
}

export default GetMaxPriceOfCustomer;
