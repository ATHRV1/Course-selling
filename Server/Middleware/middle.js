import z from 'zod';
import bcrypt from 'bcrypt';

export async function zodMiddleware(req, res, next) {
    // console.log(req.body);
    const requiredData = z.object({
        username: z
            .string()
            .min(3, { message: "Username must be at least 3 characters long" })
            .max(100, { message: "Username cannot exceed 100 characters" }),
        email: z.string().email("Email is not valid"),
        password: z
            .string()
            .min(3, { message: "Password must be at least 3 characters long" })
            .max(100, { message: "Password cannot exceed 100 characters" })
            .regex(/[A-Z]/, { message: "Password must contain atleast one UpperCase Character" })
            .regex(/[a-z]/, { message: "Password must contain atleast one LowerCase Character" })
            .regex(/[0-9]/, { message: "Password must contain atleast one Digit" })
            .regex(/[!@#$%^&*]/, { message: "Password must contain atleast one Special Character (!@#$%^&*)" })
    });
    const safeData = requiredData.safeParse(req.body);
    if (!safeData.success) {
        const errorMessage = safeData.error.errors[0].message;
        return res.status(400).json({ message: errorMessage });
    }
    next();
}

export async function signinzodMiddleware(req, res, next) {
    const requiredData = z.object({
        email: z.string().email("Email is not valid"),
        password: z
            .string()
            .min(3, { message: "Password must be at least 3 characters long" })
            .max(100, { message: "Password cannot exceed 100 characters" })
            .regex(/[A-Z]/, { message: "Password must contain atleast one UpperCase Character" })
            .regex(/[a-z]/, { message: "Password must contain atleast one LowerCase Character" })
            .regex(/[0-9]/, { message: "Password must contain atleast one Digit" })
            .regex(/[!@#$%^&*]/, { message: "Password must contain atleast one Special Character (!@#$%^&*)" })
    });
    const safeData = requiredData.safeParse(req.body);
    if (!safeData.success) {
        const errorMessage = safeData.error.errors[0].message;
        return res.status(400).json({ message: errorMessage });
    }
    next();
}

export async function signupMiddleware(req, res, next) {
    const hashed = await bcrypt.hash(req.body.password, 5);
    req.body.password = hashed;
    next();
}

export async function passwordMiddleware(req, res, next) {
    const requiredData = z.object({
        newPassword: z
            .string()
            .min(3, { message: "New Password must be at least 3 characters long" })
            .max(100, { message: "New Password cannot exceed 100 characters" })
            .regex(/[A-Z]/, { message: "New Password must contain atleast one UpperCase Character" })
            .regex(/[a-z]/, { message: "New Password must contain atleast one LowerCase Character" })
            .regex(/[0-9]/, { message: "New Password must contain atleast one Digit" })
            .regex(/[!@#$%^&*]/, { message: "New Password must contain atleast one Special Character (!@#$%^&*)" })
    });
    const safeData = requiredData.safeParse(req.body);
    if (!safeData.success) {
        const errorMessage = safeData.error.errors[0].message;
        return res.status(400).json({ message: errorMessage });
    }
    next();
}