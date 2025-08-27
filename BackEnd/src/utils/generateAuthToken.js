import jwt from "jsonwebtoken";
import { ENV } from "../constants/index.js";


const generateAuthToken = async (userId) => {
    try {
        const token = jwt.sign({ id: userId }, ENV.JWT_SECRET);
        return token;
    } catch (err) {
        throw new Error("Token generation failed: " + err.message);
    }
};

export default generateAuthToken;
