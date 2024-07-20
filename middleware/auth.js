const jwt = require('jsonwebtoken');
const {Unauthenticated} = require('../errors');

const authMiddleware = async (req, res, next)=>{
    //console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new Unauthenticated('No Token provided');
    }

    const token = authHeader.split(' ')[1]; 

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id, username} = decoded;
        req.user = {id, username};
        next();
    }
    catch(err){
        throw new Unauthenticated('Not Authorized to access this route');
    }
}

module.exports = authMiddleware;
