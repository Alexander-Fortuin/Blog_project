'use strict';

var express = require('express');
var router = express.Router();
var deleteRouter = require('../routes/delete');

//Can import directly
var Posts = require('../db.json');
var SidePosts = require('../bd.json');
var request = require('request');


// /////////////////////////
const pjson = require('../package.json');
// const express = require('express');
// const expressSanitizer = require('express-sanitizer');
// const ejs = require('ejs');
/////////////////////////////////////
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(Posts);
  res.render('index', { title: 'Home', blogs: Posts.posts, movies: Posts.sideposts});
});

/* GET Archive page. */
router.get('/archive', function(req, res, next) {
  console.log(Posts);
  res.render('archive', { title: 'Archive', blogs: Posts.posts, movies: Posts.sideposts});
});

/* GET View page. */
// router.get('/view', function(req, res, next) {
//   console.log(Posts);
//   res.render('view');
// });

/* GET View page. */
router.get('/view/:id', function(req, res, next) {

      let urlPath = req.path;
      let postVal = urlPath.slice(-1);

       res.render('view', { title: 'Read More', posts: Posts.posts[postVal -1] });

    });

router.get('/edit/:id', function(req, res, next) {

      let urlPath = req.path;
      let postVal = urlPath.slice(-1);

       res.render('edit', { title: 'Edit Post', posts: Posts.posts[postVal -1] });
    });


    // Route for delete
    /* GET create page. */
    router.get('/delete/:id', function(req, res, next) {
     console.log(req.params.id)
    //make a post request to our database
    request({
     uri: "http://localhost:8000/posts/"  + req.params.id,
     method: "DELETE",
     }, function(error, response, body) {
         let data = {
             message: 'Successfully Removed.',
         }

         res.redirect('..');
     });
    });

    // Route for update
    /* GET create page. */
    router.post('/update/:id', function(req, res, next) {
     //make a post request to our database
    request({
     uri: "http://localhost:8000/posts/"  + req.params.id,
     method: "PUT",
     form :{
       "title": req.body.title,
       "author": req.body.author,
       "time": req.body.time,
       "image": req.body.image,
       "content2": req.body.content2,
       "content": req.body.content,
     }
     }, function(error, response, body) {
         res.redirect('/');
     });
    });




// new Post
router.get('/newBlog', function(req, res, next) {
  res.render('newBlog', { title: 'blog'});
});


router.post('/newBlog', function(req, res, next){

  // variable for post
  let obj ={
    "title": req.body.title,
    "author": req.body.author,
    "time": req.body.time,
    "image": req.body.image,
    "content": req.body.content,
  }

  request.post({
    url:'http://localhost:8000/posts',
    body:obj,
    json:true
  }, function(error, response, body){
    res.redirect('/');
  });

});

router.post('/newBlog', function(req, res, next) {
  res.send(req.body);

});

/* GET create page. */
router.get('/newBlog', function(req, res, next) {

  res.render('newBlog', { title: "newBlog"});
  console.log(req.body);

});

/* GET Sign Up page. */
router.get('/signUp', function(req, res, next) {
  res.render('signUp', { title: 'signUp' });
});


router.post('/signUp', function(req, res, next){

  // variable for post
  let obj ={
    "name": req.body.name,
    "surname": req.body.surname,
    "email": req.body.email,
    "password": req.body.password,
  }

  request.post({
    url:'http://localhost:8000/user',
    body:obj,
    json:true
  }, function(error, response, body){
    res.redirect('/');
  });

});

router.post('/signUp', function(req, res, next) {
  res.send(req.body);

});

// ////////////////////////////////////////////////////////////////////////////

// new route
// router.get('/', function(req, res) {
// res.render('new');
// });

// // create route
// router.post('/', function(req, res) {
// const requestedBlog  = req.body.posts;///////////////////////////////////////
// requestedBlog.body = req.sanitize(requestedBlog.body);
//
// Posts.create(requestedBlog, function(err, createdBlog) {
//   if (err) {
//     res.render('new');
//   } else {
//     res.redirect('/');
//   }
// });
//
// });
//
// // show route
// router.get('/view/:id', function(req, res) {
// const id = req.params.id;
//
// Posts.findById(id, function(err, foundBlog) {
//   if(err) {
//     console.log('ERROR:', err);
//     res.redirect('/');
//   } else {
//     res.render('show', {blog: foundBlog});
//   }
// });
// });
//
// // edit route
// router.get('/edit/:id', function(req, res) {
// const id = req.params.id;
//
// Posts.findById(id, function(err, foundBlog) {
//   if(err) {
//     console.log('ERROR', err);
//     res.redirect('/');
//   } else {
//     res.render('edit', {posts: foundBlog});
//   }
// });
// });
//
// // update route
// router.put('/edit/:id', function(req, res) {
// const id = req.params.id;
// const requestedBlog = req.body.posts;
// requestedBlog.body = req.sanitize(requestedBlog.body);
//
// Posts.findByIdAndUpdate(id, requestedBlog, function(err, updatedBlog) {
//   if (err) {
//     console.log('ERROR:', err);
//     res.redirect('/edit/:id');
//   } else {
//     res.redirect('/view/:id');
//     // res.redirect('/edit/' + id);
//   }
// });
// });
//
// // destroy route
// router.delete('/edit/:id', function(req, res){
// const id = req.params.id;
//
// Posts.findByIdAndRemove(id, function(err) {
//   if(err) {
//     console.log('ERROR:', err);
//   }
//   res.redirect('/view/:id');
// });
// });

// ////////////////////////////////////////////////////////////////////////////





module.exports = router;
