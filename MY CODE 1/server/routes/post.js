const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const verifyToken = require('../middleware/auth')


//@ route GET /api/posts
//desc Get Posts
//@access Private

router.get('/', verifyToken, async (req,res)=>{
    try{
        const posts = await Post.find({user:req.userId})
        res.json({
            success: true,
            posts
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({success: false, massage:'Internal server error!!!'})
    }
})

//@ route POST /api/posts
//desc Create post
//@access Private

router.post('/', verifyToken, async (req,res)=>{
    const {title, description, url, status} = req.body;
    //Simple validation
    if(!title)
        return res.status(400).json({success:false, message:'Title is required!!!'})
    try{
        const newPost = new Post({
            title:title,
            description:description,
            url:(url.startsWith('http://')?url:`http://${url}`),
            status:status||'TO LEARN',
            user:req.userId
        });
        await newPost.save();
        res.json({success: true, message:'Happy learning!!!', post: newPost })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({success: false, massage:'Internal server error!!!'})
    }

})
module.exports = router