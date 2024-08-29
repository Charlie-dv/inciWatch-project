// require("dotenv").config();
// const jwt = require('jsonwebtoken')

// const auth = async(req, res, next)=>{
//     try {

//         // get authorization header
//         const auth = await req.header.authorization;
//         if(!auth){
//             return res.status(401).json({
//                 message: "see the admin for authorization "
//             })
//         }else{
//             // verify the token
//             const token = await auth.split(" ")[1]
//             if(token){
//                 jwt.verify(token, process.env.JWT_SERECT,(error, payload)=>{
//                     if(error){
//                         res.json({
//                             message: "invalid token"
//                         })
//                     }else{
//                         res.user = payload
//                         next();
//                     }
//                 });
//             }else{
//                 res.status(404).json({
//                     message: "admin does not have a token"
//                 })
//             }
//         }

//     } catch (error){
//         res.status(500).json({
//             message: error.message
//         })
//     }
// }

// module.exports = auth;