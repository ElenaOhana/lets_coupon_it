import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import { UserModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import couponService from "../../../Services/CouponService";
import notificationService from "../../../Services/NotificationService";
import "./CustomerMenu.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CouponCardForCustomer from "../../CustomerArea/CouponCardForCustomer/CouponCardForCustomer";
import GetCustomerDetails from "../../CustomerArea/getCustomerDetails/getCustomerDetails";
import GetMaxPriceOfCustomer from "../../CustomerArea/GetMaxPriceOfCustomer/GetMaxPriceOfCustomer";
import { Divider, Typography } from "@mui/material";
import GetCustomerCouponsByCategory from "../../CustomerArea/getCustomerCouponsByCategory/getCustomerCouponsByCategory";

function CustomerMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const [coupons, setCoupons] = useState<CouponModel[]>([]);

    useEffect(() => {
        setUser(authStore.getState().user);

        couponService.getAllAbleCoupons()
            .then((coupons) => setCoupons(coupons))
            .catch(err => notificationService.error(err));
    }, [])

    return (
        <div className="CustomerMenu">
            {user?.clientType === 'CUSTOMER' && coupons ?
                <>
                    <h1>CustomerMenu</h1>
                    <div className="ContainerDetailsAndPrice">
                        <div className="ContainerCustomerDetails">
                            <div className="Box">
                                <GetCustomerDetails />
                            </div>
                        </div>
                        <div className="ContainerMaxPrice">
                            <div className="Box">
                                <GetMaxPriceOfCustomer />
                                <Link to={"/purchases_less_than_max_price"}>For get purchases under max price press here.</Link>
                            </div>
                        </div>
                        <div className="ContainerCustomerCoupons">
                            <div className="Box">
                                <Link to={"/getCustomerCoupons"}>For get your purchases press here.</Link>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="CouponsForPurchaseContainer">
                        <Container>
                            <Typography variant="h4">Coupons are able for purchase: </Typography>
                            <Divider variant="middle" />
                            <Divider variant="middle" />
                            <br/>
                            <Grid container spacing={3}>
                                {coupons.map(c => (
                                    <Grid item key={c.id} xs={12} md={6} lg={4}>
                                        <CouponCardForCustomer coupon={c} key={c.id} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </div>
                    <br/>
                    <br/>
                    <GetCustomerCouponsByCategory/>
                </> : <>
                    <div className="parent"><div className="child">You are logged out already. Please login <Link to={"/login"}>here.</Link></div></div>
                </>}
        </div >
    );
}

export default CustomerMenu;
