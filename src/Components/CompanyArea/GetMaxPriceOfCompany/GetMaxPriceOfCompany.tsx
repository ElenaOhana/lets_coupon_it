import { useEffect, useState } from "react";
import companyService from "../../../Services/CompanyService";
import "./GetMaxPriceOfCompany.css";

function GetMaxPriceOfCompany(): JSX.Element {

    const[max_price, setMax_price] = useState<number>(0);

    useEffect(()=>{
          companyService.getMaxPriceOfCouponsOfCompany()
          .then((max_price)=>setMax_price(max_price))
          .catch((err=> {/* notificationService.error(err);  */console.log("max_price from promise error: ", max_price)} )
    )},[max_price])

    return (
        <div className="GetMaxPriceOfCompany">
            <p>Max price is:</p>
			<p>{max_price}₪</p>
        </div>
    );
}

export default GetMaxPriceOfCompany;
