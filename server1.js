import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import mySchemas from './models.js';
import passport from 'passport';
import passportLocalMongoose from "passport-local-mongoose";
import session from 'express-session';
import 'mongoose-encryption';
import dotenv from 'dotenv';

const Schema = mongoose.Schema;
const app = express();
const port = 4000;
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/files',express.static('files'));


const corsOptions = {
    origin: '*',
    credentials : true,
    optionSuccessStatus : 200
}

app.use(cors(corsOptions));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  }));

  app.use(passport.initialize());
  app.use(passport.session());


mongoose.connect("mongodb://127.0.0.1:27017/jobBoardDB", {UseNewUrlParser : true}).then(function(){
      console.log("connected")}).catch(function(err){
      console.log(err);
});

const userSchema = new mongoose.Schema({
    username : String,
    password : String,

})

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);
passport.use('user', User.createStrategy());


// passport.serializeUser((user, done) => {
//     console.log('Serialized user');

//     done(null, {_id: user._id});
// })

// passport.deserializeUser((id, done) => {
//     console.log("Deserializing user...");
//     User.findOne(
//         {_id: id},
//         (err, user) => {
//             console.log("Deserialized user ");

//             done(null, user);
//         }
//     )
// });

passport.serializeUser((user, done) => {
    done(null, { type: 'user', id: user._id });
});

passport.deserializeUser(async (sessionData, done) => {
    if (sessionData.type === 'user') {
        try {
            const user = await User.findById(sessionData.id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    } else {
        done(new Error('Invalid session type'), null);
    }
});

const employerSchema = new Schema({
    username : String,
    password : String,
    jobPostId : [String],
    applicationId : [String]
})

employerSchema.plugin(passportLocalMongoose);

const Employer = new mongoose.model("Employer", employerSchema);

passport.use('employer', Employer.createStrategy());

passport.serializeUser((employer, done) => {
    done(null, { type: 'employer', id: employer._id });
});

passport.deserializeUser(async (sessionData, done) => {
    if (sessionData.type === 'employer') {
        try {
            const employer = await Employer.findById(sessionData.id);
            done(null, employer);
        } catch (error) {
            done(error, null);
        }
    } else {
        done(new Error('Invalid session type'), null);
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })






app.get('/',(req,res)=>{
    console.log("running");
    res.send("running");
});

app.get('/posts/:jobPosition&:jobLocation',(req,res)=>{
    
    const jobPosition = req.params.jobPosition;
    const jobLoc = req.params.jobLocation;
    console.log(jobPosition);
    mySchemas.JobPost.find({position : jobPosition , location : jobLoc}).then(function(filteredJobPosts){
    if(!filteredJobPosts)
    res.json({message : "no posts found"});

    else
    {
    console.log(filteredJobPosts);
    res.json(filteredJobPosts);
    }
    });
    
   
    
});

app.get('/jobDetails/:id',(req,res)=>{
    const postId = req.params.id;
    mySchemas.JobPost.findById({_id : postId}).then(function(filteredJobPosts){
        if(!filteredJobPosts)
        res.json({message : "no posts found"});
    
        else
        {
        console.log(filteredJobPosts);
        res.json(filteredJobPosts);
        }
        });
})

app.post('/jobDetails/:id', upload.single('resume'),(req, res) => {
    
    const postId = req.params.id;
   
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;
    const name = req.file.filename;
    
    const newApplication = new mySchemas.Application({
      firstName: fName,
      lastName: lName,
      email: email,
      resume: name, // Assuming you want to store the file data as a buffer
    });
    
    newApplication.save()
    .then(async newP => {
        const id = newP._id;
        try {
            Employer.findOne({ jobPostId: { $elemMatch: { $eq: postId } } })
            .then(foundEmployer => {
            if (foundEmployer) {
            console.log('Employer found:', foundEmployer);
            foundEmployer.applicationId.push(id)
            foundEmployer.save();
            } else {
            console.log('Employer not found');
        }
        })

        mySchemas.JobPost.findById(postId)
            .then(foundPost => {
            if (foundPost) {
            console.log('Post found:', foundPost);
            foundPost.applicationId.push(id)
            foundPost.save();
            } else {
            console.log('Post not found');
            }
        });
        }   
        catch(error){
        console.error('Error finding employer:', error);
        }
        });
    });

app.get('/employers/:id',(req,res)=>{
    const employerPosts = [];
    const empId = req.params.id;
    Employer.findById(empId).populate('jobPostId') 
    .then((err, foundEmployer) => {
        if (err) {
            console.error('Error:', err);
            return;
        }

        if (foundEmployer) {
            console.log('Employer found:', foundEmployer);

            // Access the populated posts
           employerPosts = foundEmployer.jobPostId;

            console.log('Employer posts:', employerPosts);
        } else {
            console.log('Employer not found');
        }

    })
    mySchemas.JobPost.find({ _id: { $in: employerPosts } }).then(function(posts){
        if(posts)
        res.json(posts);

        else
        res.json({'message' : 'No posts'});
    })
    
})


app.post('/employers/:id',(req,res)=>{
    const empId = req.params.id;
    
    const comp = req.body.jobDetails.company;
    const pos = req.body.jobDetails.role;
    const loc = req.body.jobDetails.location;
    const skillSet = req.body.jobDetails.skillSet;
    const newPost = new mySchemas.JobPost({
    company : comp,
    position : pos,
    location : loc,
    skillSet : skillSet
    });
    newPost.save()
    .then(async newP => {
        const postId = newP._id;

        try {
            const employer = await Employer.findById(empId);
            console.log(employer);

            employer.jobPostId.push(postId);
            console.log(employer.jobPostId);

            // Save the updated employer with the new post ID
            await employer.save();

            console.log('Post ID added to Employer successfully');
        } catch (error) {
            console.error('Error updating employer:', error);
        }
    })
    .catch(error => {
        console.error('Error saving the new post:', error);
    });
     
    
    res.json({message : "posted the data"});
});


app.get('/employer/:postid/applications/:id', (req,res)=>{
    const postId = req.params.postid;
    mySchemas.JobPost.findById(postId).then((foundPost) => {
        
        if (foundPost) {
            console.log('Post found:', foundPost);
           mySchemas.Application.find({ _id: { $in: foundPost.applicationId } }).then(function(apps){
            if(apps)
            {
            console.log(apps);    
            res.json(apps);
            }
    
            else
            res.json({'message' : 'No posts'});
        })
        } else {
            console.log('Employer not found');
        }
        
});
});


app.get('/employer/posts/:id', (req,res)=>{
    const empId = req.params.id;
    Employer.findById(empId).then((foundEmployer) => {
        
        if (foundEmployer) {
            console.log('Employer found:', foundEmployer);

           foundEmployer.jobPostId;
           mySchemas.JobPost.find({ _id: { $in: foundEmployer.jobPostId } }).then(function(apps){
            if(apps)
            {
            console.log(apps);    
            res.json(apps);
            }
    
            else
            res.json({'message' : 'No posts'});
        })
        } else {
            console.log('Employer not found');
        }
        
});
});
app.post("/register",(req,res)=>{
    User.register({username : req.body.username}, req.body.password,async function (err,user){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(user)
            await passport.authenticate('user')(req,res,function(){
                console.log("logging in");
                if(req.user) {
                    res.setHeader('Access-Control-Allow-Credentials', 'true')
                    const user = req.user;
        
        
                    return res.status(200).json({user: {
                        id: user._id,
                        email: user.email,
                    }});
                }
                
            })
        }
    })
    
});


app.post("/log-in",(req,res)=>{
    console.log(req.body)
    const user = new User({
        username : req.body.username,
        password : req.body.password,
    });

    req.login(user, function(err){
        if(err)
        {
           console.log(err);
        }
        else
        {
            console.log(user);
            passport.authenticate('user')(req,res, function(){
            console.log('logging in');
            if(req.user) {
                res.setHeader('Access-Control-Allow-Credentials', 'true')
                const user = req.user;
    
    
                return res.status(200).json({user: {
                    id: user._id,
                    email: user.email,
                }});
            }
            });
           
        }
    })
        
    });


app.post('/employer/register',(req,res)=>{
    Employer.register({username : req.body.username}, req.body.password, function (err,user){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(user)
            passport.authenticate('employer')(req,res,function(){
                console.log("logging in");
                if(req.user) {
                    res.setHeader('Access-Control-Allow-Credentials', 'true')
                    const user = req.user;
        
        
                    return res.status(200).json({user: {
                        id: user._id,
                        email: user.email,
                    }});
                }
                })
            }
        })
        
    })


app.post('/employer/log-in',(req,res)=>{
    const user = new Employer({
        username : req.body.username,
        password : req.body.password,
    });

    req.login(user, function(err){
        if(err)
        {
           console.log(err);
        }
        else
        {
            console.log(user);
            passport.authenticate('employer')(req,res, function(){
            console.log('logging in');
            if(req.user) {
                res.setHeader('Access-Control-Allow-Credentials', 'true')
                const user = req.user;
    
    
                return res.status(200).json({user: {
                    id: user._id,
                    email: user.email,
                }});
            }
            });
           
        }
    })
})

app.get('/currentUser',(req,res)=>{
    console.log(req.isAuthenticated())
    console.log(req.user)
    if (req.isAuthenticated()) {
        
        res.json({
            id: req.user._id,
            username: req.user.username,
        });
    } else {
        res.json({id : null});
    }
})

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
  });


