import axios from "axios";
import appConfig from "../Utils/Config";
import { CouponModel } from "../Models/CouponModel";
import { CustomerModel } from "../Models/CustomerModel";
import { CustomerPurchaseModel } from "../Models/CustomerPurchaseModel";

class CustomerService{

    public async purchaseCoupon(customerPurchase: CustomerPurchaseModel){
        const response = axios.post<CustomerPurchaseModel>(appConfig.customerUrl +"customer_purchase", customerPurchase);
        return (await response).data;
    }

    public async getCustomerPurchases(){
        const response = axios.get<CustomerPurchaseModel[]>(appConfig.customerUrl +"customer_purchase");
        return (await response).data;
    }

    public async getCustomerPurchasesOfConnectedCustomerByCategoryId(categoryId: number){
        const response = axios.get<CouponModel[]>(appConfig.customerUrl +"purchase_by_category/"+ categoryId);
        return (await response).data;
    }

    public async findMaxPriceOfCustomer(){
        const response = axios.get<number>(appConfig.customerUrl +"max_price_customer");
        return (await response).data;
    }
    
    public async getCouponListLessThanMaxPrice(){
        const response = axios.get<CouponModel[]>(appConfig.customerUrl +"purchases_less_than_max_price");
        return (await response).data;
    }

    public async getCustomerDetails(){
        const response = axios.get<CustomerModel>(appConfig.customerUrl + "details");
        return (await response).data;
    }
}

const customerService = new CustomerService();
export default customerService;