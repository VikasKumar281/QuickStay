import User from "../models/User.js";

export const getAuth = (req) => {
    const auth = typeof req.auth === "function" ? req.auth() : req.auth;
    return auth || {};
};

export const protect = async (req, res, next) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return res.json({ success: false, message: "not authenticated" });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.json({ success: false, message: "User not found" });
    }
    req.user = user;
    next();
};
 