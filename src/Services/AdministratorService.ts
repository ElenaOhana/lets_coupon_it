import appConfig from "../Utils/Config";
import { CompanyModel } from "../Models/CompanyModel";
import axios from "axios";
import { CustomerModel } from "../Models/CustomerModel";

class AdministratorService {
  public async getAllCompanies() {
    const response = axios.get<CompanyModel[]>(appConfig.adminUrl + "company");
    return (await response).data;
  }

  public async getCompany(companyId: number){
    // eslint-disable-next-line
    const response = axios.get<CompanyModel>(appConfig.adminUrl + "company/"+ `${companyId}`);
    return (await response).data;
  }

  public async updateCompanyById(companyId: number, company: CompanyModel) {
    const response = axios.put<number>(appConfig.adminUrl + "company/" + companyId, company);
    return (await response).data;
  }

  public async addCompany(company: CompanyModel) {
    const response = axios.post<CompanyModel>(appConfig.adminUrl + "company", company);
    return (await response).data;
  }

  public async deleteCompany(companyId: number) {
    const response = axios.delete<number>(appConfig.adminUrl + "company/" + companyId);
    return (await response).data;
  }

  // CUSTOMER
  public async getAllCustomers() {
    const response = axios.get<CustomerModel[]>(appConfig.adminUrl + "customer");
    return (await response).data;
  }

  public async getCustomer(customerId: number) {
    const response = axios.get<CustomerModel>(appConfig.adminUrl + "customer/" + customerId);
    return (await response).data;
  }

  public async updateCustomerById(customerId: number, customer: CustomerModel) {
    const response = axios.put<number>(appConfig.adminUrl + "customer/" + customerId, customer);
    return (await response).data;
  }

  public async addCustomer(customer: CustomerModel) {
    const response = axios.post<CustomerModel>(appConfig.adminUrl + "customer", customer);
    return (await response).data;
  }

  public async deleteCustomer(customerId: number) {
    const response = axios.delete<number>(appConfig.adminUrl + "customer/" + customerId);
    return (await response).data;
  }
}

const adminService = new AdministratorService();
export default adminService;


