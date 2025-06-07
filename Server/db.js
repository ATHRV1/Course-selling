import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

async function start() {
    await mongoose.connect(process.env.MONGODB_URI);
}
start();

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    courses: [{
        type: ObjectId,
        ref: 'Course'
    }]
})

const CreatorSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    courses: [{
        type: ObjectId,
        ref: 'Course'
    }]
})

const CourseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: {
        type: String,
        default: "C:/Users/HP/LMS/Server/Photos/course-d.png"
    },
    creatorId: {
        type: ObjectId,
        ref: 'Creator',
        required: true
    },
    enrolledUsers: {
        type: [{
            type: ObjectId,
            ref: 'User'
        }]
    },
    price: { type: Number, required: true },
    duration: String,
    isPublished: { type: Boolean, default: false },

}, { timestamps: true })

const UserModel = mongoose.model("User", UserSchema);
const CreatorModel = mongoose.model("Creator", CreatorSchema);
const CourseModel = mongoose.model("Course", CourseSchema);

export{
    UserModel,
    CreatorModel,
    CourseModel
}
