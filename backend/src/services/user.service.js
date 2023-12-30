const UserModel = require("../models/user.model")

class UserService {
    
    validatedata = (data) =>{
        if(!data.name){
            throw {status: 400, msg: "Name required"}
        }
        if(!data.email){
            throw {status: 400, msg: "Email required"}
        }
        
        if(!data.password){
            throw {status: 400, msg: "Password required"}
        }

        if(data.password.length < 8){
            throw {status: 400, msg: "Password must be of atleast 8 characters"}
        }

        if(!data.role){
            throw {status: 400, msg: "Role required"}
        }
        
    }

    registerUser = async(data) => {
        try{
            let user = new UserModel(data)
            return await user.save();
        } catch(exception){
            if(exception.code === 11000){
                throw{status: 400, msg: "Email should be unique"}
            }
            throw exception;
        }
    }

    getUserByEmail = async(email) => {
        try {
            let user = await UserModel.findOne({
                email: email
            })
            if(user){
                return user;
            } else {
                throw "User does not exists"
            }
        } catch(except){
            throw except
        }
    }

    getUserById = async(id)=>{
        try {
            let userDetail =await UserModel.findById(id);
            return userDetail
        } catch(err){
            throw err
        }
    }

    updatedata = (data) =>{
        if(!data.name){
            throw {status: 400, msg: "Name required"}
        }

        if(!data.role){
            throw {status: 400, msg: "Role required"}
        }
        
    }

    getUserByFilter = async(filter)=>{
        try {
            let userDetail = await UserModel.find(filter);

            // let userDetail = await this._db.collection("users").findOne({
            //     _id: new ObjectId(id)
            // })
            return userDetail
        } catch(err){
            throw err
        }
    }

    getAllUsers = async ({perPage = 10, currentPage =1}) =>{
        try{
            let skip = (currentPage-1) * perPage;

            let data = await UserModel.find()
            .sort({_id: -1})
            .skip(skip)
            .limit(perPage)
            return data;
        } catch(exception) {
            console.log(exception)
            throw{status: 500, msg: "Querry execution fialed."}
        }
    }

    getAllCount = async (filter ={}) => {
        return await UserModel.count(filter)
    }

    deleteUserById = async(id) => {
        try{
            let delResponse = await UserModel.findByIdAndDelete(id)
            if(delResponse){
                return delResponse
            } else{
                throw{status:404, msg: "User has been already deleted or does not exist"}
            }
            
        }catch(except){
            throw except
        }
    }

    getUserByFilter = async(filter, paging) =>{
        try{
            // let skip = (paging.currentPage-1) * paging.perPage;
            let response = await UserModel.find(filter)
            .sort({_id: -1})
            // .skip(skip)
            .limit(10)
                return response;
        }catch(exception){
            throw exception
        }
    }

    updateUser = async (data, id) => {
        try {
            let userDetail = await UserModel.findByIdAndUpdate(id, {$set: data});
            return userDetail

        } catch(err){
            throw err
        }

    }
}

const userServ = new UserService()
module.exports = userServ