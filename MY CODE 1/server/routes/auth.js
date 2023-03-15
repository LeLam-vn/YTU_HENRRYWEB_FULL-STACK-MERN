const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const verifyToken = require("../middleware/auth");
// router.get('/', (req,res)=>res.send('USER ROUTE'))



//@route GET api/auth
//@desc Check if user is logged in
//@access Public

router.get('/', verifyToken, async (req,res)=>{
    try{
        const user = await User.findById(req.userId).select('-password')
        if(!user) return res.status(400).json({
            success: false,
            message:'User not found'
        })
        res.json({ success: true, user })
        console.log('Login successfully!!!')
    }
    catch (error) {
        console.log(error)
        res.status(500).json({success: false, massage:'Internal server error!!!'})
    }
})


//@route POST /api/auth/register
//@desc Register User
//@ access publish
router.post('/register', async (req,res)=>{
    const {username, password} = req.body

    //Simple validation
    if (!username||!password)
        return res
            .status(400)
            .json({success: false, massage:'Missing username or/and password'})
    try{
        //Check your username existing
        const user = await User.findOne({username:username})
        if(user)
            return res
                .status(400)
                .json({success: false, massage:'Username already taken'})
        //AllGood
        const hashedPassword = await argon2.hash(password)
        const newuser = new User({username:username, password: hashedPassword})
        await newuser.save()

        // Return Token
        const accessToken = jwt.sign({userId: newuser._id}, process.env.ACCESS_TOKEN_SECRET)


        return res.json({success:true, massage:'User creates successfully', accessToken})
    }

    catch (error) {
        console.log(error)
        res.status(500).json({success: false, massage:'Internal server error!!!'})
    }

})

//@route POST /api/auth/login
//desc Login user
//Access publish

router.post('/login', async (req,res)=>{
    const {username, password} = req.body;
    //Simple validation
    if(!username||!password)
        return res
            .status(400)
            .json({success: false, message:'Missing username and/or password!!!'})
    try{
        const user = await User.findOne({username: username})
        if(!user)
            return res.status(400).json({success:false, message:'Incorrect username!!!'})
        //Username found
        const passwordValid = await argon2.verify(user.password, password)
        if(!passwordValid)
            return res.status(400).json ({success: false, message:'Incorrect password!!!'})
        //all good
        // Return token
        const accessToken = jwt.sign({userId:user._id}, process.env.ACCESS_TOKEN_SECRET)
        res.json({
            success: true,
            massage: 'User Login Successfully',
            accessToken
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({success: false, massage:'Internal server error!!!'})
    }
})


module.exports = router
