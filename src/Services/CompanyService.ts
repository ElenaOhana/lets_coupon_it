import axios from "axios";
import appConfig from "../Utils/Config";
import { CategoryModel } from "../Models/CategoryModel";
import { CompanyModel } from "../Models/CompanyModel";
import { CouponModel, CouponStatus } from "../Models/CouponModel";

class CompanyService{

    public async getAllCoupons(){
        const response = axios.get<CouponModel[]>(appConfig.companyUrl +"coupon");
        return (await response).data;
    }

    // by id ??
    public async getOneCoupon(couponId: number){ // by id ??
        // eslint-disable-next-line
        const response = axios.get<CouponModel>(appConfig.companyUrl + "coupon/"+`${couponId}`);
        return (await response).data;
    }
    
    public async addCoupon(coupon: CouponModel) {
        const response = axios.post<CouponModel>(appConfig.companyUrl + "coupon", coupon);
        //const response = axios.post<CouponModel>("http://localhost:8080/my-coupon-app/company/coupon", coupon);
        return (await response).data;
        /* Converting the image file to string: */
    //     let reader = new FileReader();
    //     var image = coupon.image as unknown as FileList;
    //     reader.readAsDataURL(image[0]);
    //     reader.onload = async function () {
    //     coupon.image = reader.result as string;
    //     const response = await axios.post<CouponModel>("http://localhost:8080/my-coupon-app/company/coupon", coupon);
    //     const newCoupon = response.data;
    //     couponStore.dispatch(AddAction(newCoupon)); //Write to store
    // };
    //     reader.onerror = function (error) {
    //     console.log('Error: ', error);
    // };
    }


    public async updateCoupon(couponId: number, coupon: CouponModel){
        // eslint-disable-next-line
        const response = axios.put<number>(appConfig.companyUrl +"coupon/"+ `${couponId}`, coupon);
        return (await response).data;
    }

    public async deleteCouponById(couponId: number){
        // eslint-disable-next-line
        const response = axios.delete<number>(appConfig.companyUrl + "coupon/"+`${couponId}`);
        return (await response).data;
    }

    public async getCompanyDetails(){
        // eslint-disable-next-line
        const response = axios.get<CompanyModel>(appConfig.companyUrl + "details");
        return (await response).data;
    }

    public async getCompanyCouponsByCategory(category: CategoryModel){
        console.log({data:category});
        // eslint-disable-next-line
        const response = axios.get<CouponModel[]>(appConfig.companyUrl + "category", /* {'id': category.id, "name": category.name} */);// ?? {data:category} Does not build properly object
        //const response = axios.get<CouponModel[]>(appConfig.companyUrl + "category", category);// Does not compile
        return (await response).data;
    }

     public async getCompanyCouponsByCategoryId(categoryId: number) { // find by name 
        // eslint-disable-next-line
        const response = axios.get<CouponModel[]>(appConfig.companyUrl + "category/"+`${categoryId}`);
        return (await response).data;
    }

    public async getMaxPriceOfCouponsOfCompany(){
        
        const response = axios.get<number>(appConfig.companyUrl + "max_price");
        return (await response).data;
    }

    public async getCouponListLessThanMaxPrice(){
        const response = axios.get<CouponModel[]>(appConfig.companyUrl + "coupons_less_than_max_price");
        return (await response).data;
    }
    
    //ENUM CouponStatus Required !!
    public async getCompanyCouponsByCategoryAndStatus(category: CategoryModel, couponStatus: CouponStatus){
        // eslint-disable-next-line
        const response = axios.get<CouponModel[]>(appConfig.companyUrl + "category-and-couponStatus" + `${couponStatus}`, {data:category});
        return (await response).data;
    }
}

const companyService = new CompanyService();
export default companyService;

