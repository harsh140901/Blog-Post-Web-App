const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const { result } = require('lodash');s
const blogRoutes = require('./routes/blogRoutes');


const app = express();

// Connnet to mongodb
const dbURI = <Your database URL>;
mongoose.connect(dbURI, { useNewURLParser: true, useUnifiedTopology: true }).then((result) => { app.listen(3000); }).catch((err) => { console.log(err); });


app.set('view engine', 'ejs');
// app.set('views', 'myviews');//Changes the default location of template files from views to myviews


//Listen for requests in express
// app.listen(3000);//returns an instance of server just like http.createserver() method in raw node
//The above listen method has been passed to mongoose.connect().then() method because we will listen to requests only when we connect to database 

// Middleware for static files i.e. images,css etc...
app.use(express.static('public'));//This will make all the files in 'public' folder available to user as static files in browser..i.e. will make it public

// Middleware for form data to be attached to request data so that we can save the new blog
app.use(express.urlencoded({ extended: true }));


// Using middleare using morgan module
app.use(morgan('dev'));
// app.use(morgan('tiny'));

/*
// Interacting with db by performing operations on blogs schema

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: "New Blog",
        snippet: "This is the brand new blog....",
        body: "More info about my new blog"
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })

});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('648c25677f95ef633dc84f12')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });

});


*/




// Following 2 functions are the piece of middlewares
// app.use((req, res, next) => {
//     console.log("New Request Made");
//     console.log("Host : ", req.hostname);
//     console.log("Path : ", req.path);
//     console.log("Method : ", req.method);
//     next();
// });

app.use((req, res, next) => {
    // console.log("Inside the next piece of middleware");
    res.locals.path = req.path;
    next();
});



// Routes

/*
app.get('/', (req, res) => {
    // res.write()
    // res.end()
    
    // res.send('<p> Home Page </p>');
    
    // res.sendFile('./views/index.html', { root: __dirname });
    
    const blogs = [
        { title: "Sujit finds eggs", snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' },
        { title: "Priyanka finds eggs", snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' },
        { title: "Harry finds eggs", snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' },
    ];
    
    // res.render('index', { title: 'Home' , blogs : blogs });
    res.render('index', { title: 'Home', blogs });
});

*/

app.get('/', (req, res) => {
    res.redirect('/blogs');
});


// defining blog routes
app.use('/blogs', blogRoutes);
//Making these routes url specific..i.e. url starting with /blogs.. but after making this, we dont need to use router.get('/blogs', ..) instead we will use router.get('/')




// app.post('/blogs', (req, res) => {
//     // console.log(req.body);//Because of express.urlencoded() method
//     const blog = new Blog(req.body);

//     blog.save()
//         .then(result => {
//             res.redirect('/blogs');
//         })
//         .catch(err => {
//             console.log(err);
//         });
// });






app.get('/about', (req, res) => {
    // res.write()
    // res.end()

    // res.send('<p> About Page </p>');

    // res.sendFile('./views/about.html', { root: __dirname });

    res.render('about', { title: 'About' });
});

//redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

//404 page
app.use((req, res) => {//This function gets use for every incoming request, if the code reaches to this point.i.e. for every request/url app.js runs from top to bottom and if the url in app.get() matched then it fires only that callback function and doesnt execute that fiel below.
    // res.sendFile('./views/404.html', { root: __dirname });

    // res.status(404);//This method sets statuscode and returns response object

    // res.status(404).sendFile('./views/404.html', { root: __dirname });

    res.status(404).render('404', { title: '404' });
});//So this must be at the end of the file



