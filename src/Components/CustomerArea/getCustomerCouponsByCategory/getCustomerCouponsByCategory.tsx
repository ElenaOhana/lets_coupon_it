import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CategoryModel } from "../../../Models/CategoryModel";
import { CouponModel } from "../../../Models/CouponModel";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import CouponCardForCustomer from "../CouponCardForCustomer/CouponCardForCustomer";
import "./getCustomerCouponsByCategory.css";

function GetCustomerCouponsByCategory(): JSX.Element {

    const { register, handleSubmit } = useForm<CategoryModel>({
        mode: "onTouched"
    });

    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    // const[customerPurchase, setCustomerPurchase] = useState<CustomerPurchaseModel[]>([]);
    const [category, setCategory] = useState<CategoryModel>();

    function send(category: CategoryModel) {
        customerService.getCustomerPurchasesOfConnectedCustomerByCategoryId(category.id)
            .then((coupons) => {
                setCoupons(coupons);
                setCategory(category);
                notificationService.success("You have chosen category with id: " + category.id);
            })
            .catch(err => notificationService.error(err));
    }

    return (
        <div className="getCustomerCouponsByCategory">
            <div className="CouponsByCategoryContainer">
                <Typography variant="h4">Get your coupons by category: </Typography>
                <div className="Category">
                    <form onSubmit={handleSubmit(send)}>
                        <label>What is Category?</label><br />
                        <select id="type" name="type"  {...register("id")}>
                            <option value="default">Please select Category:</option>
                            <option value="1">1-Shopping</option>
                            <option value="2">2-Sport</option>
                            <option value="3">3-PC</option>
                            <option value="4">4-Traveling</option>
                        </select>
                        <br />
                        <button>Choose</button>
                    </form>
                </div>
                <br/>
                <Container>
                    <Grid container spacing={3}>
                        {coupons.map(c => (
                            <Grid item key={c.id} xs={12} md={6} lg={4}>
                                <CouponCardForCustomer coupon={c} key={c.id} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            {coupons.length > 0 ?
                <></> : category ? <><div><h4>There are no coupons of category {category.id}</h4></div></> : <></>}
            </div>
        </div>
    );
}

export default GetCustomerCouponsByCategory;
