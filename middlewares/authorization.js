const jwt=require('jsonwebtoken')
const {promisify}=require('util')

const verifyToken = async(req, res, next) => {
    const token = req.headers.authorization;
    if(!token)res.status(401).json('please login to have access')
    const decoded=await promisify(jwt.verify)(token,'dfs.hfjf4r8;95t7;treglgh3233d')
    req.userId = decoded.userId;
    console.log(req.token)
    next()
  };
  
  module.exports=verifyToken