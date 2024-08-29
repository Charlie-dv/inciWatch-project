const Reporter = require('../model/reporterModel');
const axios = require('axios');

// Register a new User
const createUser=async(req,res)=>{
    try {
        const {firstName,lastName,email,password}=req.body
        if(!email||!firstName||!firstName||!password){
            return res.status(400).json({
                message:'please enter all details'
            })
        }
        const existingUser=await userModel.findOne({email:email.toLowerCase()})
        if(existingUser){
            return res.status(400).json({
                message:"user with email already exist"
            })
            
        }else{
            const saltPassword=await bcrypt.genSalt(10)
            const hashPassword=await bcrypt.hash(password,saltPassword);
            const user=new userModel({
                firstName,
                lastName,
                email,
                 password:hashPassword
            })
            // get token to verify if a user signs up
            const token=Jwt.sign({
                userId:user._id,
                email:user.email
                 },process.env.JWT_SECRET
                 ,{expiresIn:"30mins"})
                 
            // const verifyLink= https://todoapp-2-rnv7.onrender.com/api/v1/user/verifyuser/${token}
            // let mailOptions={
            //     email:user.email,
            //     subject:'verification email',
            //     html:htmlFile(verifyLink,user.fullName)
            // }
            // console.log( user.email)
            // await user.save()
     
            // await sendMail(mailOptions);
           res.status(201).json({
                message:"new user created",
                data:user
            })
        
        }
        
    } catch (error) {
      res.status(500).json({
        message:error.message
      })  
    }
    
    }

    // login users
    const loginUser=async(req,res)=>{
        try {
            const {email,password}=req.body
            const checkMail=await userModel.findOne({email})
            if(!checkMail){
                return res.status(400).json({
                    message:"user with email does not exist"
                })
            }else{
                const verifyPassword=await bcrypt.compare(password,checkMail.password)
                if(!verifyPassword){
             return  res.status(400).json({
                message:"incorrect password"
               })
            
                }else{
                    if(!checkMail.isVerified){
                return res.status(400).json({
                    message:'user not verified'
                })
                    }
                 const token=Jwt.sign({
                userId:checkMail._id,
                email:checkMail.email,
               
                 },process.env.JWT_SECRET
                 ,{expiresIn:"30mins"})
                 res.status(200).json({
                    message:"login successful",
                    data:checkMail,
                    token
                 })
                }
    
            } 
        } catch (error) {
         res.status(500).json({
            message:error.message
         })   
        }
    }
