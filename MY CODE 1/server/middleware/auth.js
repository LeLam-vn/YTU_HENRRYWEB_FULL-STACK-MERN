const jwt = require('jsonwebtoken')

// Authorization: Bearer saffhw8sd8fys89dfywe89dfya9sus98dy9sf
const verifyToken = (req,res,next)=>{
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    console.log('req.header: ', req.header)


    if(!token)
        return res.status(401).json({success: false, message:'Assess token not found'})
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.userId = decoded.userId
        console.log('req.userId: ', req.userId)
        next()

    }
    catch (error) {
        console.log(error)
        res.status(403).json({success: false, massage:'Invalid token!!!'})
    }
}
module.exports = verifyToken