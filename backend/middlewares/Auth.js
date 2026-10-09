const jwt = require("jsonwebtoken");

const ensureAuthentication = (req,res,next) =>{

    const auth = req.header('authorization')

    if(!auth){
        return res.status(403).json({
            message: "Unauthorize, JWT token is required"
        })
    }

    try{
        const decoded = jwt.verify(auth , process.env.JWT_SECRET_KEY);
        req.user = decoded
        next()
    }
    catch(err){
        return res.status(403).json({
            message: "Unauthorize, JWT token wrong or expired"
        })
    }
}

module.exports = ensureAuthentication