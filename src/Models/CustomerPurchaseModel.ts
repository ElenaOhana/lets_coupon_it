import { CouponModel } from "./CouponModel";
import { CustomerModel } from "./CustomerModel";

export class CustomerPurchaseModel{
    public id: number;
    public customer:CustomerModel;
    public coupon:CouponModel; 
    public couponTitle:string;
    public customerName:string;
    public purchaseDateTime:string;

    public constructor(id: number, customer: CustomerModel, coupon: CouponModel, couponTitle:string, customerName:string, purchaseDateTime:string){
        this.id = id;
        this.customer = customer;
        this.coupon = coupon;
        this.couponTitle = couponTitle;
        this.customerName = customerName;
        this.purchaseDateTime = purchaseDateTime;
    }
}

