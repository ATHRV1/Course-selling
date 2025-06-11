import express from 'express'
const app = express()
import { UserModel, CreatorModel, RatingModel } from "./db.js"
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
        const auth = await CreatorModel.findOne({ _id: id }).populate({
            path: 'courses',
            select: 'title image enrolledUsers price isPublished'
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
        const coursesData = auth.courses.map(course => ({
            title: course.title,
            image: course.image,
            totalEnrolled: course.enrolledUsers.length,
            averageRating: ratingMap[course._id.toString()] || 0,
            totalEarned: course.enrolledUsers.length * course.price,
            isPublished: course.isPublished
        }));
        res.json({
            totalCourses: auth.courses.length,
            totalStudents: totalEnrolled,
            totalRevenue: totalRevenue,
            averageRating: avgRating,
            courses:coursesData
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Network error"
        });
    }
})

app.listen(process.env.PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`)
})