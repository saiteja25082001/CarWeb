
"use server"
import DBConnection from "../utils/config/db";
import UserModel from "../utils/models/User";

export async function registerAction(registerDetails) {
    console.log(registerDetails);
    await DBConnection();
    await UserModel.create(registerDetails);
    return {success:true}
} 
