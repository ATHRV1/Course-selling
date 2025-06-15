import express from 'express'
const app = express()
import { UserModel, CreatorModel, RatingModel, CourseViewModel, EnrollmentModel, CourseModel } from "./db.js"
import bcrypt from 'bcrypt'
import { zodMiddleware, signupMiddleware, signinzodMiddleware } from "./Middleware/middle.js"
import jwt from "jsonwebtoken"
import mongoose from 'mongoose'

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send("Hello world");
})

app.post("/user/signup", zodMiddleware, signupMiddleware, async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({
            $or: [
                { email: req.body.email },
                { username: req.body.username }
            ]
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Creator with this email or username already exists"
            });
        }

        await UserModel.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        return res.status(201).json({
            message: "Account created successfully"
        });
    }
    catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.post("/creator/signup", zodMiddleware, signupMiddleware, async (req, res) => {
    try {
        const existingUser = await CreatorModel.findOne({
            $or: [
                { email: req.body.email },
                { username: req.body.username }
            ]
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User with this email or username already exists"
            });
        }

        await CreatorModel.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            area: req.body.area,
            experience: req.body.experience,
            bio: req.bio
        });

        return res.status(201).json({
            message: "Account created successfully"
        });
    }
    catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
})

app.post("/user/signin", signinzodMiddleware, async (req, res) => {

    const auth = await UserModel.findOne({
        email: req.body.email
    })
    if (auth) {
        const match = await bcrypt.compare(req.body.password, auth.password);
        if (!match) {
            return res.status(403).json({
                message: "Unauthorized or Incorrect Credentials"
            })
        }
        else {
            const token = jwt.sign({
                id: auth._id.toString()
            }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({
                token: token
            })
        }
    }
    else {
        res.status(403).json({
            message: "Unauthorized or Incorrect Credentials"
        })
    }
})

app.post("/creator/signin", signinzodMiddleware, async (req, res) => {
    const auth = await CreatorModel.findOne({
        email: req.body.email
    })
    if (auth) {
        const match = await bcrypt.compare(req.body.password, auth.password);
        if (!match) {
            return res.status(403).json({
                message: "Unauthorized or Incorrect Credentials"
            })
        }
        else {
            const token = jwt.sign({
                id: auth._id.toString()
            }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({
                token: token
            })
        }
    }
    else {
        res.status(403).json({
            message: "Unauthorized or Incorrect Credentials",
        })
    }
})

app.get("/creator/info", async (req, res) => {
    const token = req.headers.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id;
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        const auth = await CreatorModel.findOne({ _id: id }).populate({
            path: 'courses',
            // select: 'title image enrolledUsers price isPublished'
        });
        const totalEnrolled = auth.courses.reduce((sum, course) =>
            sum + course.enrolledUsers.length, 0
        )
        const totalRevenue = auth.courses.reduce((sum, course) =>
            sum + (course.enrolledUsers.length * course.price), 0
        )
        const ratingResult = await RatingModel.aggregate([
            { $match: { creator: id } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                }
            }
        ]);
        const avgRating = ratingResult.length > 0 ? ratingResult[0].averageRating : 0;

        const courseRating = await RatingModel.aggregate([
            { $match: { creator: id } },
            {
                $group: {
                    _id: "$course",
                    averageRating: { $avg: "$rating" },
                }
            }
        ]);
        const ratingMap = {};
        courseRating.forEach(rating => {
            ratingMap[rating._id.toString()] = rating.averageRating;
        });
        // console.log(auth);
        const coursesData = auth.courses.map(course => ({
            courseId: course._id.toString(),
            title: course.title,
            description: course.description,
            category: course.category,
            level: course.level,
            duration: course.duration,
            image: course.image,
            price:course.price,
            totalEnrolled: course.enrolledUsers.length,
            averageRating: ratingMap[course._id.toString()] || 0,
            totalEarned: course.enrolledUsers.length * course.price,
            isPublished: course.isPublished
        }));
        const totalViews = await CourseViewModel.countDocuments({
            creator: new mongoose.Types.ObjectId(id), // Fixed: creatorId -> id
            viewedAt: { $gte: thirtyDaysAgo }
        });

        const enrollmentsLast30Days = await EnrollmentModel.countDocuments({
            creator: new mongoose.Types.ObjectId(id), // Fixed: creatorId -> id
            enrolledAt: { $gte: thirtyDaysAgo }
        });
        const revenueLast30Days = await EnrollmentModel.aggregate([
            {
                $match: {
                    creator: new mongoose.Types.ObjectId(id),
                    enrolledAt: { $gte: thirtyDaysAgo }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$price" }
                }
            }
        ]);
        const revenue30Days = revenueLast30Days.length > 0 ? revenueLast30Days[0].totalRevenue : 0;

        res.json({
            totalCourses: auth.courses.length,
            totalStudents: totalEnrolled,
            totalRevenue: totalRevenue,
            averageRating: avgRating,
            courses: coursesData,
            last30: {
                views: totalViews,
                users: enrollmentsLast30Days,
                revenue: revenue30Days
            }
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Network error"
        });
    }
})

app.post("/create/course", async (req, res) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const id = decoded.id;
        const { title, description, category, level, price, duration, image, isPublished } = req.body;
        // console.log(published);
        const course = await CourseModel.create({
            title: title,
            description: description,
            category: category,
            level: level,
            creatorId: id,
            enrolledUsers: [],
            price: price,
            duration: duration,
            image: image,
            isPublished: isPublished,
        });
        await CreatorModel.findByIdAndUpdate(
            id,
            { 
                $push: { courses: course._id } // Add course ID to courses array
            }
        );
        res.status(201).json({
            message: "Course created successfully",
        });
    }
    catch (err) {
        console.error("Error creating course:", err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})

app.post("/edit/course", async (req, res) => {
    const token = req.headers.token;
    
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const { courseId, title, description, category, level, price, duration, image, isPublished } = req.body;
        
        // Update the course
        const updatedCourse = await CourseModel.findByIdAndUpdate(
            courseId,
            {
                title,
                description,
                category,
                level,
                price,
                duration,
                image,
                isPublished
            },
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json({
            message: "Course updated successfully",
            course: updatedCourse
        });
    }
    catch (err) {
        console.error("Error updating course:", err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.post("/delete/course", async (req, res) => {
    // console.log(req);
    const token = req.headers.token;
    
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const { courseId } = req.body;
        const creatorId = decoded.id;
        
        const deletedCourse = await CourseModel.findByIdAndDelete(courseId);
        
        if (!deletedCourse) {
            return res.status(404).json({
                message: "Course not found"
            });
        }
 
        await CreatorModel.findByIdAndUpdate(
            creatorId,
            { 
                $pull: { courses: courseId }
            }
        );

        res.status(200).json({
            message: "Course deleted successfully"
        });
    }
    catch (err) {
        console.error("Error deleting course:", err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`)
})