import express from "express";
const app = express();
import {
    UserModel,
    CreatorModel,
    RatingModel,
    CourseViewModel,
    EnrollmentModel,
    CourseModel,
} from "./db.js";
import bcrypt from "bcrypt";
import {
    zodMiddleware,
    signupMiddleware,
    signinzodMiddleware,
    passwordMiddleware,
} from "./Middleware/middle.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.post("/user/signup", zodMiddleware, signupMiddleware, async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({
            $or: [{ email: req.body.email }, { username: req.body.username }],
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Creator with this email or username already exists",
            });
        }
        await UserModel.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        return res.status(201).json({
            message: "Account created successfully",
        });
    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

app.post(
    "/creator/signup",
    zodMiddleware,
    signupMiddleware,
    async (req, res) => {
        try {
            const existingUser = await CreatorModel.findOne({
                $or: [{ email: req.body.email }, { username: req.body.username }],
            });

            if (existingUser) {
                return res.status(409).json({
                    message: "User with this email or username already exists",
                });
            }
            await CreatorModel.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                area: req.body.area,
                experience: req.body.experience,
                bio: req.bio,
            });

            return res.status(201).json({
                message: "Account created successfully",
            });
        } catch (err) {
            console.error("Signup error:", err);
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }
);

app.post("/user/signin", signinzodMiddleware, async (req, res) => {
    const auth = await UserModel.findOne({
        email: req.body.email,
    });
    if (auth) {
        const match = await bcrypt.compare(req.body.password, auth.password);
        if (!match) {
            return res.status(403).json({
                message: "Unauthorized or Incorrect Credentials",
            });
        } else {
            const token = jwt.sign(
                {
                    id: auth._id.toString(),
                },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );
            res.json({
                token: token,
                username: auth.username,
            });
        }
    } else {
        res.status(403).json({
            message: "Unauthorized or Incorrect Credentials",
        });
    }
});

app.post("/creator/signin", signinzodMiddleware, async (req, res) => {
    const auth = await CreatorModel.findOne({
        email: req.body.email,
    });
    if (auth) {
        const match = await bcrypt.compare(req.body.password, auth.password);
        if (!match) {
            return res.status(403).json({
                message: "Unauthorized or Incorrect Credentials",
            });
        } else {
            const token = jwt.sign(
                {
                    id: auth._id.toString(),
                },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );
            res.json({
                token: token,
                name: auth.username,
            });
        }
    } else {
        res.status(403).json({
            message: "Unauthorized or Incorrect Credentials",
        });
    }
});

app.get("/creator/info", async (req, res) => {
    const token = req.headers.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id;
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        const auth = await CreatorModel.findOne({ _id: id }).populate({
            path: "courses",
            // select: 'title image enrolledUsers price isPublished'
        });
        const totalEnrolled = auth.courses.reduce(
            (sum, course) => sum + course.enrolledUsers.length,
            0
        );
        const totalRevenue = auth.courses.reduce(
            (sum, course) => sum + course.enrolledUsers.length * course.price,
            0
        );
        const ratingResult = await RatingModel.aggregate([
            { $match: { creator: id } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                },
            },
        ]);
        const avgRating =
            ratingResult.length > 0 ? ratingResult[0].averageRating : 0;

        const courseRating = await RatingModel.aggregate([
            { $match: { creator: id } },
            {
                $group: {
                    _id: "$course",
                    averageRating: { $avg: "$rating" },
                },
            },
        ]);
        const ratingMap = {};
        courseRating.forEach((rating) => {
            ratingMap[rating._id.toString()] = rating.averageRating;
        });
        // console.log(auth);
        const coursesData = auth.courses.map((course) => ({
            courseId: course._id.toString(),
            title: course.title,
            description: course.description,
            category: course.category,
            level: course.level,
            duration: course.duration,
            image: course.image,
            price: course.price,
            totalEnrolled: course.enrolledUsers.length,
            averageRating: ratingMap[course._id.toString()] || 0,
            totalEarned: course.enrolledUsers.length * course.price,
            isPublished: course.isPublished,
        }));
        const totalViews = await CourseViewModel.countDocuments({
            creator: new mongoose.Types.ObjectId(id), // Fixed: creatorId -> id
            viewedAt: { $gte: thirtyDaysAgo },
        });

        const enrollmentsLast30Days = await EnrollmentModel.countDocuments({
            creator: new mongoose.Types.ObjectId(id), // Fixed: creatorId -> id
            enrolledAt: { $gte: thirtyDaysAgo },
        });
        const revenueLast30Days = await EnrollmentModel.aggregate([
            {
                $match: {
                    creator: new mongoose.Types.ObjectId(id),
                    enrolledAt: { $gte: thirtyDaysAgo },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$price" },
                },
            },
        ]);
        const revenue30Days =
            revenueLast30Days.length > 0 ? revenueLast30Days[0].totalRevenue : 0;

        res.json({
            totalCourses: auth.courses.length,
            totalStudents: totalEnrolled,
            totalRevenue: totalRevenue,
            averageRating: avgRating,
            courses: coursesData,
            last30: {
                views: totalViews,
                users: enrollmentsLast30Days,
                revenue: revenue30Days,
            },
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Network error",
        });
    }
});

app.post("/create/course", async (req, res) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const id = decoded.id;
        const {
            title,
            description,
            category,
            level,
            price,
            duration,
            image,
            isPublished,
        } = req.body;
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
            image: "/public/images/courses/course-d.png",
            isPublished: isPublished,
        });
        await CreatorModel.findByIdAndUpdate(id, {
            $push: { courses: course._id }, // Add course ID to courses array
        });
        res.status(201).json({
            message: "Course created successfully",
        });
    } catch (err) {
        console.error("Error creating course:", err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

app.post("/edit/course", async (req, res) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const {
            courseId,
            title,
            description,
            category,
            level,
            price,
            duration,
            image,
            isPublished,
        } = req.body;

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
                isPublished,
            },
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        res.status(200).json({
            message: "Course updated successfully",
            course: updatedCourse,
        });
    } catch (err) {
        console.error("Error updating course:", err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

app.post("/delete/course", async (req, res) => {
    // console.log(req);
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const { courseId } = req.body;
        const creatorId = decoded.id;

        const deletedCourse = await CourseModel.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        await CreatorModel.findByIdAndUpdate(creatorId, {
            $pull: { courses: courseId },
        });

        res.status(200).json({
            message: "Course deleted successfully",
        });
    } catch (err) {
        console.error("Error deleting course:", err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

app.get("/creator/credentials", async (req, res) => {
    const token = req.headers.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id;

        const auth = await CreatorModel.findOne({ _id: id });

        res.json({
            username: auth.username,
            email: auth.email,
            expertise: auth.area,
            experience: auth.experience,
            bio: auth.bio,
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Network error",
        });
    }
});

app.post("/creator/update", async (req, res) => {
    const token = req.headers.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id;

        const { username, email, expertise, experience, bio } = req.body;

        await CreatorModel.findByIdAndUpdate(id, {
            username: username,
            email: email,
            area: expertise,
            experience: experience,
            bio: bio,
        });

        res.json({
            message: "Profile updated successfully",
        });
    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

app.post("/creator/update-password", passwordMiddleware, async (req, res) => {
    const token = req.headers.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id;

        const { currentPassword, newPassword } = req.body;

        const creator = await CreatorModel.findById(id);
        if (!creator) {
            return res.status(404).json({
                message: "Creator not found",
            });
        }

        const match = await bcrypt.compare(currentPassword, creator.password);
        if (!match) {
            return res.status(401).json({
                message: "Current password is incorrect",
            });
        }

        creator.password = await bcrypt.hash(newPassword, 10);
        await creator.save();
        res.json({
            message: "Password updated successfully",
        });
    } catch (err) {
        console.error("Error updating password:", err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

app.post("/creator/delete", async (req, res) => {
    const token = req.headers.token;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const creatorId = decoded.id;

        // Step 1: Get all course IDs created by this creator
        const courses = await CourseModel.find({ creatorId }, "_id").session(
            session
        );
        const courseIds = courses.map((course) => course._id);

        // Step 2: Get all users enrolled in any of these courses
        const enrolledUsers = await CourseModel.aggregate([
            { $match: { _id: { $in: courseIds } } },
            { $unwind: "$enrolledUsers" },
            { $group: { _id: "$enrolledUsers" } },
        ]).session(session);
        const enrolledUserIds = enrolledUsers.map((user) => user._id);

        // Perform all deletions and updates in transaction
        await Promise.all([
            // Remove all creator's courses from enrolled users' courses arrays
            UserModel.updateMany(
                { _id: { $in: enrolledUserIds } },
                { $pull: { courses: { $in: courseIds } } },
                { session }
            ),

            // Delete all enrollments related to creator's courses
            EnrollmentModel.deleteMany({ creator: creatorId }, { session }),

            // Delete all views related to creator's courses
            CourseViewModel.deleteMany({ creator: creatorId }, { session }),

            // Delete all ratings related to creator's courses
            RatingModel.deleteMany({ creator: creatorId }, { session }),

            // Delete all courses created by the creator
            CourseModel.deleteMany({ creatorId: creatorId }, { session }),

            // Finally delete the creator account
            CreatorModel.findByIdAndDelete(creatorId, { session }),
        ]);

        await session.commitTransaction();
        session.endSession();

        res.json({
            message: "Creator account and all related data deleted successfully",
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error deleting creator account:", err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

app.get("/three/courses", async (req, res) => {
    try {
        const topCourses = await CourseModel.aggregate([
            { $match: { isPublished: true } },
            {
                $lookup: {
                    from: "ratings",
                    localField: "_id",
                    foreignField: "course",
                    as: "ratings",
                },
            },
            {
                $addFields: {
                    averageRating: { $avg: "$ratings.rating" },
                    totalRatings: { $size: "$ratings" },
                },
            },
            { $match: { totalRatings: { $gt: 0 } } },
            { $sort: { averageRating: -1, totalRatings: -1 } },
            { $limit: 3 },
            {
                $lookup: {
                    from: "creators",
                    localField: "creatorId",
                    foreignField: "_id",
                    as: "creatorDetails",
                },
            },
            { $unwind: "$creatorDetails" },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    image: 1,
                    price: 1,
                    duration: 1,
                    category: 1,
                    level: 1,
                    averageRating: 1,
                    totalRatings: 1,
                    instructor: "$creatorDetails.username",
                    enrolledCount: { $size: "$enrolledUsers" },
                },
            },
        ]);

        res.json({
            success: true,
            courses: topCourses,
        });
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({
            success: false,
        });
    }
});


app.post("/user/info", async (req, res) => {
    const token = req.headers.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await UserModel.findOne({ _id: userId })
            .populate({
                path: "courses",
                options: { limit: 3 },
                select:
                    "title description image price duration category level creatorId",
            })
            .select("username email courses");

        const formattedCourses =
            user?.courses?.map((course) => ({
                _id: course._id,
                title: course.title,
                image: course.image,
                category: course.category,
                level: course.level,
            })) || [];

        res.json({
            username: user.username,
            email:user.email,
            courses: formattedCourses,
        });
    } catch (error) {
        console.error("Error fetching user courses:", error);

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, message: "Invalid user" });
        }

        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

app.post("/user/update", async (req, res) => {
    const token = req.headers.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id;

        const { username, email} = req.body;

        await UserModel.findByIdAndUpdate(id, {
            username: username,
            email: email,
        });

        res.json({
            message: "Profile updated successfully",
        });
    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

app.post("/user/update-password", passwordMiddleware, async (req, res) => {
    const token = req.headers.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id;

        const { currentPassword, newPassword } = req.body;

        const creator = await UserModel.findById(id);
        if (!creator) {
            return res.status(404).json({
                message: "Creator not found",
            });
        }

        const match = await bcrypt.compare(currentPassword, creator.password);
        if (!match) {
            return res.status(401).json({
                message: "Current password is incorrect",
            });
        }

        creator.password = await bcrypt.hash(newPassword, 10);
        await creator.save();
        res.json({
            message: "Password updated successfully",
        });
    } catch (err) {
        console.error("Error updating password:", err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

app.post("/user/delete", async (req, res) => {
    const token = req.headers.token;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Step 1: Get all course IDs the user is enrolled in
        const user = await UserModel.findById(userId).session(session);
        const courseIds = user.courses || [];

        // Step 2: Remove user from enrolledUsers array in all courses they're enrolled in
        await Promise.all([
            // Remove user from courses' enrolledUsers arrays
            CourseModel.updateMany(
                { _id: { $in: courseIds } },
                { $pull: { enrolledUsers: userId } },
                { session }
            ),
            
            // Delete all enrollments for this user
            EnrollmentModel.deleteMany({ student: userId }, { session }),
            
            // Delete all course views by this user
            CourseViewModel.deleteMany({ studentId: userId }, { session }),
            
            // Delete all ratings/reviews by this user
            RatingModel.deleteMany({ student: userId }, { session }),
            
            // Finally delete the user
            UserModel.findByIdAndDelete(userId, { session })
        ]);

        await session.commitTransaction();
        session.endSession();

        res.json({
            message: "User account and all related data deleted successfully",
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error deleting user account:", err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

app.get("/courses/all", async (req, res) => {
    try {
        const courses = await CourseModel.aggregate([
            // Step 1: Join with Creator collection
            {
                $lookup: {
                    from: "creators",
                    localField: "creatorId",
                    foreignField: "_id",
                    as: "creatorDetails"
                }
            },
            { $unwind: "$creatorDetails" }, 
            
            // Step 2: Join with Ratings collection
            {
                $lookup: {
                    from: "ratings",
                    localField: "_id",
                    foreignField: "course",
                    as: "courseRatings"
                }
            },
            
            // Step 3: Shape the output
            {
                $project: {
                    courseId:"$_id",
                    title: 1,
                    description: 1,
                    image: 1,
                    category: 1,
                    level: 1,
                    price: 1,
                    duration: 1,
                    isPublished: 1,
                    createdAt: 1,
                    creatorName: "$creatorDetails.username", 
                    totalEnrolled: { $size: "$enrolledUsers" || 0 },
                    averageRating: { 
                        $ifNull: [{ $avg: "$courseRatings.rating" }, 0] 
                    }
                }
            },
            { $match: { isPublished: true } }
        ]);

        res.json(courses);
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/enroll/course", async (req, res) => {
    try {
        const { token, courseId } = req.body;
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        await UserModel.findByIdAndUpdate(
            userId,
            { $addToSet: { courses: courseId } }
        );

        const course = await CourseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        await EnrollmentModel.create({
            student: userId,
            course: courseId,
            creator: course.creatorId,
            price: course.price,
            status: 'active'
        });

        await CourseModel.findByIdAndUpdate(
            courseId,
            { 
                $addToSet: { enrolledUsers: userId },
            }
        );

        res.json({ 
            success: true,
            message: "Successfully enrolled in course" 
        });

    } catch (err) {
        console.error("Enrollment error:", err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        res.status(500).json({ 
            success: false,
            message: "Failed to enroll in course" 
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`);
});
