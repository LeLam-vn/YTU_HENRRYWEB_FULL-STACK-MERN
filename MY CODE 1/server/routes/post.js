const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const verifyToken = require('../middleware/auth')


//@ route GET /api/posts
//desc Get Posts
//@access Private

router.get('/', verifyToken, async (req,res)=>{
    try{
        const posts = await Post.find({user:req.userId}).populate('user',['username'])
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
    const {title, description, url, status} = req.body
    //Simple validation
    if(!title)
        return res
            .status(400)
            .json({success:false, message:'Title is required!!!'})
    try{
        const newPost = new Post({
            title:title,
            description:description,
            url:(url.startsWith('http://')?url:`http://${url}`),
            status:status||'TO LEARN',
            user:req.userId
        });
        console.log('req.userId: ', req.userId)
        console.log('newPost: ', newPost)
        console.log('newPost.user: ', newPost.user)
        await newPost.save();
        res.json({success: true, message:'Happy learning!!!', post: newPost })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({success: false, massage:'Internal server error!!!'})
    }
})

//@ route PUT /api/posts
//desc Update post
//@access Private

router.put('/:id',
    verifyToken,
    async (req, res) => {
        const {title, description, url, status} = req.body

        //Simple validation
        if (!title)
            return res
                .status(400)
                .json({success: false, message: 'Title is required'})

        let updatedPost = {
            title: title,
            description: description || '',
            url: (url.startsWith('http://') ? url : `http://${url}`) || '',
            status: status || 'TO LEARN',
        }

        const postUpdateCondition = {_id: req.params.id, user: req.userId}
        updatedPost = await Post.findOneAndUpdate(
            postUpdateCondition,
            updatedPost,
            {new: true}
        )

        //User not authorised to update post or post not found
        if (!updatedPost)
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Post not found or user not authorized!!!'
                })
        res.json({
            success: true,
            message: 'UPDATED POST!!!',
            updatedPost
        })
})

// @route DELETE /api/posts
// Desc delete post
// access private

router.delete('/:id', verifyToken, async (req,res)=>{
    try{
        const postDeleteCondition = {_id: req.params.id, user:req.userId}
        const deletePost = await Post.findOneAndDelete(postDeleteCondition)

        //user not authorize or not found

        if(!deletePost)
            return res.json({
                success: false,
                massage: 'Post not found or user not authorised'
            })
        res.json({
            success: true,
            post:deletePost
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({success: false, massage:'Internal server error!!!'})
    }

})

    module.exports = router