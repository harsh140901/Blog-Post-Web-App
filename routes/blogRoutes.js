const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();



// router acts like a mini app



router.get('/', blogController.blog_index);

router.get('/create', blogController.blog_create_get);

router.post('/', blogController.blog_create_post);

router.get('/:id', blogController.blog_details);

router.delete('/:id', blogController.blog_delete);




/*
// : inside url needs to be applied for id to be considered as route parameter
router.get('/:id', (req, res) => {//Pls keep the functions which use route parameter below all methods in file otherwise they will consider other valid routes as route parameter(id here) and will give us error
    const id = req.params.id;
    // console.log(id);
    
    Blog.findById(id)
    .then((result) => {
        res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
        console.log(err);
    })
});



router.get('/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});



router.post('/', (req, res) => {
    // console.log(req.body);
    const blog = new Blog(req.body);

    blog.save()
        .then(result => {
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        });
});


router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        });
});
*/




module.exports = router;