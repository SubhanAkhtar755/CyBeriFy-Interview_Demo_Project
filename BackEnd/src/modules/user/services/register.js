import { PostData } from "../db/index.js";
import bcrypt from "bcrypt";
import cloudinary from "../../../utils/cloudinary.js";
import generateAuthToken from "../../../utils/generateAuthToken.js"; // Token generator import

const RegisterService = async (data, file) => {
    try {
        // ✅ 1. Hash password if present
        if (data.password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            data.password = hashedPassword;
        }

        // ✅ 2. Upload & Compress image if file is present
        if (file && file.image) {
            const result = await cloudinary.uploader.upload(file.image.tempFilePath, {
                folder: 'users',
                quality: "auto",              // 👈 Compress automatically
                fetch_format: "auto",         // 👈 Convert to modern format like WebP
                transformation: [
                    { width: 500, crop: "scale" } // 👈 Resize image width (optional)
                ]
            });

            // ✅ Save both URL and public_id
            data.image = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        // ✅ 3. Save data to DB
        const savedUser = await PostData(data);

        // ✅ 4. Generate JWT token
        const token = await generateAuthToken(savedUser._id);

        // ✅ 5. Return user and token
        return {
            message: "User registered successfully",
            user: {
                _id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                image: savedUser.image || null,
                createdAt: savedUser.createdAt,
                updatedAt: savedUser.updatedAt
            },
            token
        };

    } catch (error) {
        throw new Error("PostService Error: " + error.message);
    }
};

export default RegisterService;
