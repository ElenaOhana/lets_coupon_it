class Config{

}

class DevelopmentConfig extends Config{
    public adminUrl: string =  "http://localhost:8080/my-coupon-app/admin/";
    public companyUrl: string =  "http://localhost:8080/my-coupon-app/company/";
    public customerUrl: string =  "http://localhost:8080/my-coupon-app/customer/";
    public couponsForAllUrl: string = "http://localhost:8080/my-coupon-app/customer/coupons-for-all";
    public ableCouponsForAllUrl: string = "http://localhost:8080/my-coupon-app/customer/able-coupons-for-all";
    public authUrl: string = "http://localhost:8080/my-coupon-app/auth/";
}

class ProductionConfig extends Config{
    public adminUrl: string = "https://lets-coupon-it.up.railway.app/my-coupon-app/admin/";
    public companyUrl: string = "https://lets-coupon-it.up.railway.app/my-coupon-app/company/";
    public customerUrl: string = "https://lets-coupon-it.up.railway.app/my-coupon-app/customer/";
    public couponsForAllUrl: string = "https://lets-coupon-it.up.railway.app/my-coupon-app/customer/coupons-for-all"
    public ableCouponsForAllUrl: string = "https://lets-coupon-it.up.railway.app/my-coupon-app/customer/able-coupons-for-all"
    public authUrl: string = "https://lets-coupon-it.up.railway.app/my-coupon-app/auth/";
}

const appConfig = process.env.NODE_ENV === "development" ? // If I do npm start => this is Development state, If I do nmp build => Production state.
    new DevelopmentConfig() : new ProductionConfig();

    export default appConfig;

    