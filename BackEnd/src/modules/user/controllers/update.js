import UpdateService from "../services/update.js";

export const updateAccountController = async (req, res) => {
  try {
    const id = req.user.id; // ✅ Yeh ab sirf string ID hogi
    const data = req.body;

    const updatedUser = await UpdateService(id, data);

    res.status(200).json({
      message: "Account updated successfully",
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ error: "UpdateService Error: " + error.message });
  }
};


