import axios from "axios";
import appConfig from "../Utils/Config";
import { CouponModel } from "../Models/CouponModel";
import { couponStore, FetchAction } from "../Redux/CouponsState";

class CouponService{

    public async getAllCoupons() {
        if(couponStore.getState().coupons.length === 0){
        const response = axios.get<CouponModel[]>(appConfig.couponsForAllUrl);
        const coupons = (await response).data;
        couponStore.dispatch(FetchAction(coupons));//Write to store
        return coupons;
        } else{
            return couponStore.getState().coupons;
        }
    }

    // End point for ONLY ABLE coupons - ("/able-coupons-for-all")
    public async getAllAbleCoupons() {
        const response = axios.get<CouponModel[]>(appConfig.ableCouponsForAllUrl);
        const coupons = (await response).data;
        return coupons; 
    }

    public async getCouponByIdForAll(couponId: number){
        const response = axios.get<CouponModel>(appConfig.customerUrl+ "couponForAllUsers/" + couponId);
        return (await response).data;
    }

   
    
}

const couponService = new CouponService();
export default couponService;