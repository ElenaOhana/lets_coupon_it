import { CouponModel } from "../Models/CouponModel";
import {createStore} from "@reduxjs/toolkit";

export class CouponState{
    coupons: CouponModel[] =[];
}

export enum CouponsActionTypes{
    FetchCoupons, 
    AddCoupon, 
    DeleteCoupon, //by Id
    UpdateCoupon //by Id and JSON of Coupon
}

export interface CouponsAction{
    type: CouponsActionTypes,
    payload: any
}

export function FetchAction(coupons: CouponModel[]){
    return {type: CouponsActionTypes.FetchCoupons, payload: coupons}
}

export function AddAction(coupon: CouponModel){
    return {type: CouponsActionTypes.AddCoupon, payload: coupon}
}

export function DeleteAction(id: number){
    return {type: CouponsActionTypes.DeleteCoupon, payload: id}
}

export function couponReducer(currentState = new CouponState(), action: CouponsAction): CouponState{
    const newState = {...currentState}

    switch(action.type){
        case CouponsActionTypes.FetchCoupons:
            newState.coupons = action.payload;
        break;

        case CouponsActionTypes.AddCoupon:
            newState.coupons.push(action.payload);
            break;

        case CouponsActionTypes.DeleteCoupon:
            const index = newState.coupons.findIndex(c=>c.id === action.payload)
            if(index >= 0)
                newState.coupons.splice(index, 1);
    }
    return newState;
}
export const couponStore= createStore(couponReducer);

