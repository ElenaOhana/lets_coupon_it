import "./CouponPurchaseCard.css";
import { CardMedia, Typography} from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { CustomerPurchaseModel } from "../../../Models/CustomerPurchaseModel";
import { useEffect, useState } from "react";
import { UserModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";

interface customerPurchaseProps{
    customerPurchase: CustomerPurchaseModel;
}

function CouponPurchaseCard(property: customerPurchaseProps): JSX.Element {

    const purchaseDateTime = new Date(`${property.customerPurchase.purchaseDateTime}`);
    const endDate = new Date(`${property.customerPurchase.coupon.endDate}`);

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);
    }, [])

    return (
        <div className="CouponCardForCustomer">
           {/*  {user?.clientType ==='CUSTOMER' ?<> */}
            {user?.clientType.toString() ==='CUSTOMER' ?<>
			 <Card elevation={16} sx={{ maxWidth: 500 }}>
                <CardHeader
                    title={property.customerPurchase.couponTitle+", price: "+ property.customerPurchase.coupon.price+"₪"}
                    subheader={"expired at: "+ endDate.toLocaleString()}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={property.customerPurchase.coupon.image}
                />
                <CardContent>
                    <Typography variant="body1" color="common.black">
                        {"couponTitle: "+ property.customerPurchase.coupon.description}
                    </Typography>
                    <Typography variant="body1" color="common.black">
                        {"category: "+ property.customerPurchase.coupon.category.name}
                    </Typography>
                    <Typography variant="body1" color="common.black">
                        {`Purchased at: `+ purchaseDateTime.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" >
                        {"Customer first name: "+ property.customerPurchase.customerName}
                    </Typography> 
                    <Typography variant="body2" >
                        {"Customer last name: "+ user.lastName}
                    </Typography> 
                </CardContent>
            </Card>
            </>:<></>}
        </div>
    );
}

export default CouponPurchaseCard;
