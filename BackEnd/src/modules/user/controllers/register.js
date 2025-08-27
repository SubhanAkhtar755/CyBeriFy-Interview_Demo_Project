import PostService from "../services/register.js";
import { POST_DATA_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE } from "../../../constants/index.js";

const RegisterController = async (req, res) => {
    try {
        const Data = await PostService(req.body, req.files); // 👈 processed data from service
        const { token, user, message } = Data;

        // ✅ Send token in secure cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure:process.env.NODE_ENV === "production",         // Only send on HTTPS in production
            sameSite: "Strict",   // Adjust if frontend is on a different domain
        });

        // ✅ Send response
        res.status(200).send({
            status: 200,
            message: message || POST_DATA_MESSAGE,
            user,
            token
        });
    } catch (err) {
        res.status(500).send({
            status: 500,
            message: INTERNAL_SERVER_ERROR_MESSAGE,
            error: err.message
        });
    }
};

export default RegisterController;
