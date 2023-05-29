import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import { UserModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "./getCustomerCouponsByMaxPrice.css";
import CouponCardForCustomer from "../CouponCardForCustomer/CouponCardForCustomer";

function GetCustomerCouponsByMaxPrice(): JSX.Element {

    const [coupons, setCoupons] = useState<CouponModel[]>([]);

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);

        customerService.getCouponListLessThanMaxPrice()
            .then((coupons) => setCoupons(coupons))
            .catch(err => notificationService.error(err));
    }, [])

    return (
        <div className="getCustomerCouponsByMaxPrice">
            {user && coupons ?
                <>
                    {coupons.length > 0 ?
                    <>
                    <Container>
                        <Grid container spacing={3}>
                            {coupons.map(c => (
                                <Grid item key={c.id} xs={12} md={6} lg={4}>
                                    <CouponCardForCustomer coupon={c} key={c.id} />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                    </> : <><div className="parent"><div className="child">There are no coupons under max price, because you have one coupon only.</div></div></>}

                </> : <>
                    <div className="parent"><div className="child">You are logged out already. Please login <Link to={"/login"}>here.</Link></div></div>
                </>
            }
        </div>
    );
}

export default GetCustomerCouponsByMaxPrice;
