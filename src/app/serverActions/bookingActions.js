"use server"
import DBConnection from "../utils/conifg/db";
import UserModel from "../utils/models/User";
import bookingModel from "../utils/models/Booking";
import auth from '@/app/auth'

const bookingActions = async (bookingDetails) => {
 
    const  session =await auth();
    

    console.log("email check",session.email);

    await DBConnection();
    const user=await UserModel.findOne({email:session.email});

    if(!user){
        return {success:false,message:'user not found'}
    }

    const userId=user._id.toString();

    const userBookingDetails=await  bookingModel.create({bookingDetails});
       
  await UserModel.findByIdAndUpdate(
    userId,
    {$push:{bookings:userBookingDetails._id}},
    {new:true}
  )  
  return {success:true}
    
}

export default bookingActions