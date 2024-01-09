import HttpService from "../../services/http.service"

class CategoryService extends HttpService {
    //CRUD
    createCategory =async (data) => {
        try {
            let response = await this.postRequest('/category', data, {auth:true, file:true})
            return response
        } catch(exception){
            throw exception
        }
    } 
    getDetailCategory = async (slug) => {
        try {
            let response = await this.getRequest('/category/'+slug+"/detail")
            return response;
        } catch(exception) {
            throw exception
        }
    } 

    listAllCategorys = async (perPage=10, page=1) =>{
        try{
            let response = await this.getRequest("/category?perPage="+perPage+"&page="+page,{auth:true})
            return response
        }catch(exception){
            throw exception
        }
    }

    listAllHomeCategories = async (perpage =10, page=1) => {
        try {
            let response = await this.getRequest("/category/list/home?perPage="+perpage+"&page="+page, {auth:true});
            return response;
        } catch(exception){
            throw exception;
        }
    }

    deleteCategoryById = async (id) => {
        try{
            let response = await this.deleteRequest("/category/"+id, {auth:true});
            return response;

        }catch(exception){
            throw exception
        }
    }

    getCategoryById = async(id) => {
        try{
            let response = await this.getRequest("/category/"+id, {auth:true});
            return response;

        }catch(exception){
            throw exception
        }

    }

    updateCategory = async (data, id) => {
        try{
            let response = await this.putRequest("/category/"+id, data, {auth:true, file:true});
            return response;

        }catch(exception){
            throw exception
        }
    }
}

export default CategoryService