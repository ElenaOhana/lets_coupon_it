import { Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import CouponDetails from "../../HomeArea/CouponDetails/CouponDetails";
import "./Routing.css";
import Login from "../../HomeArea/Login/Login";
import CustomerMenu from "../../MenusArea/CustomerMenu/CustomerMenu";
import CompanyMenu from "../../MenusArea/CompanyMenu/CompanyMenu";
import AdminMenu from "../../MenusArea/AdminMenu/AdminMenu";
import AddCustomer from "../../AdminArea/AddCustomer/AddCustomer";
import CustomerDetails from "../../AdminArea/CustomerDetails/CustomerDetails";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import CompanyDetails from "../../AdminArea/CompanyDetails/CompanyDetails";
import UpdateCustomer from "../../AdminArea/UpdateCustomer/UpdateCustomer";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import UpdateCoupon from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import GetCouponsByMaxPrice from "../../CompanyArea/GetCouponsByMaxPrice/GetCouponsByMaxPrice";
import AddCustomerPurchase from "../../CustomerArea/AddCustomerPurchase/AddCustomerPurchase";
import GetCustomerCoupons from "../../CustomerArea/getCustomerCoupons/getCustomerCoupons";
import GetCustomerCouponsByMaxPrice from "../../CustomerArea/getCustomerCouponsByMaxPrice/getCustomerCouponsByMaxPrice";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path ="/home" element={<Home/>}/>

                <Route path ="/details/:couponId" element={<CouponDetails/>}/>

                <Route path ="/login" element={<Login/>}/>

                <Route path ="/adminMenu" element={<AdminMenu/>}/>
                <Route path ="/customerMenu" element={<CustomerMenu/>}/>
                <Route path ="/companyMenu" element={<CompanyMenu/>}/>

                {/* For Admin */}
                <Route path ="/addCompany" element={<AddCompany/>}/>
                {<Route path ="/companyDetails/:companyId" element={<CompanyDetails/>}/>}
                <Route path ="/updateCompany/:companyId" element={<UpdateCompany/>}/>

                <Route path ="/addCustomer" element={<AddCustomer/>}/>
                <Route path ="/customerDetails/:customerId" element={<CustomerDetails/>}/>
                <Route path ="/updateCustomer/:customerId" element={<UpdateCustomer/>}/>

                {/* For Company */}
                <Route path ="/addCoupon" element={<AddCoupon/>}/>
                <Route path ="/couponDetails/:couponId" element={<CouponDetails/>}/>
                <Route path ="/updateCoupon/:couponId" element={<UpdateCoupon/>}/>
                <Route path ="/get_coupons_by_max-price" element={<GetCouponsByMaxPrice/>}/>

                {/* for Customer */}
                <Route path ="/addCustomerPurchase/:couponId" element={<AddCustomerPurchase/>}/>
                <Route path ="/getCustomerCoupons" element={<GetCustomerCoupons/>}/>
                <Route path ="/purchases_less_than_max_price" element={<GetCustomerCouponsByMaxPrice/>}/>
                
                <Route path="*" element={<Home/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
