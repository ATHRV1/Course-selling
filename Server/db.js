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
    }],
    area: {type: String, required:true},
    experience: {type:String, required:true},
    bio: {type: String}    
})

const CourseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: {
        type: String,
        default: './Photos/course-d.png'
    },
    category:{type:String,required:true},
    level:{type:String,required:true},
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

const EnrollmentSchema = new Schema({
    student: { type: ObjectId, ref: 'User', required: true },
    course: { type: ObjectId, ref: 'Course', required: true },
    creator: { type: ObjectId, ref: 'Creator', required: true },
    enrolledAt: { type: Date, default: Date.now },
    price: { type: Number, required: true }, 
    status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' }
});

const CourseViewSchema = new Schema({
    course: { type: ObjectId, ref: 'Course', required: true },
    creator: { type: ObjectId, ref: 'Creator', required: true },
    viewedAt: { type: Date, default: Date.now },
    studentId: { type: ObjectId, ref: 'User' }, 
});

const RatingSchema = new Schema({
    course: { type: ObjectId, ref: 'Course', required: true },
    creator: { type: ObjectId, ref: 'Creator', required: true },
    student: { type: ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    review: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model("User", UserSchema);
const CreatorModel = mongoose.model("Creator", CreatorSchema);
const CourseModel = mongoose.model("Course", CourseSchema);
const EnrollmentModel = mongoose.model("Enrollment", EnrollmentSchema);
const CourseViewModel=mongoose.model("View", CourseViewSchema);
const RatingModel=mongoose.model("Rating", RatingSchema);

export{
    UserModel,
    CreatorModel,
    CourseModel,
    EnrollmentModel,
    CourseViewModel,
    RatingModel
}
