import "./CouponCardForCustomer.css";
import { CardMedia, Typography} from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import { NavLink } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

interface couponProps{
    coupon: CouponModel;
}

function CouponCardForCustomer(property: couponProps): JSX.Element {

    const dateFormat = new Date(`${property.coupon.endDate}`) ;

    return (
        <div className="CouponCardForCustomer">
			 <Card elevation={16} sx={{ maxWidth: 500 }}>
                <CardHeader
                    action={
                            <IconButton>
                                <NavLink key={property.coupon.id} to={`/addCustomerPurchase/${property.coupon.id}`}>
                                    {<ShoppingCartTwoToneIcon color='action'/>}
                                </NavLink>
                            </IconButton>
                    }
                    title={property.coupon.title}
                    subheader={`expired at: `+ dateFormat.toLocaleString()}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={property.coupon.image}
                />
                <CardContent>
                    <Typography variant="body1" color="common.black">
                        {/* "Description: "+ */property.coupon.description}
                    </Typography>
                    <Typography variant="body2" >
                        {"Price: "+ property.coupon.price +"₪"}
                    </Typography>
                    <Typography variant="body2" >
                        {"Amount left: "+ property.coupon.amount+ " pieces"}
                    </Typography>
                    <Typography variant="body2" >
                        {"Status: "+ property.coupon.couponStatus}
                    </Typography>
                    <Typography variant="body2" >
                        {"Category: "+ property.coupon.category.name}
                    </Typography>
                    <Typography variant="body2" >
                        {"Coupon id is: "+ property.coupon.id}
                    </Typography>
                    
                </CardContent>
            </Card>
        </div>
    );
}

export default CouponCardForCustomer;
