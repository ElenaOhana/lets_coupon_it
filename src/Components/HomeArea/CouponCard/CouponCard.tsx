import { CouponModel } from "../../../Models/CouponModel";
import "./CouponCard.css";
import { CardMedia, Typography} from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { NavLink } from "react-router-dom";

interface couponProps{
    coupon: CouponModel;
}

function CouponCard(property: couponProps): JSX.Element {

    const dateFormat = new Date(`${property.coupon.endDate}`) ;
    
    return (
        <div className="CouponCard">
            <Card elevation={16} sx={{ maxWidth: 500 }}>
                <CardHeader
                    action={
                            <IconButton>
                                <NavLink key={property.coupon.id} to={`/details/${property.coupon.id}`}>
                                    {<MoreVertIcon />}
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
                    <Typography variant="body2" color="textSecondary">
                        {property.coupon.description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default CouponCard;


