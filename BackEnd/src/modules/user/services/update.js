import { updateData } from "../db/index.js";
import bcrypt from "bcrypt";

const UpdateService = async (id, updatedFields) => {
    try {
        // Agar password update ho raha hai to hash kar do
        if (updatedFields.password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(updatedFields.password, saltRounds);
            updatedFields.password = hashedPassword;
        }

        const updatedUser = await updateData(id, updatedFields);
        if (!updatedUser) throw new Error("User not found or update failed");

        // Password response me na bhejein
        updatedUser.password = undefined;

        return updatedUser;
    } catch (error) {
        throw new Error("UpdateService Error: " + error.message);
    }
};

export default UpdateService;
