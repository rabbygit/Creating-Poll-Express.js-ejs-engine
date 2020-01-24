const express = require('express') // import expres
const morgan = require('morgan') // Third party middleware.
const mongoose = require('mongoose') // ORM for mongoDB 

const pollController = require('./pollController')

const app = express(); // creating application calling express function.

app.set('view engine' , 'ejs') // template engine

// If I want to use different directory for view engine
// then I have to recognize it by app.set('views' , 'whereIwillKeepThoseTemplate')
// But If views is my template folder.then It's not needed

app.use(morgan('dev')) // app level middleware.

// by default its true.True means nested object is allowed and false means not allowed.
// the URL-encoded data will be parsed with the qs library. 
// false means the URL-encoded data will instead be parsed with the querystring library.
app.use(express.urlencoded({extended: true})) // Built-in middleware.
// express.json() is a method inbuilt in express 
// to recognize the incoming Request Object as a JSON Object.
app.use(express.json()) // Built-in middleware

app.get('/create' , pollController.createPollGetController)
app.post('/create' , pollController.createPollPostController)
app.get('/polls' , pollController.getAllPolls)
app.get('/polls/:id' , pollController.viewPollGetController)
app.post('/polls/:id' , pollController.viewPollPostController)



// Root route
app.get('/' , (req,res)=>{
    res.render('home')
})


// we can use localhost mongoDB. for this we need to install it
// we can also use mongoDbcampus for manage database
// { useNewUrlParser: true ,  useUnifiedTopology: true} those are the options for mongoose
// In mongoDB, they deprecated current server and engine monitoring package, so you need to use new server and engine monitoring package
mongoose.connect('mongodb://rabby:rabby1234@ds037977.mlab.com:37977/express-cc',{ useNewUrlParser: true ,  useUnifiedTopology: true})
    .then(()=>{
        app.listen(4545 , ()=>{
            console.log("application is ready to serve on port 4545")
        })
    })
    .catch(e => {
        console.log(e)
    })
