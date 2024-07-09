const express = require("express");
const authRoutes =express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
let refreshTokens=[];

let user={
    id:101,
    name:"MAHTAB",
    password:"Hello"
}

authRoutes.get('/login',(req,res)=>{
let accessToken = jwt.sign(user,process.env.SECURITY_KEY,{expiresIn:'1m'})     

res.json({ user:user ,accessToken:accessToken,refreshTokens: refreshTokens})

})

authRoutes.post('/newToken/:refToken',(req,res)=>{
    let token = req.params.refToken;

    let results = refreshTokens.includes(refToken)
    console.log(results);

    try {
        let response =jwt.verify(refToken,process.env.REFRESH_SECRET_KEY)

        console.log(response);

       let newAcessToken = generateAccessToken(response.id)
        res.send({msg:"Refresh token is valid" ,accessToken:newAcessToken})
    }

        res.send("checking  the exitence of refresh Token")
})


authRoutes.post('/blogs/:id',(req,res)=>{
let token =req.body.token;
let accessToken= generateAccessToken(user)
let refreshTokens = jwt.sign(user,process.env.REFRESH_SECRET_KEY, {expiresIn:'1d'})
refreshTokens.push(refreshTokens);
let results = jwt.verify(token,process.env.SECURITY_KEY)
res.send({msg:results})
})



function generateAccessToken(){
    jwt.sign(user,process.env.SECURITY_KEY,{expiresIn:'1m'})
}


module.exports = authRoutes;
