import { useState } from "react";
import { useForm } from "react-hook-form";
import { CategoryModel } from "../../../Models/CategoryModel";
import { CouponModel } from "../../../Models/CouponModel";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import "./GetCouponsByCategory.css";

function GetCouponsByCategory(): JSX.Element {

    const { register, handleSubmit } = useForm<CategoryModel>({
        mode: "onTouched"
    });

    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const [category, setCategory] = useState<CategoryModel>();


    function send(category: CategoryModel) {
        companyService.getCompanyCouponsByCategoryId(category.id)
            .then((coupons) => {
                setCoupons(coupons);
                setCategory(category);
                notificationService.success("You have chosen category with id: " + category.id);
            })
            .catch(err => notificationService.error(err));
        
    }

    return (
        <div className="GetCouponsByCategory">
            <div className="Box">
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
                {coupons.length > 0 ?
                    <>
                        <div className="CouponTable">
                            <h2>Company Coupons By Category</h2>
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </> : category ? <><div><h4>There are no coupons of category {category.id}</h4></div></> : <></>}
            </div>
        </div>
    );
}

export default GetCouponsByCategory;
