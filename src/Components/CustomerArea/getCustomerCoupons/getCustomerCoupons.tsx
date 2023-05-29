import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CustomerPurchaseModel } from "../../../Models/CustomerPurchaseModel";
import { UserModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import "./getCustomerCoupons.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CouponPurchaseCard from "../CouponPurchaseCard/CouponPurchaseCard";

function GetCustomerCoupons(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const [customerPurchases, setCustomerPurchases] = useState<CustomerPurchaseModel[]>();

    useEffect(() => {
        setUser(authStore.getState().user);

        customerService.getCustomerPurchases()
            .then((customerPurchases) => {
                setCustomerPurchases(customerPurchases);
            })
            .catch(err => notificationService.error(err));
    }, [])

    return (
        <div className="getCustomerCoupons">
            {user?.clientType === 'CUSTOMER' && customerPurchases ?
                <>
                    <h1>{user.firstName + " " + user.lastName + ", "}your Purchases are here:</h1>
                    <Container>
                        <Grid container spacing={3}>
                            {customerPurchases.map(cp => (
                                <Grid item key={cp.id} xs={12} md={6} lg={4}>
                                    <CouponPurchaseCard customerPurchase={cp} key={cp.id} />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </> : <>
                    <div className="parent"><div className="child">You are logged out already. Please login <Link to={"/login"}>here.</Link></div></div>
                </>}
        </div>
    );
}

export default GetCustomerCoupons;
