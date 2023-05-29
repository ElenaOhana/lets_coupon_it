import { Link, NavLink } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import "./CompanyMenu.css";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import { UserModel } from "../../../Models/UserModel";
import { couponStore } from "../../../Redux/CouponsState";
import GetCouponsByCategory from "../../CompanyArea/GetCouponsByCategory/GetCouponsByCategory";
import GetMaxPriceOfCompany from "../../CompanyArea/GetMaxPriceOfCompany/GetMaxPriceOfCompany";
import CompanyDetails from "../../CompanyArea/CompanyDetails/CompanyDetails";

function CompanyMenu(): JSX.Element {
    const[coupons, setCoupons] = useState<CouponModel[]>([]);

    const[user, setUser] = useState<UserModel>();

    useEffect(()=>{
        setUser(authStore.getState().user);

        companyService.getAllCoupons()
        .then((coupons)=>setCoupons(coupons))
        .catch(err=> notificationService.error(err));

        couponStore.subscribe(()=>{
          setCoupons(couponStore.getState().coupons);
      })
    },[])

    function handleDelete(id: number){
        companyService.deleteCouponById(id)
        .then(() => {
          notificationService.success("Coupon deleted!")})
        .catch((err=> notificationService.error(err)))
        
        const newCoupons = coupons.filter(coupon => coupon.id !== id)
        setCoupons(newCoupons);
    }

    return (
      <div className="CompanyMenu">
        {  (user?.clientType ==='COMPANY')? 
        <>
			  <h1>CompanyMenu</h1>
        <div className="ContainerDetailsAndPrice">
          <div className="ContainerCompanyDetails">
            <div className="Box"> 
              <CompanyDetails/>
            </div>
          </div>
          <div className="ContainerMaxPrice">
            <div className="Box"> 
              <GetMaxPriceOfCompany/>
              <Link to={"/get_coupons_by_max-price"}>For get coupons under max price press here.</Link>
            </div>
          </div>
        </div>

        <div className ="CouponTable">
            <h2>Table of all coupons of the Company</h2>
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
                <th>
                  Actions <NavLink to="/addCoupon"><button>➕</button></NavLink>
                </th>
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
                  <td>
                    <button onClick={() => handleDelete(c.id)}>🗑️</button>
                    <button><NavLink key={c.id} to={`/updateCoupon/${c.id}`}>✏️</NavLink></button>
                    <button><NavLink key={c.id} to={`/couponDetails/${c.id}`}>🛈</NavLink></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br/>
        <GetCouponsByCategory/>
        </>:<>
          <div className="parent"><div className="child">You are logged out already. Please login <Link to={"/login"}>here.</Link></div></div>
        </>
        }
      </div>
    );
}

export default CompanyMenu;
