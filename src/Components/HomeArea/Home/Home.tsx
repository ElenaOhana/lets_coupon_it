import { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import "./Home.css";
import couponService from "../../../Services/CouponService";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../CouponCard/CouponCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

function Home(): JSX.Element {

    const[coupons, setCoupons] = useState<CouponModel[]>([]);
    
    useEffect(() => {
        couponService.getAllCoupons()
        .then((coupons) => setCoupons(coupons))
        .catch(err=> notificationService.error(err));
    }, []);
    
    return (
        <div className="Home">
            <div>
            <h2 className="header">Here are our coupons</h2>
            <Container>
                <Grid container spacing={3}>
                    {coupons.map(c => (
                    <Grid item key={c.id} xs={12} md={6} lg={4}>
                        <CouponCard coupon={c} key={c.id}/>
                    </Grid> 
                    ))}
                </Grid>
           </Container>
            </div>
        </div>
    );
}

export default Home;




//const[user, setUser] = useState<typeof getRightUser>();
/*   function getRightUser(): any{
    const storedToken = localStorage.getItem("token");
    const objectUser: any = {...jwtDecode(storedToken)};
    if(objectUser.clientType == "ADMINISTRATOR"){
        return {objectUser: AdministratorModel}
    }
    if(objectUser.clientType == "COMPANY"){
        return {objectUser: CompanyModel}
    }
    if(objectUser.clientType == "CUSTOMER"){
        return {objectUser: CustomerModel}
    }
    return objectUser;
} */