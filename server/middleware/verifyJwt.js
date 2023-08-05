const express= require('express');
const jwt= require('jsonwebtoken');

const verifyJwt= async (req,res,next)=> {

    try{
        const data= req.headers.authorization;
      //  console.log(data);
        if(data){
            const token= data.split(" ")[1];
         //console.log(token);
        jwt.verify(token,process.env.SECRET_KEY , (err, id)=> {
            if(err){
                return res.status(400).json(`damnnnnnnn ${err}`);
            }
            req.id= id;
            next();
        })
        }else{
            res.sendStatus(401);
        }
        
    }catch(err){
      
        console.log(err);
    }
}

module.exports= verifyJwt;