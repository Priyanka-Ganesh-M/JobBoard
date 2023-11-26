import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
const Schema = mongoose.Schema;
import 'mongoose-type-email';
import session from 'express-session';
import passport from 'passport';



const jobPostSchema = new Schema({
    company : String,
    position : String,
    location : String,
    skillSet : String,
    applicationId : [String]
});

const JobPost = new mongoose.model("JobPost", jobPostSchema);

const applicationSchema = new Schema({
    firstName : String,
    lastName : String,
    email : String,
    resume : String,
});

const Application = new mongoose.model("Application", applicationSchema);

const mySchemas = {'Application' : Application, 'JobPost' : JobPost};

   

export default mySchemas;