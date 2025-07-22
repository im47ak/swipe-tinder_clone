import express from 'express';
import { signup, login, logout, googleAuth, completeGoogleSignup } from '../controllers/authController.js';
import { protectRoute } from '../middleware/auth.js';

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/google", googleAuth)
router.post("/google/complete", completeGoogleSignup)

router.get("/me", protectRoute, (req, res) => {
    res.send({
        success: true,
        user: req.user,
    })
})

export default router;