const express = require('express');

const router = express.Router();

const Post = require('../models/Post');


//GETS ALL THE POSTS
router.get('/', async (req, res) => { //this is a responce sending data to server page
    try{
        const posts = await Post.find(); // this is all the posts that we are going to get, we call the find() method from mongoose to get alll the posts from the modle  .limit(2) to retrn two posts only
        res.json(posts);
    }catch (err){
        res.json({message:err}); //error check
    }
});


/*
router.get('/', (req, res) => { //this is a responce sending data to server page
    res.send('we are on posts');  // debug to display that the router is working with some text on the screen
});
*/

//SUBMITS A POST
router.post('/', async (req,res) => { //this is a request to api request
    const post = new Post({
        title: req.body.title,
        description: req.body.description      //creates a new post based off the schema in the models for posts this is an object
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({message: err});
    }
});

//SPECIFIC POST

router.get('/:postId', async (req, res) => { //postId is a dynamic paramter... after the /posts/asldkfh
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({message: err});
    }

   //console.log(req.params.postId); //this logs the get request search
});


//DELETE A SPECIFIC POST
router.delete('/:postId', async (req,res) => {
    try {
        const removedPost = await Post.deleteOne({ _id: req.params.postId });   //Post.deleteOne or Post.deleteMany or Post.bulkWrite
        res.json(removedPost); // same here this is the out put responce for us to see what is going on
    } catch (err) {
        res.json({message: err});
    }
});


//Update a post

router.patch('/:postId', async (req,res) => {
    try {
        const updatedPost = await Post.updateOne // const updatedPost is the variable that holds the data for the lower res
        (
            { _id: req.params.postId },
            { $set: { title: req.body.title } }
        );
        res.json(updatedPost); // this is the output to the console or to the body somewhere out put "res" for responce
    } catch (err) {
        res.json({message: err});
    }
});



// old way of sending the data
/*
    post.save()
    .then(data => {
    res.json(data); //res.status.json(data);
    })
    .catch(err => {
        res.json({message: err});
    });
});
*/
/* //this is how to debug
router.get('/', (req, res) => {
    console.log(req.body);
});
*/



/*
router.get('/specfic', (req, res) => {
    res.send('galler');
});
*/

module.exports = router;





