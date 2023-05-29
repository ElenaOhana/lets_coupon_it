import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import { UserModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import { couponStore } from "../../../Redux/CouponsState";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import Home from "../../HomeArea/Home/Home";
import "./GetCouponsByMaxPrice.css";

function GetCouponsByMaxPrice(): JSX.Element {
    const[coupons, setCoupons] = useState<CouponModel[]>([]);

    const[user, setUser] = useState<UserModel>();

    useEffect(()=>{
        setUser(authStore.getState().user);

        couponStore.subscribe(()=>{
          setCoupons(couponStore.getState().coupons);
        })

        companyService.getCouponListLessThanMaxPrice()
        .then((coupons)=>setCoupons(coupons))
        .catch(err=> notificationService.error(err));
    },[])

    return (
        <div className="GetCouponsByMaxPrice">
            { (user?.clientType==='COMPANY')? 
        <>
        <div className ="CouponTable">
			    <h1>CompanyMenu</h1>
            <h2>Table of coupons less than max price</h2>
            <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>StartDate</th>
                <th>EndDate</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Image</th>
                <th>CouponStatus</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.title}</td>
                  <td>{c.category.name}</td>
                  <td>{c.description}</td>
                  <td>{new Date(`${c.startDate}`).toLocaleString()}</td>
                  <td>{new Date(`${c.endDate}`).toLocaleString()}</td>
                  <td>{c.amount}</td>
                  <td>{c.price}₪</td>
                  <td>{c.image}</td>
                  <td>{c.couponStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br/>
        </>:<>
        {!user?<>
          <div className="parent"><div className="child">You are logged out already. Please login <Link to={"/login"}>here.</Link></div></div>
          </>:<><Home/></>}
        </>
        }
        </div>
    );
}

export default GetCouponsByMaxPrice;
