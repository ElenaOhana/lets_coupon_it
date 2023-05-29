import { CategoryModel } from "./CategoryModel";
import { CompanyModel } from "./CompanyModel";

export enum CouponStatus{
    ABLE, DISABLE
}

export class CouponModel{
    public id: number;
    public company?: CompanyModel;
    public category?: CategoryModel;
    public title: string;
    public description: string;
    public startDate:string; 
    public endDate:string; 
    public amount: number;
    public price: number;
    public image?: string; 
    public couponStatus: CouponStatus;

    public constructor(id: number, company?: CompanyModel, category?: CategoryModel, title?: string, description?: string, startDate?: string, endDate?:string, amount?: number, price?: number, image?: string, couponStatus?: CouponStatus){
        this.id = id;
        this.company = company;
        this.category = category;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.description = description;
        this.image = image;
        this.couponStatus = couponStatus;
    }
}

