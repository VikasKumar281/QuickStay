
import User from "../models/User.js";
import { getAuth } from "../middleware/authMiddleware.js";

export const syncUser = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.json({ success: false, message: "not authenticated" });
        }

        const email = String(req.body.email || "").trim();
        const username = String(req.body.username || "").trim() || "Guest";
        const image = String(req.body.image || "").trim() || "https://img.clerk.com/preview.png";
        if (!email) {
            return res.json({ success: false, message: "Email is required" });
        }

        let user = await User.findById(userId);
        if (!user) {
            user = await User.create({ _id: userId, email, username, image });
        }

        res.json({
            success: true,
            role: user.role,
            recentSearchedCities: user.recentSearchedCities,
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//  Get /api/user ----------------------------->

export const getUserData = async (req, res) => {
    try {
        const role = req.user.role;

        const recentSearchedCities = req.user.recentSearchedCities;

        res.json({ success: true, role, recentSearchedCities });
    } 
    
    catch (error) {
        res.json({ success: false, message: error.message });
    }
}



// Store User Recent Searched Cities --------------------------->

export const storeRecentSearchedCities = async (req,res) => {
    try{
       const {recentSearchedCity} = req.body;
       const user = req.user;

       const cities = user.recentSearchedCities.filter((city) => city !== recentSearchedCity);
       cities.push(recentSearchedCity);
       user.recentSearchedCities = cities.slice(-3);

       await user.save();
       res.json( {success: true , message: "City added" } );
    }
    catch(error){
       res.json( {success: false , message: error.message } );
    }
}

