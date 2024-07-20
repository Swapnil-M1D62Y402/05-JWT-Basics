//Check for username, password in request body 
//if exists create new json token 
//send back the token to frontend 
//Now if user provides a get request, then with the token,
//server will provide a post response with lucky Number

const jwt = require('jsonwebtoken');
const {BadRequestError} = require('../errors');

const login = async (req,res) => {
    const {username, password} = req.body;
    if(!username || !password){
        throw new BadRequestError('Please provide email and password');
    }   

    //For demo, normally ID is provided by DB 
    const id = new Date().getDate();
    
    //try to keep payload small, better experience for user 
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '10d'});

    res.status(200).json({
        "msg": 'User created',
        //"username":username,
        //"password":password,
        "token": token
    })
}

const dashboard = async (req,res) => {
    const luckyNumber = Math.floor(Math.random()*100);
    res.status(200).json({msg: `Hello, ${req.user.username}`, secret: `Lucky Number : ${luckyNumber}`});

}
module.exports = {
    login,
    dashboard
}