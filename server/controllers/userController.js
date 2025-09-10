
import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import Razorpay from 'razorpay'
//api to register user

const registerUser=async(req,res)=>{
    try{
      const{name,email,password}=req.body
      
      if(!name||!password||!email){
        return res.json({success:false,message:'Missing Details'})
      }

       if(!validator.isEmail(email)){
         return  res.json({success:false,message:'enter a valid email'})
       } 

       if(password.length<8){
         return res.json({success:false,message:'enter a strong password'})
       }

       //hashing user password

       const salt=await bcrypt.genSalt(10)
       const hashedPassword=await bcrypt.hash(password,salt)

       const userData={
        name,email,password:hashedPassword
       }

       const newUser=new userModel(userData)
      const user=await newUser.save()
      //in this user variable we get a by default unique id

       const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

       res.json({success:true,token})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//API for user login
const loginUser=async(req,res)=>{
    try{
       const {email,password}=req.body
       const user=await userModel.findOne({email})
       if(!user){
         return res.json({success:false,message:'User does not exist'})
       }

       const isMatch=await bcrypt.compare(password,user.password)
       if(isMatch){
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token})
       }
       else{
         res.json({success:false,message:"invalid credentials"})
       }
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to get user profile
const getProfile=async(req,res)=>{
     try{
       const {userId}=req.body
       const userData=await userModel.findById(userId).select('-password')
       res.json({success:true,userData})
     }
     catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
     }
}

//API to update user profile
const updateProfile=async(req,res)=>{
    try{
      const {userId,name,phone,address,dob,gender}=req.body
      const imageFile=req.file

      if(!name||!phone|| !dob || !gender){
         return res.json({success:false,message:"Data Missing"})
      }
      await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
      if(imageFile){
        //upload image to cloudinary

        const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
        const imageURL=imageUpload.secure_url

        await userModel.findByIdAndUpdate(userId,{image:imageURL})
      }
      res.json({success:true,message:'profile updated'})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    // 🔴 Check in DB if this slot is already booked
    const existingAppointment = await appointmentModel.findOne({
      docId,
      slotDate,
      slotTime,
      cancelled: false, // only check active appointments
    });

    if (existingAppointment) {
      return res.json({
        success: false,
        message: "Slot not available. Please choose another time.",
      });
    }

    let slots_booked = docData.slots_booked || {};

    // Update slots_booked
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({
          success: false,
          message: "Slot not available. Please choose another time.",
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    const userData = await userModel.findById(userId).select("-password");

    const docDataObj = docData.toObject();
    delete docDataObj.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Save updated slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    return res.json({ success: true, message: "Appointment booked" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Server error" });
  }
};

//API to get appointments for frontend my-appointments page

const listAppointment=async(req,res)=>{
    try{
      const{userId}=req.body
      const appointments=await appointmentModel.find({userId})
       res.json({success:true,appointments})
    }
    catch(error){
      console.log(error)
    }
}


const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.body.userId;   // ✅ take from middleware

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked || {};
    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
     
       if (slots_booked[slotDate].length === 0) {
    delete slots_booked[slotDate];
  }


      
    }

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//pay online API
const razorpayInstance=new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET 
})
const paymentRazorPay=async(req,res)=>{
    
   try{
     
        const {appointmentId}=req.body
  const appointmentData=await appointmentModel.findById(appointmentId)

   if(!appointmentData|| appointmentData.cancelled){
     return res.json({success:false,message:"Appointment Cancelled or not found"})
   }

   //creating options for razorpay 
   const options={
    amount:appointmentData.amount*100,
    currency:process.env.CURRENCY,
    receipt:appointmentId
}
//creation of order
 const order = await razorpayInstance.orders.create(options)
  res.json({success:true,order})
  
}
   catch(error){
    console.log(error);
    res.json({ success: false, message: error.message });
   }
  }

  

export {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment,paymentRazorPay}