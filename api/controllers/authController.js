import User from "../models/User.js";
import jwt from "jsonwebtoken";
import axios from "axios";

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export const signup = async (req, res) => {
  const { name, email, password, age, gender, genderPreference } = req.body;
  try {
    if (!name || !email || !password || !age || !gender || !genderPreference) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    if(age < 18) {
        return res
        .status(400)
        .json({ success: false, message: "You must be atleast 18 years old" });
    }

    if(password.length < 6) {
        return res
        .status(400)
        .json({ success: false, message: "Password must be atleast 6 characters long" });
    }

    const newUser = await User.create({
        name,
        email,
        password,
        age,
        gender,
        genderPreference,
    })
      
    const token = signToken(newUser._id);

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, 
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    })

    res.status(201).json({
        success: true,
        user: newUser,
    });

  } catch (error) {
    console.error("Error in signup controller:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = signToken(user._id);

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        })

        res.status(200).json({
            success: true,
            user,
        })
            
    }

    catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        })
    }
        
};

export const logout = async (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    })
};

export const googleAuth = async (req, res) => {
    try {
        const { access_token } = req.body;
        
        if (!access_token) {
            return res.status(400).json({
                success: false,
                message: "Google access token is required"
            });
        }

        // Verify the Google access token using Google's tokeninfo endpoint
        const tokenInfoResponse = await axios.get(
            `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${access_token}`
        );

        if (!tokenInfoResponse.data || !tokenInfoResponse.data.email) {
            return res.status(401).json({
                success: false,
                message: "Invalid Google token"
            });
        }

        const { email, name, picture } = tokenInfoResponse.data;

        // Check if email is from CMRIT domain
        if (!email.endsWith('@cmrit.ac.in')) {
            return res.status(403).json({
                success: false,
                message: "Only @cmrit.ac.in emails are allowed"
            });
        }

        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
            // User exists - login
            const jwtToken = signToken(user._id);
            
            res.cookie("jwt", jwtToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            });

            return res.status(200).json({
                success: true,
                user,
                message: "Login successful"
            });
        } else {
            // User doesn't exist - return email info for profile completion
            return res.status(200).json({
                success: true,
                newUser: true,
                googleUserData: {
                    email,
                    name: name || email.split('@')[0],
                    image: picture || ""
                },
                message: "Please complete your profile"
            });
        }

    } catch (error) {
        console.error("Error in Google auth:", error);
        
        // Handle specific Google API errors
        if (error.response && error.response.status === 400) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired Google token"
            });
        }
        
        res.status(500).json({
            success: false,
            message: "Google authentication failed"
        });
    }
};

export const completeGoogleSignup = async (req, res) => {
    try {
        const { name, email, age, gender, genderPreference } = req.body;

        if (!name || !email || !age || !gender || !genderPreference) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            });
        }

        if (age < 18) {
            return res.status(400).json({
                success: false,
                message: "You must be at least 18 years old"
            });
        }

        // Verify email domain again for security
        if (!email.endsWith('@cmrit.ac.in')) {
            return res.status(403).json({
                success: false,
                message: "Only @cmrit.ac.in emails are allowed"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Generate a random password for Google users
        const randomPassword = Math.random().toString(36).slice(-8);

        const newUser = await User.create({
            name,
            email,
            password: randomPassword,
            age,
            gender,
            genderPreference,
            bio: "", // Default empty bio
            image: "" // Default empty image - users can add later in profile
        });

        const token = signToken(newUser._id);

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(201).json({
            success: true,
            user: newUser,
            message: "Account created successfully"
        });

    } catch (error) {
        console.error("Error in Google signup completion:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
