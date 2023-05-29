import axios from "axios";
import { CategoryModel } from "../Models/CategoryModel";
import appConfig from "../Utils/Config";

class CategoryService{
   /*  public async getCategory(categoryName: string) { // find by name 
        const response = axios.get<CategoryModel>(appConfig.companyUrl + "category/"+`${categoryName}`);
        return (await response).data;
    } */
}

const categoryService = new CategoryService();
export default categoryService;