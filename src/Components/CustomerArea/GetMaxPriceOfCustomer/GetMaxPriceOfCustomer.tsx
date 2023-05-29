import { useEffect, useState } from "react";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import "./GetMaxPriceOfCustomer.css";

function GetMaxPriceOfCustomer(): JSX.Element {
    const[max_price, setMax_price] = useState<number>(0);

    useEffect(()=>{
          customerService.findMaxPriceOfCustomer()
          .then((max_price)=>setMax_price(max_price))
          .catch((err=> notificationService.error(err))
    )},[])

    return (
        <div className="GetMaxPriceOfCompany">
            <p>Max price of your purchases is:</p>
			<p>{max_price}₪</p>
        </div>
    );
}

export default GetMaxPriceOfCustomer;
